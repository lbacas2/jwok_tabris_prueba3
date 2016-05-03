
jsw.qx.Class.define( "renderer.html5.metronic.ActiveLinkRenderer", {

	extend : renderer.html5.base.ActiveLinkRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ActiveLink", {
	create : function() {
		return new renderer.html5.metronic.ActiveLinkRenderer();
	}
});