
jsw.qx.Class.define( "renderer.html5.base.WidgetRenderer", {

	extend : renderer.base.WidgetRenderer,

	construct : function() {
		this.base( arguments );
		
		this.__templateName = null;
		this.__retries      = 0;
	},
	
	/*
	 *****************************************************************************
     STATICS
	 *****************************************************************************
	 */
	statics : {
		__DEFAULT_ELEMENT_BUILDER_INFO : {
			type  : 'input',
			class : 'hidden',
			attrs : {}
		},
		
		//http://stackoverflow.com/questions/918792/use-jquery-to-change-an-html-tag
	    replaceTag: function (element, tag, withDataAndEvents, deepWithDataAndEvents) {
	    	withDataAndEvents     = withDataAndEvents || true;
	    	deepWithDataAndEvents = deepWithDataAndEvents || withDataAndEvents;
	    	
			var replacement = $('<' + tag + '>');	// create the new, empty shim
			var attributes = {};					// empty container to hold attributes
			// copy all the attributes to the shell
			$.each(element.get(0).attributes, function(index, attribute) {
			    attributes[attribute.name] = attribute.value;
			}); 
			replacement.attr(attributes);			// assign attributes to replacement
			replacement.data(element.data());		// copy the data
			
			// get all the kids, with data and events
			var contents = element.children().clone( withDataAndEvents, deepWithDataAndEvents );
			replacement.append(contents);			// inseminate
			element.replaceWith(replacement);		// swap it out
			return replacement;
	    },
	    
	    /*
	     * Creación de un nuevo elemento HTML en base al renderer especificado.
	     * @param renderer: Renderer del cual se va a crear el elemento HTML.
	     * @param parentEl (opcional): Elemento HTML al que se añadirá el elemento creado. En caso de no especificarse, 
	     * 							   el elemento creado no será añadido al DOM HTML. 
	     */
	    createNewElement : function( renderer, parentEl ) {
	    	parentEl = parentEl || null;	// Valor por defecto para evitar undefined si no se especifica.
	    	var elem = null;
	    	
	    	if (renderer !== null && renderer.getElementBuilderInfo && renderer.getJSWWidget ) {
	    		try {
			    	var info = renderer.getElementBuilderInfo();
			    	var role = renderer.getJSWWidget().getRenderRole() || '';
			    	
			    	if ( info && info.type ) {
			    		var attrs = info.attrs || {};
			    		attrs.class = info.class;
			    		if ( role && role !== '' ) {
			    			attrs['data-render-role'] = role;
			    		}
			    		
			    		var elem = $(document.createElement( info.type )).attr( attrs );
			    		
				    	// Agregamos el nuevo elemento como ultimo hijo del elemento padre en caso de haberse especificado.
				    	if ( elem !== null && parentEl !== null ) {
				    		parentEl.append( elem );
				    	}
			    	}
	    		} catch (err) {
	    			elem = null;
	    			console.error ( err.stack );
	    		}
	    	}
	    	
	    	return elem;
	    },
	},
	
	/*
	 *****************************************************************************
     MEMBERS
	 *****************************************************************************
	 */
	members : {
		onDispose : function( evt ) {
			if ( this.getEl() !== null ) {
				this.getEl().removeAttr('data-widget-id' );
				this.getEl().removeAttr('data-widget-type' );
			}
			
			this.base( arguments, evt );
		},
		
		getTemplateName : function() {
			return this.__templateName;
		},
		
		hasTemplateName : function() {
			return this.getTemplateName() !== null;
		},
		
		setTemplateName : function( value ) {
			if (typeof value !== 'string') {
				value = null;
			} 
			this.__templateName = value;
		},
		
		__getRendererRetries : function() {
			return this.__retries;
		}, 
		
		__incrRendererRetries : function() {
			this.__retries++;
		}
		
		_onPropertyChangeEvent : function( evt ) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'toolTipText':
					this._updateToolTipText();
					break;
				default:
			}
		},
		
		_updateEnabled : function() {
			if (this.getEl() !== null) {
				this.getEl().prop( 'disabled', !this.getJSWWidget().isEnabled() );
				if ( this.getJSWWidget().isEnabled() ) {
					this.getEl().removeAttr('disabled');
				} else {
					this.getEl().attr('disabled', true );
				}
			}
		},
		
		_updateToolTipText : function() {
			if (this.getEl() !== null) {
				var widget = this.getJSWWidget();

				// Gestionamos la propiedad toolTipText
				var dataToggle = this.getEl().attr('data-toggle');
				if ( dataToggle === undefined || dataToggle === 'tooltip' ) {
					if ( widget.getToolTipText() !== '' ) {
						this.getEl().attr({ 'data-toggle' : 'tooltip', 'title' : widget.getToolTipText() });
						if (this.getEl().tooltip !== undefined) { this.getEl().tooltip({container : 'body'}); }
					} else {
						this.getEl().removeAttr('data-toggle');
						this.getEl().removeAttr('title');
						if (this.getEl().tooltip !== undefined) { this.getEl().tooltip('destroy'); }
					}
				}
			}
		},
		
		//@Override
		_tryRender : function() {
			try {
				var renderRole = this.getJSWWidget().getRenderRole() || '';
				
				if ( this.isTemplated() ) {
					this.getParent().removeEventListener( renderer.base.Renderer.RENDER_EVENT_TYPE, this._onParentRenderedEvent, this );
					if ( this.getParent() ) {
						if ( this.getParent().isRendered() ) {
							this.__incrRendererRetries();
							this.render();
							
							// En caso de no tener elemento HTML asociado pero tener renderRole, lo reintentamos mas tarde.
							this.__addToRetryRenderAfterQueue();
						} else {
							this._waitFromParentRenderer();
						}
					} else {
						this.render();
					}
				
				} else {
					this._waitFromTemplate();
					this._downloadTemplate();
				}
			} catch (ex) {
				console.error (ex.stack);
			}
			return;
		},
		
		__addToRetryRenderAfterQueue : function() {
			var isRenderer       = (this.isRendered() && this.getEl() !== null);
			var isAsyncRendering = (typeof this._isAsyncRendering === 'function' && this._isAsyncRendering() === true && this._isRenderingInProgress() === true );
			var hasRenderRole    = (this.getJSWWidget().getRenderRole() !== null);
			
			if ( (!isRenderer && !isAsyncRendering ) && hasRenderRole && this.__getRendererRetries() < 10 ) {
				renderer.base.Renderer.RendererQueueManager.addToRetryRenderAfterQueue( this );
			}
		},
	
		_waitFromTemplate : function() {
			this.addEventListener( renderer.base.Renderer.TEMPLATE_EVENT_TYPE, this._onTemplateEvent, this );
			return;
		},

		_onTemplateEvent : function() {
			this.removeEventListener( renderer.base.Renderer.TEMPLATE_EVENT_TYPE, this._onTemplateEvent, this );
			this._tryRender();
			return;
		},
		
		_downloadTemplate : function() {
			var role = this.getJSWWidget().getRenderRole() || '';
			
			if (role !== '') {
				renderer.html5.base.utils.Template.downloadTemplateIfExists( this );
			} else {
				this.templateIsDone( null );
			}
			return;
		},
		
		templateIsDone : function( templateStr ) {
			templateStr = templateStr || null;
			
			this.setTemplated( true );
			this.setTemplateName( templateStr );
			
			var evt = new jsw.event.Event( renderer.base.Renderer.TEMPLATE_EVENT_TYPE );
			this.dispatchEvent( evt, false );
		},

		//@Override
		render : function() {
			if ( this.getEl() !== null ) {
				renderer.html5.base.utils.Template.applyTemplate( this, true );
				
				this.__relocateRender();
				this._updateEnabled();
				this._updateVisible();
				this._updateToolTipText();
			}
		},
		
		//@Override
		show : function() {
			if ( this.getEl() !== null ) {
				this.getEl().removeClass('hidden');
			}
		}, 
		
		//@Override
		hide : function() {
			if ( this.getEl() !== null ) {
				this.getEl().addClass('hidden');
			}
		},
		
		/*
		 * @param args Array with all arguments to send to receiver function
		 */
		_runBlockerCommand : function( objRef, commandFn, args ) {
			args = args || []; 
			renderer.html5.metronic.DisplayRenderer.blockUI(); 
			commandFn.apply( objRef, args );
		},
		
		/*
		 * Busca en el DOM HTML por renderRole la ubicación correspondiente al widget/renderer
		 * @param selector: Selector de jQuery para localizar en el DOM HTML el lugar donde anclar el renderer. 
		 *                  Por defecto se usar la propiedad renderRole.
		 * @param contextEl: Contexto o ambito del DOM HTML donde realizar la búsqueda.
		 *                   Si no se especifica se hará la búsqueda en el contento del renderer supeior más cercano que 
		 *                   haya incorporado una plantilla HTML, o en su defecto todo el BODY del docuemnto.
		 * @param createIfNotExists: Parametro booleano que indica si hay que crear el elemento HTML en el DOM en caso de no existir.
		 *                           Suele utilizarse en el caso de los Composites o widget que heredan de este.
		 * @param force: Fuerza la búsqueda aun cuando el renderer ya tiene asignado previamente un elemento del DOM.
		 */
		__locateInTemplate : function( selector, contextEl, createIfNotExists,  force ) {
			// Inicializamos los parámetros ya que son opcionales
			contextEl         = contextEl || null;
			selector          = selector || null; 
			createIfNotExists = createIfNotExists || false;
			force             = force || false;
			
			var elem = null;
			
			try {
				// Si hay un elemento del DOM asignado previamente y no se especifica la opción force, lo devolvemos.
				if (force !== true && this.getEl() !== null ) {
					return this.getEl();
				}
				
				// Si no se especifica selector, usamos el selector por defecto.
				if ( selector === null ) {
					var renderRole = this.getJSWWidget().getRenderRole();
					if (renderRole === null) {
						return null;
					}
					selector = '[data-render-role="' + renderRole +'"]';
				}
				// Obtenemos los elementos del DOM cuyo renderRole encaja con los de nuestro widget
				if ( contextEl !== null ) {
					elem = contextEl.find( selector ).not('[data-widget-id]');
					
				} else {
					var p = this.getParent();
					while ( p !== null && p.getJSWWidget().classname !== 'jsw.widgets.JSWShell' ) {
						p = p.getParent();
					}
					if ( p !== null ) {
						// Se usa getEl() y no getContainer() para poder acceder a los botones de los cuadros de dialogo.
						elem = p.getEl().find( selector ).not('[data-widget-id]');
					}
				}
								
				if ( typeof elem === 'undefined' || elem === null || elem === false || elem.length < 0 ) {
					console.error( "Error desconocido al procesar la plantilla en busca de ocurrencias para el widget con rol '" + renderRole + "'." );
					elem = null;
					
				} else if ( elem.length === 0 && createIfNotExists ) {
					// Buscamos el elemento HTML padre donde enganchar el elemento a crear
					var p = this.getParent();
					while (p.getContainerEl() === null && p.basename !== 'DisplayRenderer') {
						p = p.getParent();
					}
					// Procedemos a la creación del elemento en caso de haberse encontrado donde enganchar el elemento a crear
					if ( p.getContainerEl() !== null ) {
						elem = renderer.html5.base.WidgetRenderer.createNewElement( this, p.getContainerEl() );
					}
					
					// Si no se encuentra elemento contenedor para el nuevo elemento o se ha producido un error, mostramos un mensaje. 
					if ( p.getContainerEl() === null || elem === null ) {
						console.debug( "No se encuentran ocurrencias para el widget con rol '" + renderRole + "' en la plantilla y no ha podido ser creado automáticamente." );
						elem = null;
					}
				
				} else if ( elem.length === 0 && !createIfNotExists ) {
					elem = null;
					
				} else if ( elem.length > 1 ) {
					var parentLevel = 3;
					var candidate;
					var p = this.getParent();
					
					while ( elem.length !== 1 && p !== null && parentLevel > 0 ) {
						for ( var i = 0; elem.length !== 1 && i < elem.length && p.getEl() != null; i++ ) {
							candidate = $( elem.get(i) );
							if ( (candidate.closest( p.getEl() ) ).length !== 0 ) {
								elem = candidate;
							}
						}
						parentLevel--;
						p = p.getParent();
					}
					
					if ( elem.length > 1 ) {
//						console.warn( "Se han encontrado varias ocurrencias para el widget con rol '" + renderRole + "' y se optará por usar la primera de ellas." );
						elem = elem.first();
					}
				
				} else if ( elem.length === 1 ) {
					elem = elem.first();
				}
			} catch (ex) {
				elem = null;
				console.error( ex.stack );
			}
				
			return elem;
		},
		
		/*
		 * Si el contenedor de la plantilla indica que hay que situarlo en otro sitio, procedemos a ello.
		 * Usa para ello las propiedades 'data-relocate-parent' y 'data-relocate-container' del elemento en el DOM.
		 * 		data-relocate-parent:    Indica el padre común del elemento actual y del destinatario.
		 * 		data-relocate-container: Indica el elemento hijo del padre especificado donde se situara.
		 */
		__relocateRender : function() {
			if (this.getEl() !== null) {
				var container = this.getEl().attr('data-relocate-dest');

				// For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
				if (typeof container !== typeof undefined && container !== false) {
					// Si no se especifica ningun elemento padre, se buscará en todo el documento.
					var parent = this.getEl().attr('data-relocate-parent');
					if (typeof parent === typeof undefined || parent === false) {
						parent = 'body';
					}
					
					var newParent = this.getEl().closest( parent ).find( container ).first() || [];
					if (newParent.length !== 0 ) {
						newParent.append( this.getEl() );
					}
				}
			}
		},
		
		_renderIsDone : function() {
			this.base( arguments );
			
			this.__markWidgetInDOM();
		},
		
		__markWidgetInDOM : function() {
			// Agregamos un atributo al elemento HTML con el identificador del widget en la conexión.
//TODO: los siguientes atributos deberian agregarse solo en depuracion, no en explotacion.
			try {
				if (this.getEl() !== null) {
					this.getEl().attr('data-widget-id', this.getJSWWidget()._jswId );
					this.getEl().attr('data-widget-type', this.getJSWWidget().classname );
				}
			} catch (ex) {
				console.error (ex.stack);
			}
		},
		
		replaceTag : function(currentElem, tag, withDataAndEvents, deepWithDataAndEvents) {
	        return this.self(arguments).replaceTag(currentElem, tag, withDataAndEvents, deepWithDataAndEvents);
		},
		
		getElementBuilderInfo : function() {
			return renderer.base.WidgetRenderer.__DEFAULT_ELEMENT_BUILDER_INFO;
		} 
	}

});

