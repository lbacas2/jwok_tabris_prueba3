
jsw.qx.Class.define( "renderer.tabris.ToolItemRenderer", {

	extend : renderer.tabris.WidgetRenderer,
	
	construct : function() {
		this.base( arguments );
		this.imgEl = null;
		this.textEl = null;
	},

	members : {
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var _this = this;
// TODO: Change to 'ToggleButton' widget???
				var elem = new tabris.Button({
						id : this.getJSWWidget().getRenderRole(),
				}).appendTo( parentElem );
				
				this.setEl( elem );
				elem.on("select", function( button ) {
					_this.onCommand();
				});
				
				this.base( arguments );
				
				this._updateText();
				this._updateImage();
				this._updateSelected();
			}
			
			this._renderIsDone();
		},
		
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			
			switch (evt.property) {
				case 'text':
					this._updateText();
					break;
				case 'image':
					this._updateImage();
					break;
				case 'selected':
					this._updateSelected();
					break;
				default:
			}
		},
		
		_updateText : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'text', this.getJSWWidget().getText() );
			}
		},
		
		_updateImage : function() {
			var image = this.getJSWWidget().getImage();
			
			if ( this.getEl() !== null && image !== null ) {
				this.getEl().set( 'image', image );
			}
		}, 
		
		_updateSelected : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'selection', this.getJSWWidget().isSelected() );
			}
		},
		
		onCommand : function() {
			this.getJSWWidget().command();
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ToolItem", {
	create : function() {
		return new renderer.tabris.ToolItemRenderer();
	}
});

