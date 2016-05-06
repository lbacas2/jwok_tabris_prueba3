
jsw.qx.Class.define( "renderer.tabris.MenuRenderer", {

	extend : renderer.tabris.ParentWidgetRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Menu", {
	create : function() {
		return new renderer.tabris.MenuRenderer();
	}
});
