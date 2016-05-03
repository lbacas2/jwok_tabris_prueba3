
jsw.qx.Class.define( "renderer.html5.base.CompositeRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
		getElementBuilderInfo : function() {
			return {
				type  : 'div',
				class : 'hidden',
				attrs : {}
			};
		},
		
		render : function() {
			// Buscamos su ubicación en la plantilla y si no se encuentra lo creamos.
			var elem = this.__locateInTemplate( null, null, true );
			if ( elem !== null ) { 
				this.setEl( elem );
				this.base( arguments );
			}
		}
		
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Composite", {
	create : function() {
		return new renderer.html5.base.CompositeRenderer();
	}
});


