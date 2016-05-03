
jsw.qx.Class.define( "renderer.html5.base.MenuSeparatorRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	members : {
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.menu.MenuSeparator", {
	create : function() {
		return new renderer.html5.base.MenuSeparatorRenderer();
	}
});


