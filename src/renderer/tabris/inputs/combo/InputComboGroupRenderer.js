jsw.qx.Class.define( "renderer.tabris.InputComboGroupRenderer", {

	extend : renderer.tabris.ParentWidgetRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.inputcombo.InputComboGroup", {
	create : function() {
		return new renderer.tabris.InputComboGroupRenderer();
	}
});

