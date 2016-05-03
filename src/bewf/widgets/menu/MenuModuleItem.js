
jsw.qx.Class.define( "jsw.widgets.menu.MenuModuleItem", {

  extend : jsw.widgets.base.JSWItem,

  include: jsw.widgets.mixin.MenuItem,

  construct : function() {
    this.base( arguments );
    
    this._selectable = false;
    this._selected   = false;
  },

  members : {
    isSelectable : function() {
      return this._selectable;
    },

    _setSelectable :  function( value ) {
    	if ( !this._equal(this._selectable, value) ) {
    		var oldValue = this._selectable;
    		this._selectable = value;
    		this._dispatchAsyncChangePropertyEvent( "selectable", oldValue, this._selectable );
    	}
    	return;
    },
    
	
    isSelected : function() {
      return this._selected;
    },
    
    _setSelected : function( value ) {
    	if ( !this._equal(this._selected, value) ) {
    		var oldValue = this._selected;
    		this._selected = value;
    		this._dispatchAsyncChangePropertyEvent( "selected", oldValue, this._selected );
    	}
    	return;
    },
    
    setSelected : function( value ) {
		if ( !this._equal(this._selected, value) ) {
			var oldValue = this._selected;
			this._selected = value; 
			this._dispatchAsyncChangePropertyEvent( "selected", oldValue, this._selected );
			this._handlePropertyModification( "Selected", "selected", this.isSelected() );
		}
    },

    
    command : function() {
    	this._notifyModify( "Command" );
    	return;
    }
    
  }
});
