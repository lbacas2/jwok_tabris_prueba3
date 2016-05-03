jsw.qx.Class.define( "jsw.widgets.ProgressBar", {

	extend : jsw.widgets.base.JSWItem,

	construct : function(  ) {
		this.base( arguments );
		
		this._value    = 0;
		this._minValue = 0;
		this._maxValue = 100;
	},

	members : {
		_setValue : function( value ) {
			if ( !this._equal(this._value, value) ) {
				var oldValue = this._value;
				this._value = value; 
				this._dispatchAsyncChangePropertyEvent( 'value', oldValue, this._value );
			}
		},

		setValue : function( value ) {
			if ( !this._equal(this._value, value) ) {
				var oldValue = this._value;
				this._value = value; 
				this._dispatchAsyncChangePropertyEvent( 'value', oldValue, this._value );
				this._handlePropertyModification( "Value", "value", this.getValue() );
			}
		},

		getValue : function() {
			return this._value; 
		},
		
		
		_setMinValue : function( value ) {
			if ( !this._equal(this._minValue, value) ) {
				var oldValue = this._minValue;
				this._minValue = value; 
				this._dispatchAsyncChangePropertyEvent( 'minValue', oldValue, this._minValue );
			}
		},

		getMinValue : function() {
			return this._minValue; 
		},
		
		
		_setMaxValue : function( value ) {
			if ( !this._equal(this._maxValue, value) ) {
				var oldValue = this._maxValue;
				this._maxValue = value; 
				this._dispatchAsyncChangePropertyEvent( 'maxValue', oldValue, this._maxValue );
			}
		},

		getMaxValue : function() {
			return this._maxValue; 
		}

	}
} );