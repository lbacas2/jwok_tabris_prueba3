
jsw.qx.Class.define( "jsw.widgets.Link", {

  extend : jsw.widgets.base.JSWItem,
  
  construct : function() {
    this.base( arguments );
    this._text = null;
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

    command : function() {
    	this._notifyModify( "Command" );
    	return;
    }
  }
});
