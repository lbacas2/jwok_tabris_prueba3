
jsw.qx.Class.define( "renderer.html5.base.InputDateRenderer", {

	extend : renderer.html5.base.InputControlRenderer,

	members : {
		render : function() {
			this.base( arguments );
			
			// Initializate control: Set value, readOnly and placeholder properties.
			this.init();
			this.addInputControlListeners();
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputDate", {
	create : function() {
		return new renderer.html5.base.InputDateRenderer();
	}
});

