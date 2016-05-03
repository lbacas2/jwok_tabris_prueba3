
jsw.qx.Class.define( "renderer.html5.metronic.ShellLoginRenderer", {

	extend : renderer.html5.base.ShellRenderer,

	members : {
		render : function() {
			this.base(arguments);
			$("body").addClass("login");
			
			this._renderIsDone();
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.JSWShell:login", {
	create : function() {
		return new renderer.html5.metronic.ShellLoginRenderer();
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.JSWShell:loginView",  {
	create : function() {
		return new renderer.html5.metronic.ShellLoginRenderer();
	}
});


