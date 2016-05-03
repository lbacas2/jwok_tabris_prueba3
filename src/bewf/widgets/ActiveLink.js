
jsw.qx.Class.define( "jsw.widgets.ActiveLink", {

  extend : jsw.widgets.base.JSWItem,
  
  construct : function() {
    this.base( arguments );
    this._text   = '';
    this._source = 'javascript:;';
    this._target = '_blank';
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
    
    getSource : function() {
    	return this._source; 
    },

    _setSource : function( source ) {
		if ( !this._equal(this._source, source) ) {
			var oldSource = this._source;
			this._source = source; 
			this._dispatchAsyncChangePropertyEvent( "source", oldSource, this._source );
		}
    },
    
    getTarget : function() {
    	return this._target; 
    },

    _setTarget : function( target ) {
		if ( !this._equal(this._target, target) ) {
			var oldTarget = this._target;
			this._target = target; 
			this._dispatchAsyncChangePropertyEvent( "target", oldTarget, this._target );
		}
    },

  }
});
