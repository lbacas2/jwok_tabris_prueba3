
jsw.qx.Class.define( "renderer.tabris.WidgetRenderer", {

	extend : renderer.base.WidgetRenderer,

	construct : function() {
		this.base( arguments );
		
		this.__template = null;
		this._dirty     = false;
		
		this.__parentToRedraw = null;
	},
	
	/*
	 *****************************************************************************
     STATICS
	 *****************************************************************************
	 */
	statics : {
	},

	/*
	 *****************************************************************************
     MEMBERS
	 *****************************************************************************
	 */
	members : {
		onDispose : function(evt) {
			this.base( arguments );
			
			if ( this.getEl() !== null ) {
				this.getEl().dispose();
				this.setEl( null );
			}
		},
		
		getChildrenTemplates : function() {
			return this.__template;
		},
		
		hasChildrenTemplates : function() {
			return this.getChildrenTemplates() !== null;
		},
		
		setChildrenTemplates : function( value ) {
			if (typeof value !== 'object') {
				value = null;
			} 
			this.__template = value;
		},
		
		_updateEnabled : function() {
			if (this.getEl() !== null) {
				this.getEl().set( 'enabled', this.getJSWWidget().isEnabled() );
			}
		},
		
		//@Override
		_tryRender : function() {
			try {
//				var renderRole = this.getJSWWidget().getRenderRole() || '';
				if ( this.isTemplated() ) {
					this.getParent().removeEventListener( renderer.base.Renderer.RENDER_EVENT_TYPE, this._onParentRenderedEvent, this );
					if ( this.getParent() ) {
						if ( this.getParent().isRendered() ) {
							this.render();
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
			
			if ( role !== '' ) {
				renderer.tabris.utils.Template.downloadTemplateIfExists( this );
			} else {
				this.templateIsDone( null );
			}
			return;
		},
		
		templateIsDone : function( template ) {
			template = template || null;
			
			this.setTemplated( true );
			this.setChildrenTemplates( template );
			
			var evt = new jsw.event.Event( renderer.base.Renderer.TEMPLATE_EVENT_TYPE );
			this.dispatchEvent( evt, false );
		},
		
		__findParentToRedraw : function() {
			var renderRole = this.getJSWWidget().getRenderRole() || '';
			var parentToRedraw = null;
				
			if ( renderRole !== '' ) {
				// Buscamos si algun progenitor tiene plantilla para el widget.
				var templates = null;
				var p = this;
				
				while ( p.getParent() !== null && p.getJSWWidget().classname !== 'jsw.widgets.JSWShell' && parentToRedraw === null ) {
					p = p.getParent();
					templates = p.getChildrenTemplates();
					
					if ( templates !== null && typeof templates === 'object' && templates[ '#' + renderRole ] !== undefined ) {
						parentToRedraw = p;
					}
				}
			}
			
			return parentToRedraw;
		},
		
		getEffectiveParentElement : function() {
			if ( this.getJSWWidget().getRenderRole() === '' ) {
				return null;
			}
			
			// Get parent widget with layout info on this widget.
			this.__parentToRedraw = this.__findParentToRedraw();
			if ( this.__parentToRedraw === null ) {
				return null;
			}
			
			// Get created parent to append this widget
			var parentElem = this.getParent();
			while ( parentElem !== null && parentElem.getEl() === null && parentElem.getJSWWidget().classname !== 'jsw.widgets.JSWShell' ) {
				parentElem = parentElem.getParent();
			}
			
			if ( parentElem !== null && parentElem.getEl() !== null ) {
				return parentElem.getEl();
			}
			return null;
		},

		/*
		render : function() {
			this.base( arguments );
			
			if ( this.getEl() !== null ) {
				console.log ( 'Widget #' + this.getEl().get( 'id' ) );
			}
		},
		*/
		
		afterChildrenChanged : function () {
			this.base( arguments );
			
			try {
				if ( this.getEl() !== null && this.hasChildrenTemplates() && this.isDirty() ) {
					if ( this.getEl().children().length > 0 ) {
						//this.getEl().apply( JSON.stringify( this.getChildrenTemplates() ) );
						this.getEl().apply( this.getChildrenTemplates() );
// TODO!!!!
						/*
						page.on("resize", function(page, bounds) {
							page.apply(require("./layout-" + (bounds.width > bounds.height ? "landscape" : "portrait")));
						}).open();
						*/
					}
				}
			} catch( ex ) {
				console.error( ex.stack );
			} finally {
				this._dirty = false;
			}
		},
		
		_renderIsDone : function() {
			this.base( arguments );
			
			// Enviamos un evento al progenitor con la información de nuestra plantilla para que fuerce un redraw.
			if ( this.isRendered() && this.__parentToRedraw !== null && this.__parentToRedraw.getEl() !== null ) {
				this.__parentToRedraw.markAsDirty();
				renderer.base.Renderer.RendererQueueManager.addToChildrenChangedQueue( this.__parentToRedraw );
			}
		},
		
		markAsDirty : function () {
			this._dirty = true;
		},
		
		isDirty : function () {
			return (this._dirty === true);
		},
		
		
		//@Override
		show : function() {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'visible', true );
			}
		}, 
		
		//@Override
		hide : function() {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'visible', false );
			}
		}
		
	}

});

