jsw.qx.Class.define( "renderer.html5.metronic.InputDecimalRenderer", {

	extend : renderer.html5.base.InputDecimalRenderer,

	include : renderer.html5.metronic.mixin.InputControlRenderer,
	
	members : {
		render : function() {
			// LLamamos al renderer de InputText
			this.base(arguments);
			
			if (this.getEl() !== null && $.inputmask && this.getEl().inputmask) {
				this.getEl().inputmask("decimal");
			}
			this._renderIsDone();
		},
		
		_onPropertyChangeEvent : function( evt ) {
			if ( evt.property === 'readOnly' || evt.property === 'enabled' ) {
				this.__changeHighlight();
			}
			
			this.base(arguments, evt);
		},
	}
	
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputDecimal",  {
	create : function() {
		return new renderer.html5.metronic.InputDecimalRenderer();
	}
});