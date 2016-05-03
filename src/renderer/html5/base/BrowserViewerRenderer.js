
jsw.qx.Class.define( "renderer.html5.base.BrowserViewerRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	construct : function() {
		this.base( arguments );
	},

	members : {
		render : function() {
			this.base( arguments );
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.BrowserViewer", {
	create : function() {
		return new renderer.html5.base.BrowserViewerRenderer();
	}
});

