
jsw.qx.Class.define( "jsw.widgets.Label", {

  extend : jsw.widgets.base.JSWItem,

  construct : function() {
    this.base( arguments );
    
    this._text = null;
    this._image = null;
    this._richText = false;
  },

  members : {

    getText : function() {
    	if (this._text === '') {
    		return null;
    	}
    	return this._text; 
    },
    
    _setText : function( text ) {
		if ( !this._equal(this._text, text) ) {
			var oldText = this._text;
			this._text = text; 
			this._dispatchAsyncChangePropertyEvent( "text", oldText, this._text );
		}
    },
    
    isRichText : function() {
    	if (this._richText === null) {
    		return false;
    	}
    	return this._richText; 
    },
    
    _setRichText : function( value ) {
		if ( !this._equal(this._richText, value) ) {
			var oldValue = this._richText;
			this._richText = value; 
			this._dispatchAsyncChangePropertyEvent( "richText", oldValue, this._richText );
		}
    },

    
    getImage : function() {
    	if (this._image === '') {
    		return null;
    	}
    	return this._image; 
    },
    
    _setImage : function( image ) {
		if ( !this._equal(this._image, image) ) {
			var oldImage = this._image;
			this._image = image; 
			this._dispatchAsyncChangePropertyEvent( "image", oldImage, this._image );
		}
    }
    
  }
} );
