jsw.qx.Class.define( "renderer.tabris.TableColumnRenderer", {

	extend : renderer.tabris.WidgetRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.table.TableColumn", {
	create : function() {
		return new renderer.tabris.TableColumnRenderer();
	}
});