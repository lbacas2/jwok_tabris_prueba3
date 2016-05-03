
jsw.qx.Class.define( "renderer.html5.metronic.DisplayRenderer", {

	extend : renderer.html5.base.DisplayRenderer,

	statics : {
		//@Override
		blockUI : function() {
			if ( App !== undefined ) {
				App.blockUI( {animate: true } );
			}
		},
		
		//@Override
		unblockUI : function() {
			if ( App !== undefined ) {
				App.unblockUI();
			}
		}
	},
	
	members : {
	}

});


renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.JSWDisplay", {
	create : function() {
		return new renderer.html5.metronic.DisplayRenderer();
	}
});
