
jsw.qx.Class.define( "renderer.tabris.ShellRenderer", {

	extend : renderer.tabris.ParentWidgetRenderer,

	members : {
		render : function() {
			var elem = new tabris.Page({
					id :       this.getJSWWidget().getRenderRole() || '',
					title :    this.getJSWWidget().getTitle() || 'icaria',
					topLevel : true
			}).open();

			this.setEl( elem );				
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