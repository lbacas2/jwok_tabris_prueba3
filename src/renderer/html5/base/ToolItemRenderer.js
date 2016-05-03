
jsw.qx.Class.define( "renderer.html5.base.ToolItemRenderer", {

	extend : renderer.html5.base.WidgetRenderer,
	
	construct : function() {
		this.base( arguments );
		this.imgEl = null;
		this.textEl = null;
	},

	members : {
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );
			}
				
			// Si no existe el toolItem en la plantilla pero si el ToolBar, lo creamos.
			if (this.getEl() === null && this.getParent().getEl() !== null) {
				var renderRole = this.getJSWWidget().getRenderRole();
				this.setEl( $(document.createElement('a')).attr('data-render-role', renderRole) );
				this.getParent().getEl().append( this.getEl() );
			}
			
			if (this.getEl() !== null && this.getEl().length > 0) {
				if ( (this.textEl = this.getEl().find('.title').first() ).length == 0) {
					this.textEl = $(document.createElement('span')).addClass('title').appendTo( this.getEl() );
				}

				var _this = this;
				this.getEl().on("click", function( event ) {
					event.preventDefault();
					
					_this.onCommand();
				});
				
				this.base(arguments);
				this._updateText();
				this._updateImage();
				this._updateSelected();
			}
		},
		
		onCommand : function() {
			this.getJSWWidget().command();
		},
		
		
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			
			switch (evt.property) {
				case 'text':
					this._updateText();
					break;
				case 'image':
				case 'hotImage':
				case 'disabledImage':
					this._updateImage();
					break;
				case 'selected':
					this._updateSelected();
					break;
				default:
			}
		},
		
		_updateText : function () {
			if (this.textEl !== null) {
				this.textEl.html( this.getJSWWidget().getText() );
			}
		},
		
		_updateImage : function () {
			return;
			// NOTE: Redefined in specific renderer: metronic, ...
		},
		
		_updateSelected : function () {
			return;
			// NOTE: Redefined in specific renderer: metronic, ...
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ToolItem", {
	create : function() {
		return new renderer.html5.base.ToolItemRenderer();
	}
});

