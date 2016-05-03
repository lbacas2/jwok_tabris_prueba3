
jsw.qx.Class.define( "jsw.widgets.InputCheckbox", {

	extend : jsw.widgets.base.JSWItem,
	
	include: jsw.widgets.mixin.InputControl,

	construct : function(  ) {
		this.base( arguments );
		
		this._label = "";
	},

	members : {
		_setLabel : function( value ) {
			if (!this._equal(this._label, value) ) {
				var oldValue = this._label;
				this._label = value; 
				this._dispatchAsyncChangePropertyEvent( "label", oldValue, this._label );
			}
		},
		
		getLabel : function() {
			return (this._label == null)? "" : this._label; 
		},
		
		isChecked : function() {
			var value = this.getValue();
			if (typeof value === "string") { 
				value = $.parseJSON(value); 
			}
			
			return ( value == true ); 
		}
	}
} );


