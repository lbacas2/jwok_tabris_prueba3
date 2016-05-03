
jsw.qx.Class.define( "jsw.widgets.BrowserViewer", {

  extend : jsw.widgets.base.JSWItem,

  construct : function() {
    this.base( arguments );
    
    this._source = null;
  },

  members : {
    getSource : function( ) {
    	return this._source; 
    },

    _setSource : function( source ) {
		if(!this._equal(this._source, source)){
			var oldSource = this._source;
			this._source = source; 
			this._dispatchAsyncChangePropertyEvent( 'source', oldSource, this._source );
		}
    }
    
  }
});
