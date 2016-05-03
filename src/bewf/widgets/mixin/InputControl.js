jsw.qx.Mixin.define("jsw.widgets.mixin.InputControl", {

	statics : {
		widgetProperties : [
		    "value",
		    "placeHolder",
		    "readOnly"
		],

		widgetMethods : {
			"value" : function( widget, value ) {
				if (typeof value === 'string') {
					var EncodingUtil = jsw.util.Encoding;
					var text = EncodingUtil.truncateAtZero( value );
					text = EncodingUtil.replaceNewLines( text, " " );
				}
				widget._setValue( value );
			},
			"placeHolder" : function( widget, value ) {
				var EncodingUtil = jsw.util.Encoding;
			    var text = EncodingUtil.truncateAtZero( value );
		        text = EncodingUtil.replaceNewLines( text, " " );
				widget._setPlaceHolder( value );
			},
			"readOnly" : function( widget, value ) {
				widget._setReadOnly( value );
			}
			
		},
		
		events : [ 
		    "Value"
		]
	},

  members: {
	  _value       : null,
	  _placeHolder : null,
	  _readOnly    : false,
	  
	  
	  _setValue : function( value ) {
		  if( !this._equal(this._value, value) ) {
			  var oldValue = this._value;
			  this._value = value; 
			  this._dispatchAsyncChangePropertyEvent( "value", oldValue, this._value );
		  }
	  },
		
	  setValue : function( value ) {
		  if( !this._equal(this._value, value) ) {
			  var oldValue = this._value;
			  this._value = value; 
			  this._dispatchAsyncChangePropertyEvent( "value", oldValue, this._value );
			  this._handlePropertyModification( "Value", "value", this.getValue(), true ); // supressSend = true
		  }
	  },
		
	  getValue : function() {
		  if(this._value == null){
			  return "";
		  }
		  return this._value; 
	  },
	  
	  
	  _setPlaceHolder : function( placeHolder ) {
		  if( !this._equal(this._placeHolder, placeHolder) ) {
			  var oldPlaceHolder = this._placeHolder;
			  this._placeHolder = placeHolder; 
			  this._dispatchAsyncChangePropertyEvent("placeHolder", oldPlaceHolder, this._placeHolder);
		  }
	  },

	  getPlaceHolder : function() {
		  if( this._placeHolder == null ) {
			  return "";
		  }
		  return this._placeHolder; 
	  },
	  
	  
	  _setReadOnly : function( readOnly ) {
		  if( !this._equal(this._readOnly, readOnly) ) {
			  var oldReadOnly = this._readOnly;
			  this._readOnly = readOnly; 
			  this._dispatchAsyncChangePropertyEvent("readOnly", oldReadOnly, this._readOnly);
		  }
	  },

	  isReadOnly : function() {
		  return this._readOnly; 
	  }
  }
});
