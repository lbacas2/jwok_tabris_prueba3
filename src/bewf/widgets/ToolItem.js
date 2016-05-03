
jsw.qx.Class.define( "jsw.widgets.ToolItem", {

  extend : jsw.widgets.base.JSWItem,
  
  construct : function() {
    this.base( arguments );
    this._selected = false;
    this._text     = null;
    this._image    = null;
    this._hotImage = null;
    this._disabledImage = null;
  },

  members : {
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
    
    
    getDisabledImage : function() {
    	return this._disabledImage; 
    },
    
    _setDisabledImage : function( image ) {
		if ( !this._equal(this._disabledImage, image) ) {
			var oldImage = this._disabledImage;
			this._disabledImage = image; 
			this._dispatchAsyncChangePropertyEvent( "disabledImage", oldImage, this._disabledImage );
		}
    },
    
    
    getHotImage : function() {
    	return this._hotImage; 
    },
    
    _setHotImage : function( image ) {
		if ( !this._equal(this._hotImage, image) ) {
			var oldImage = this._hotImage;
			this._hotImage = image; 
			this._dispatchAsyncChangePropertyEvent( "hotImage", oldImage, this._hotImage );
		}
    },
    
    
    isSelected : function() {
    	return this._selected; 
    },
    
    _setSelected : function( selected ) {
		if ( !this._equal(this._selected, selected) ) {
			var oldValue = this._selected;
			this._selected = selected; 
			this._dispatchAsyncChangePropertyEvent( "selected", oldValue, this._selected );
		}
    },
    

    command : function() {
    	this._notifyModify( "Command" );
    	return;
    }
  }
});
