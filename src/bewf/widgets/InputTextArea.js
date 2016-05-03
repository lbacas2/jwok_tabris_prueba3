
jsw.qx.Class.define( "jsw.widgets.InputTextArea", {

	extend : jsw.widgets.base.JSWItem,
	
	include: jsw.widgets.mixin.InputControl,

	construct : function() {
		this.base( arguments );
		this._richText = false;
	},

	destruct : function() {
	},

	members : {
		isRichText : function() {
			return this._richText;
		},
      
		_setRichText :  function( value ) {
			if( !this._equal(this._richText, value) ) {
				var oldValue = this._richText;
		  		this._richText = value;
		  		this._dispatchAsyncChangePropertyEvent("richText", oldValue, this._value);
		  	}
		  	return;
		}
		
	}
} );


