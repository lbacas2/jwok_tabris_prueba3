jsw.qx.Class.define( "renderer.html5.metronic.InputIntegerRenderer", {

	extend : renderer.html5.base.InputIntegerRenderer,

	include : renderer.html5.metronic.mixin.InputControlRenderer,
	
	members : {
		render : function() {
			// LLamamos al renderer de InputText
			this.base(arguments);
			
			if ( this.getEl().attr('data-template') === undefined ) {
				if (this.getEl() !== null && $.inputmask && this.getEl().inputmask) {
					// Change input type and load inputMask plugin
					this.getEl().attr('type', 'text').inputmask("integer");
				}
				
				this._renderIsDone();
			}
		},
		
		_onPropertyChangeEvent : function( evt ) {
			if ( evt.property === 'readOnly' || evt.property === 'enabled' ) {
				this.__changeHighlight();
			}
			
			this.base(arguments, evt);
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputInteger",  {
	create : function() {
		return new renderer.html5.metronic.InputIntegerRenderer();
	}
});

