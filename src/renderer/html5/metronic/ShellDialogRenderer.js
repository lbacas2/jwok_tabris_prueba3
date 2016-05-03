
jsw.qx.Class.define( "renderer.html5.metronic.ShellDialogRenderer", {

	extend : renderer.html5.base.ShellDialogRenderer,

	statics : {
		VALID_SIZES  : ['modal-sm', 'modal-lg', 'modal-full', ''],
		DEFAULT_SIZE : '',
	},
	
	members : {
		render : function() {
			// Obtenemos el elemento del DOM que representa a la plantilla
			var elemTpl = this.__locateInTemplate( '#messageBoxTemplate', $('body') );
			if ( elemTpl !== null ) {
				var _this = this;
				
				var renderRole = this.getJSWWidget().getRenderRole() || '';
				
				// Hacemos copia de la plantilla del dialogo y creamos el contenedor del dialogo modal
				// y el div para bloquear el fondo.
				this.setEl( elemTpl.clone() );
				this.getEl().removeAttr('id');
				this.getEl().attr({
					'data-render-role': renderRole, 
					'aria-labelledby' : renderRole
				});
				
				this.setContainerEl( this.getEl().find('[data-render-role="messageDialog_body"]').first() );
				
				if ( (elem = this.getEl().find('button.close').first() ).length > 0 ) {
					this._closeBtnEl = elem ;
					this._closeBtnEl.on('click', function( e ) {
						e.preventDefault();
						e.stopPropagation();
						_this.onClose();
						
					});
					
				}
	
// TODO: Mecanismo para cambiar los z-index y que sean apilables.
//					this.__containerEl = elem.wrap( '<div class="modal-scrollable"></div>' ); //  style="z-index: 10051;"
//					this.__backdropEl  = $('<div class="modal-backdrop fade in"></div>'); //  style="z-index: 10050;"
				
				// Ponemos el título de la Shell al cuadro de diálogo
				if ( (titleEl = this.getEl().find('.modal-content .modal-header .modal-title').first()).length > 0) {
					titleEl.text( this.getJSWWidget().getTitle() || '' );
				}
				
				// Agregamos los elementos al DOM al final del Body
				this.getEl().appendTo( $('body') );
				
				// Establecemos el tamaño definido en la plantilla del dialogo
				renderer.html5.metronic.ShellDialogRenderer.VALID_SIZES.forEach( function( validSize ) {
					if ( this._size === null && _this.getEl().find('.modal-dialog').hasClass( validSize ) ) {
						this.setSize( validSize );
					}
				});
				
				// Evento que se lanza antes de mostrar el cuadro de dialogo.
				this.getEl().on('show.bs.modal', function() {
					_this.getEl().find('.modal-dialog').removeClass('modal-sm modal-lg modal-full').addClass( _this.getSize() );
				});
				
				// Evento que se lanza una vez mostrado el cuadro de dialogo.
				this.getEl().on('shown.bs.modal', function(){
					// Forzamos una recarga de los DataTables que pueda haber
					// TODO: Esto no deberia ir aqui
					// 
					if ( typeof $.fn.dataTable !== 'undefined' ) {
						$.fn.dataTable.tables( { api: true } ).scroller.measure();
						// TODO: Horror!!! Encontrar alguna forma mejor.
						// Forzamos otro refresco al medio segundo.
						setTimeout( function() {
							$.fn.dataTable.tables( { api: true } ).scroller.measure();
						}, 500);
					}
				});
				
				// Evento que se lanza una vez ocultado el cuadro de dialogo.
				this.getEl().on('hidden.bs.modal', function (e) {
					if ( _this.getEl() !== null ) {
						_this.getEl().remove();
					}
				});
				
				this.base( arguments );
				this._renderIsDone();
			}
		},
		
		afterChildrenChanged : function () {
			this.base(arguments);
			
			this.__getSizeFromDOM();
		},
		
		onCreate : function( evt ) {
			this._size       = null;
			this._closeBtnEl = null;
			this.__visible   = false;
			this.__dialogShowOptions = {
					backdrop: 'static', 
					keyboard: false,
					show:     true
			};
			this.base( arguments, evt );
			
			this.setSize( '' );
		},
		
		onDispose : function( evt ) {
			if ( this.getEl() !== null ) {
				this.hide();
			}
			
			this.base( arguments, evt );
		},
		
		show : function() {
			this.base( arguments );
			
			if ( this.getEl() !== null && !this.__visible ) {
				var _this = this;
				this.__visible = true;
				// Mostramos el cuadro de dialogo
				setTimeout( function() {
					_this.getEl().modal( _this.__dialogShowOptions );
				}, 500);
			}
		}, 
		
		hide : function() {
			this.base( arguments );
			
			if ( this.getEl() !== null && this.__visible ) {
				this.getEl().modal('hide');
			}
		},
		
		setSize : function( size ) {
			if ( $.inArray( size, renderer.html5.metronic.ShellDialogRenderer.VALID_SIZES ) ) {
				this._size = size;
			}
		}, 
		getSize : function() {
			return this._size;
		},
		
		onClose : function() {
			this.getJSWWidget().close();
		},
		
		__getSizeFromDOM : function() {
			if ( this.getEl() !== null ) {
				// Buscamos alguna directiva de tamaño del cuadro de dialogo y la aplicacmos
				var elem = this.getEl().find( '[data-dialog-size]' ).first();
				if ( elem.length > 0 ) {
					_this.setSize( elem.attr('data-dialog-size') || '' );
				}
			}
		}

	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.JSWShell:messageDialog", {
	create : function() {
		return new renderer.html5.metronic.ShellDialogRenderer();
	}
});