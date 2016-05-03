
jsw.qx.Class.define( "renderer.tabris.ImageRenderer", {

	extend : renderer.ImageRenderer,

	members : {
		//@Override
		render : function() {
			if ( this.getParent() !== null && this.getParent().getEl() !== null ) {
				var _this = this;
				var elem = new tabris.ImageView({
						id : this.getJSWWidget().getRenderRole()
				}).appendTo( this.getParent().getEl() );
				
				this.setEl( elem );
				this.base( arguments );
				
				this._updateImage();
			}
			
			this._renderIsDone();
		},
		
		_updateImage : function () {
			var image = this.getJSWWidget().getImage();
			
			if ( this.getEl() !== null && image !== null ) {
				this.getEl().set( 'image', image );
			}
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Image",  {
	create : function() {
		return new renderer.tabris.ImageRenderer();
	}
});
