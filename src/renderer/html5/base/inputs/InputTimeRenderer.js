
jsw.qx.Class.define( "renderer.html5.base.InputTimeRenderer", {

	extend : renderer.html5.base.InputControlRenderer,

	members : {
		_wrapper : null,
		
		render : function() {
			// LLamamos al renderer de InputText
			this.base(arguments);
				
			if ( this.getEl() !== null && this._wrapper === null ) {
				this.getEl().attr('type', 'time');
				
				// Forzamos que el intervalo sea de 1 segundo para que el formato aparezca como HH:mm:ss
				this.getEl().prop('step', 1);
			}
			
			// Initializate control: Set value, readOnly and placeholder properties.
			this.init();
			this.addInputControlListeners();
		},
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputTime", {
	create : function() {
		return new renderer.html5.base.InputTimeRenderer();
	}
});

