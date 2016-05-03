
jsw.qx.Class.define( "renderer.html5.base.ShellDialogRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
	}
  
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.JSWShell:messageDialog", {
	create : function() {
		return new renderer.html5.base.ShellDialogRenderer();
	}
});