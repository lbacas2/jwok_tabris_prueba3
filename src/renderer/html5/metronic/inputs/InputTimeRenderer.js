
jsw.qx.Class.define( "renderer.html5.metronic.InputTimeRenderer", {

	extend : renderer.html5.base.InputTimeRenderer,

	include : renderer.html5.metronic.mixin.InputControlRenderer,

	members : {
		__timePicker : null,
		
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );

				if ( jQuery().timepicker ) {
					this._wrapper = 'bootstrap-timepicker';
					
					this.__timePicker = this.getEl().timepicker({
							autoclose: true,
			                showSeconds: true,
			                showMeridian: false,
			                minuteStep: 1,
			                secondStep: 1,
			                maxHours: 24,
			                defaultTime: false,
			                explicitMode: true
					});
		            // this.getEl().timepicker('showWidget');
				}

				this.base( arguments );
				
				if ( this.__timePicker !== null ) {
					this.removeInputControlListeners();
					
					var _this = this;
					this.__timePicker.on( 'hide.timepicker', function(e) {
						// Si es solo lectura no enviamos el dato y lo restauramos.
						if ( _this.getJSWWidget().isReadOnly() ) {
							_this.updateValue();
						} else {
							_this.getJSWWidget().setValue( e.time.value );
						}
					});
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
		
		// @Override
		_updateReadOnly : function () {
			var readOnly = this.getJSWWidget().isReadOnly();
			var disabled = readOnly || !this.getJSWWidget().isEnabled();
			
			if ( this.getEl() !== null ) {
				this.getEl().prop( 'readonly', readOnly );
				this.getEl().prop( 'disabled', disabled );
			}
		},
		
		// @Override
		_updateEnabled : function() {
			this._updateReadOnly( arguments );
		},
		
		// @Override
		_updateValue : function () {
			if ( this.getEl() !== null ) {
				this.getEl().timepicker( 'setTime', this.getJSWWidget().getValue() );
			}
		},
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputTime",  {
	create : function() {
		return new renderer.html5.metronic.InputTimeRenderer();
	}
});
