
jsw.qx.Class.define( "renderer.html5.metronic.ShellRenderer", {

	extend : renderer.html5.base.ShellRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}

	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.JSWShell", {
	create : function() {
		return new renderer.html5.metronic.ShellRenderer();
	}
});