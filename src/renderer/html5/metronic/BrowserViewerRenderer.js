
jsw.qx.Class.define( "renderer.html5.metronic.BrowserViewerRenderer", {

	extend : renderer.html5.base.BrowserViewerRenderer,

	construct : function() {
		this.base( arguments );
		
		this._wrappingDivEl = null;
	},

	members : {
		render : function() {
			var role = this.getJSWWidget().getRenderRole();
			
			if (role != null) {
				this.setEl( $('[data-render-role="' + role +'"]').first() );
				
				if (this.getEl() !== null) {
					this.base(arguments);
					
					// Wrapping responsive div
					this.getEl().wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
					this._wrappingDivEl = this.getEl().parent();
					
					// Iframe source
					this.getEl().attr({
						'src'   : this.getJSWWidget().getSource(),
						'class' : 'embed-responsive-item'
					});
				}
			}
			
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.BrowserViewer", {
	create : function() {
		return new renderer.html5.metronic.BrowserViewerRenderer();
	}
});

