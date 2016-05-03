
jsw.qx.Class.define( "renderer.html5.base.InputTextRenderer", {

	extend : renderer.html5.base.InputControlRenderer,

	members : {
		getElementBuilderInfo : function() {
			return {
				type  : 'input',
				class : 'hidden',
				attrs : {
					'type': 'text'
				}
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

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputText", {
	create : function() {
		return new renderer.html5.base.InputTextRenderer();
	}
});

