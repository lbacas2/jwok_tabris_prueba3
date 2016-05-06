
jsw.qx.Class.define( "renderer.tabris.MenuModuleRenderer", {

	extend : renderer.tabris.ParentWidgetRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.menu.MenuModule", {
	create : function() {
		return new renderer.tabris.MenuModuleRenderer();
	}
});



