jsw.qx.Class.define( "renderer.html5.base.TabsRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
		_onPropertyChangeEvent : function( evt ) {
			this.base( arguments, evt );
		},
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Tabs", {
	create : function() {
		return new renderer.html5.base.TabsRenderer();
	}
});
