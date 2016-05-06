
jsw.qx.Class.define( "renderer.tabris.MenuSeparatorRenderer", {

	extend : renderer.tabris.WidgetRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.menu.MenuSeparator", {
	create : function() {
		return new renderer.tabris.MenuSeparatorRenderer();
	}
});