
jsw.qx.Class.define( "renderer.html5.metronic.ShellTopViewRenderer", {

	extend : renderer.html5.base.ShellRenderer,

	members : {
		render : function() {
			this.base(arguments);
			$("body").removeClass("login");
			
			this._renderIsDone();
		}

	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.JSWShell:mainTopView",  {
	create : function() {
		return new renderer.html5.metronic.ShellTopViewRenderer();
	}
});

