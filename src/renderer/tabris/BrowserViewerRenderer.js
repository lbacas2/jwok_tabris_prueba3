
jsw.qx.Class.define( "renderer.tabris.BrowserViewerRenderer", {

	extend : renderer.tabris.WidgetRenderer,

	members : {
		//@Override
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var _this = this;
				var elem = new tabris.WebView({
						id : this.getJSWWidget().getRenderRole()
				}).appendTo( parentElem );
				
				this.setEl( elem );
				this.base( arguments );
				
				this._updateSource();
			}
			
			this._renderIsDone();
		},
		
		_updateSource : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'url', this.getJSWWidget().getSource() );
			}
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.BrowserViewer",  {
	create : function() {
		return new renderer.tabris.BrowserViewerRenderer();
	}
});
