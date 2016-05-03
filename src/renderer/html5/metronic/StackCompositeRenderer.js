
jsw.qx.Class.define( "renderer.html5.metronic.StackCompositeRenderer", {

	extend : renderer.html5.base.StackCompositeRenderer,

	members : {
		
		render : function() {
			// Llamada al renderer de Composite que nos devuelve el elemento del DOM en caso de existir
			this.base(arguments);
			
			if ( this.getEl() !== null ) {
				// Vaciamos el contenido del elemento DOM para prevenir interferencias si hay elementos en la plantilla.
				this.getEl().empty();
				
				// Reubicamos o creamos un elemento para cada uno de los hijos.
				var children = this.getJSWWidget().getChildren();
				for ( var i = 0, len = children.length; i < len; i++) {
					if ( children[ i ].getRenderRole() !== '' ) {
						var elem = children[ i ].getRenderer().__locateInTemplate( null, null, true );
						if ( elem !== null ) { 
							this.getEl().append( elem );
						}
					}
				}
			}
			
			this._renderIsDone();
		}
		
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.StackComposite",  {
	create : function() {
		return new renderer.html5.metronic.StackCompositeRenderer();
	}
});

