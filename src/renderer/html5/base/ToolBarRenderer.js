
jsw.qx.Class.define( "renderer.html5.base.ToolBarRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	construct : function() {
		this.base( arguments );
	},

	members : {
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );
				this.base( arguments );
			}
		},
		
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ToolBar", {
	create : function() {
		return new renderer.html5.base.ToolBarRenderer();
	}
});


