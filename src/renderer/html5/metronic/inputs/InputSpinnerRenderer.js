
jsw.qx.Class.define( "renderer.html5.metronic.InputSpinnerRenderer", {

	extend : renderer.html5.metronic.InputIntegerRenderer,

	include : renderer.html5.metronic.mixin.InputControlRenderer,
	
	members : {
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );
				
				if ( this.getEl().attr('data-template') === 'spinner' && $.fn.TouchSpin ) {
					this.base(arguments);
					
					var _this = this,
						options = {};
					
					// Remove data-template attribute form DOM element
					this.getEl().removeAttr('data-template');
					
					// Get buttons orientation
					options.verticalbuttons = (this.getEl().attr('data-buttons-vertical') !== undefined 
												&& this.getEl().attr('data-buttons-vertical') !== 'false');
					// Get buttons classes
					if ( this.getEl().attr('data-buttons-class') ) {
						options.buttonup_class = options.buttondown_class = this.getEl().attr('data-buttons-class');
					} else {
						if ( this.getEl().attr('data-button-up-class') ) {
							options.buttonup_class = this.getEl().attr('data-button-up-class');
						}
						if ( this.getEl().attr('data-button-down-class') ) {
							options.buttondown_class = this.getEl().attr('data-button-down-class');
						}
					}
					
					// Get vertical buttons classes
					if ( options.verticalbuttons ) {
						if ( this.getEl().attr('data-vicon-up-class') ) {
							options.verticalupclass = this.getEl().attr('data-vicon-up-class');
						}
						if ( this.getEl().attr('data-vicon-down-class') ) {
							options.verticaldownclass = this.getEl().attr('data-vicon-down-class');
						}
					}
					
					// Get prefix and postfix
					if ( this.getEl().attr('data-prefix') ) {
						options.prefix = this.getEl().attr('data-prefix');
					}
					if ( this.getEl().attr('data-postfix') ) {
						options.postfix = this.getEl().attr('data-postfix');
					}
					
					// Get max value, min value and step
					options.min = parseInt( this.getJSWWidget().getMinValue() );
					options.max = parseInt( this.getJSWWidget().getMaxValue() );
					options.stepinterval = ( !isNaN( parseInt(this.getEl().attr('data-step')) ) ) ? parseInt(this.getEl().attr('data-step')) : 1;
					
					// Change input type and load TouchSpin plugin
					this.getEl().attr('type', 'text')
							.TouchSpin( options );
					
					this._renderIsDone();
				} else {
					// Por la forma particular por como están extendidos los renderer de InputSpinner y de InputInteger del mismo
					// widget hay que lanzar este mecanismo junto con el workaround de la clase.
					this.base( arguments );
				}
			}
		},
		
		_onPropertyChangeEvent : function( evt ) {
			if ( evt.property === 'readOnly' || evt.property === 'enabled' ) {
				this.__changeHighlight();
			}
			
			this.base(arguments, evt);
		},
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputInteger",  {
	create : function() {
		return new renderer.html5.metronic.InputSpinnerRenderer();
	}
});

