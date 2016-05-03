
jsw.qx.Class.define( "jsw.widgets.InputInteger", {

	extend : jsw.widgets.base.JSWItem,
	
	include: jsw.widgets.mixin.InputControl,

	construct : function(  ) {
		this.base( arguments );
		this._value = 0;
		this._minValue = 0;
		this._maxValue = 100;
	},

	members : {
		_setMinValue : function( value ) {
			if(!this._equal(this._minValue, value)) {
				var oldValue = this._minValue;
				this._minValue = value; 
				this._dispatchAsyncChangePropertyEvent("minValue", oldValue, this._minValue);
			}
		},
		
		getMinValue : function() {
			if(this._minValue == null) {
				return 0;
			}
			return this._minValue; 
		},
		
		_setMaxValue : function( value ) {
			if(!this._equal(this._maxValue, value)) {
				var oldValue = this._maxValue;
				this._maxValue = value; 
				this._dispatchAsyncChangePropertyEvent("maxValue", oldValue, this._maxValue);
			}
		},
		
		getMaxValue : function() {
			if(this._maxValue == null) {
				return 100;
			}
			return this._maxValue; 
		}
	}
} );


