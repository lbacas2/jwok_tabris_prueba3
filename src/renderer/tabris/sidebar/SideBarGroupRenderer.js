
jsw.qx.Class.define( "renderer.tabris.SideBarGroupRenderer", {

	extend : renderer.tabris.ParentWidgetRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.sidebar.SideBarGroup", {
	create : function() {
		return new renderer.tabris.SideBarGroupRenderer();
	}
});


