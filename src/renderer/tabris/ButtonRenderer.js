
jsw.qx.Class.define( "renderer.tabris.ButtonRenderer", {

	extend : renderer.ButtonRenderer,

	members : {
		render : function() {
			if ( this.getParent() !== null && this.getParent().getEl() !== null ) {
				var _this = this;
				var elem = new tabris.Button({
						id : this.getJSWWidget().getRenderRole(),
				}).appendTo( this.getParent().getEl() );
				
				this.setEl( elem );
				elem.on("select", function() {
					_this.onCommand();
				});
				
				this.base( arguments );
				
				this._updateText();
				this._updateImage();
			}
			
			this._renderIsDone();
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

