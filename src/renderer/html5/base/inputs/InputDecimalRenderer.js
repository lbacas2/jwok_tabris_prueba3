jsw.qx.Class.define( "renderer.html5.base.InputDecimalRenderer", {

	extend : renderer.html5.base.InputTextRenderer,

	members : {
		render : function() {
			// LLamamos al renderer de InputText
			this.base(arguments);
			
			if (this.getEl() !== null) {
				this.getEl().attr('type', 'number');
			}
		}
	}
	
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputDecimal",  {
	create : function() {
		return new renderer.html5.base.InputDecimalRenderer();
	}
});