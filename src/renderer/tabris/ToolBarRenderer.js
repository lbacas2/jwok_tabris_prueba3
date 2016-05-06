
jsw.qx.Class.define( "renderer.tabris.ToolBarRenderer", {

	extend : renderer.tabris.ParentWidgetRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ToolBar", {
	create : function() {
		return new renderer.tabris.ToolBarRenderer();
	}
});


