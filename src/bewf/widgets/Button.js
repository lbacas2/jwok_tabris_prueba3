
jsw.qx.Class.define( "jsw.widgets.Button", {

  extend : jsw.widgets.base.JSWItem,
  
  construct : function() {
    this.base( arguments );
    this._text = null;
    this._image = null;
  },

  members : {
    getImage : function() {
    	return this._image; 
    },
    
    _setImage : function( image ) {
		if ( !this._equal(this._image, image) ) {
			var oldImage = this._image;
			this._image = image; 
			this._dispatchAsyncChangePropertyEvent( "image", oldImage, this._image );
		}
    },
    
    getText : function() {
    	return this._text; 
    },

    _setText : function( text ) {
		if ( !this._equal(this._text, text) ) {
			var oldText = this._text;
			this._text = text; 
			this._dispatchAsyncChangePropertyEvent( "text", oldText, this._text );
		}
    },

    command : function() {
    	this._notifyModify( "Command" );
    	return;
    }
  }
});
