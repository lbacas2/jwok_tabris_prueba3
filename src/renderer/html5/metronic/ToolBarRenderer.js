
jsw.qx.Class.define( "renderer.html5.metronic.ToolBarRenderer", {

	extend : renderer.html5.base.ToolBarRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}

	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ToolBar", {
	create : function() {
		return new renderer.html5.metronic.ToolBarRenderer();
	}
});