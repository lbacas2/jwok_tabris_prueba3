
jsw.qx.Class.define( "renderer.tabris.InputComboSeparatorRenderer", {

	extend : renderer.tabris.WidgetRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.inputcombo.InputComboSeparator", {
	create : function() {
		return new renderer.tabris.InputComboSeparatorRenderer();
	}
});

