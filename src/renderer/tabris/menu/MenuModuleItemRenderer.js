
jsw.qx.Class.define( "renderer.tabris.MenuModuleItemRenderer", {

	extend : renderer.tabris.WidgetRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.menu.MenuModuleItem", {
	create : function() {
		return new renderer.tabris.MenuModuleItemRenderer();
	}
});
