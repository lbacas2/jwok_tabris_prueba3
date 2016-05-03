
jsw.qx.Class.define( "renderer.html5.metronic.SashCompositeRenderer", {

	extend : renderer.html5.base.SashCompositeRenderer,

	members : {
		_orientation : 'horizontal', 
		
		render : function() {
			// Llamada al renderer de Composite que nos devuelve el elemento del DOM en caso de existir
			this.base(arguments);
			
			if ( this.getEl() !== null ) {
				this._orientation = this.getEl().attr('data-orientation') || 'horizontal';
				
this.getEl().css('min-height', '70vh');
				
				// Reubicamos o creamos un elemento para cada uno de los hijos.
				var children = this.getJSWWidget().getChildren();
				if ( children.length >= 1 ) {
					// Vaciamos el contenido del elemento DOM para prevenir interferencias si hay elementos en la plantilla.
					if ( this.getEl().children().length !== 0 ) {
						var auxDiv = $( document.createElement( 'div' ) ).hide().appendTo ( 'body' );
						this.getEl().children().each( function() {
							auxDiv.append( $( this ) );
						});
						this.getEl().empty();
					}
					
					var left  = children[ 0 ];		 // Simple object
					var right = children.slice( 1 ); // Array of 0..n elements  
					
					this.__createStructure( this.getEl(), left, right );
				}
				
				/* For jquery.layout */
				this.getEl().layout({
					center__size:      0.30,
					center__minSize:   200,
					center__minWidth:  200,
					center__minHeight: 300,
					east__size:        0.70

				});
			}
			
			this._renderIsDone();
		},
		
		__createStructure : function ( containerEl, left, right ) {
			if ( containerEl === null || left === null || !( jsw.qx.Class.isSubClassOf(left.constructor, jsw.widgets.base.JSWItem)  ) )
				return ;
			
			var leftEl  = left.getRenderer().__locateInTemplate( null, null, true );
			var rightEl = null;
			
			if ( right === null || ( $.isArray( right ) && right.length === 0 ) ) {
				rightEl = $(document.createElement( 'div' ));
				
			} else if ( ($.isArray( right ) && right.length === 1) || jsw.qx.Class.isSubClassOf(right.constructor, jsw.widgets.base.JSWItem)  ) {
				if ( $.isArray( right ) ) {
					right = right[ 0 ];
				}
				rightEl = right.getRenderer().__locateInTemplate( null, null, true );
				
			} else if ( $.isArray( right ) && right.length > 1 ) {
				var left  = right[ 0 ];		 // Simple object
				var right = right.slice( 1 ); // Array of 0..n elements  
				
				rightEl = $(document.createElement( 'div' ));
				this.__createStructure( rightEl, left, right );
			}
			
			if ( leftEl !== null && rightEl !== null ) { 
				containerEl.append( leftEl );
				containerEl.append( rightEl );
				
				
				/* For jquery.layout */
				leftEl.addClass( 'ui-layout-center' );
				rightEl.addClass( ( this._orientation === 'horizontal' ? 'ui-layout-east' : 'ui-layout-south' ) );
			
				/* For jquery.sash */
				/*
				containerEl.sash({
						content1: leftEl,
						content2: rightEl,
						orientation : this._orientation
				});
				*/
			}			
		}
		
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.SashComposite",  {
	create : function() {
		return new renderer.html5.metronic.SashCompositeRenderer();
	}
});

