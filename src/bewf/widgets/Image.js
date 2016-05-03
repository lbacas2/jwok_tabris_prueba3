
jsw.qx.Class.define( "jsw.widgets.Image", {

  extend : jsw.widgets.base.JSWItem,

  construct : function() {
    this.base( arguments );
    
    this._source = null;
    this._altenativeText = null;
  },

  members : {
    getSource : function( ) {
    	return this._source; 
    },

    _setSource : function( source ) {
		if ( !this._equal(this._source, source) ) {
			var oldSource = this._source;
			this._source = source; 
			this._dispatchAsyncChangePropertyEvent( "source", oldSource, this._source );
		}
    },
    
    getImage : function() {
    	return this.getSource(); 
    },
    
    
    getAlternativeText : function() {
    	return this._altenativeText; 
    },

    _setAlternativeText : function( text ) {
		if ( !this._equal(this._altenativeText, text) ) {
			var oldText = this._altenativeText;
			this._altenativeText = text; 
			this._dispatchAsyncChangePropertyEvent( "alternativeText", oldText, this._altenativeText );
		}
    }
    
  }
});
