
jsw.qx.Class.define( "renderer.html5.base.InputTextAreaRenderer", {

	extend : renderer.html5.base.InputControlRenderer,

	members : {
		getElementBuilderInfo : function() {
			return {
				type  : 'textarea',
				class : 'hidden',
				attrs : {}
			};
		},
		
		render : function() {
			// Si no se ha ubicado el widget en la plantilla, intentamos ubicarlo.
			if ( this.getEl() === null ) {
				this.setEl( this.__locateInTemplate() );
			}
			
			this.base( arguments );
			// Initializate control: Set value, readOnly and placeholder properties.
			this.init();
			this.addInputControlListeners();
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputTextArea", {
	create : function() {
		return new renderer.html5.base.InputTextAreaRenderer();
	}
});

