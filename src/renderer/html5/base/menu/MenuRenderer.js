
jsw.qx.Class.define( "renderer.html5.base.MenuRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Menu", {
	create : function() {
		return new renderer.html5.base.MenuRenderer();
	}
});
