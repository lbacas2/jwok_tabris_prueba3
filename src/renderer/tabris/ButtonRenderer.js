
jsw.qx.Class.define( "renderer.tabris.ButtonRenderer", {

	extend : renderer.tabris.WidgetRenderer,

	members : {
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var _this = this;
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
			}
			
			this._renderIsDone();
		},
		
		_onPropertyChangeEvent : function( evt ) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'text':
					this._updateText();
					break;
				case 'image':
					this._updateImage();
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
		
		onCommand : function() {
			this.getJSWWidget().command();
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Button",  {
	create : function() {
		return new renderer.tabris.ButtonRenderer( );
	}
});

