
jsw.qx.Class.define( "renderer.tabris.ShellRenderer", {

	extend : renderer.ShellRenderer,

	members : {
		render : function() {
			this.base( arguments );
			
			this._renderIsDone();
		}
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.JSWShell", {
	create : function() {
		return new renderer.tabris.ShellRenderer();
	}
});