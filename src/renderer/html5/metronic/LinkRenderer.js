
jsw.qx.Class.define( "renderer.html5.metronic.LinkRenderer", {

	extend : renderer.html5.base.LinkRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}

	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Link", {
	create : function() {
		return new renderer.html5.metronic.LinkRenderer();
	}
});