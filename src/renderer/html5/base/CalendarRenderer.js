jsw.qx.Class.define( "renderer.html5.base.CalendarRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Calendar", {
	create : function() {
		return new renderer.html5.base.CalendarRenderer();
	}
});
renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.calendar.CalendarEvent", {
	create : function() {}
});