
jsw.qx.Class.define( "renderer.html5.base.InputCheckboxRenderer", {

	extend : renderer.html5.base.InputControlRenderer,

	members : {
		render : function() {
			this.base(arguments);

			// Initializate control: Set value, readOnly and placeholder properties.
			this.init();
			this.addInputControlListeners();
		},
		
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			
			switch (evt.property) {
				case 'label':
					this._updateLabel();
					break;
				case 'checked':
					this._updateValue();
					break;
				default:
			}
		},
		
		_updateLabel : function () {},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputCheckbox", {
	create : function() {
		return new renderer.html5.base.InputCheckboxRenderer();
	}
});

