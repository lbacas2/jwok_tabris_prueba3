
jsw.qx.Class.define( "jsw.widgets.InputDecimal", {

	extend : jsw.widgets.base.JSWItem,
	
	include: jsw.widgets.mixin.InputControl,

	construct : function(  ) {
		this.base( arguments );
		
		this._value = 0.0;
		this._integerLength = 0;
		this._decimalLength = 0;
	},

	members : {
		_setIntegerLength : function( length ) {
			if(!this._equal(this._integerLength, length)){
	  			var oldValue = this._integerLength;
		  		this._integerLength = length;
		  		this._dispatchAsyncChangePropertyEvent("integerLength", oldValue, this._integerLength);
		  	}
		},
		
		getIntegerLength : function() {
			return this._integerLength;
		},
		
		
		_setDecimalLength : function( length ) {
			if(!this._equal(this._decimalLength, length)){
	  			var oldValue = this._decimalLength;
		  		this._decimalLength = length;
		  		this._dispatchAsyncChangePropertyEvent("decimalLength", oldValue, this._decimalLength);
		  	}
		},
		
		getDecimalLength : function() {
			return this._decimalLength;
		}

	}
} );