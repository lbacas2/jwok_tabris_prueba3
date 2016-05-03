
jsw.qx.Class.define( "jsw.widgets.SideBar", {

  extend : jsw.widgets.base.Parent,

  construct : function( styles ) {
    this.base( arguments );
    this._selectedItemId = null;
  },

  members : {
    getSelectedItemId : function(){
    	return this._selectedItemId;
    },

    _setSelectedItem : function( selectedItemId ) {
    	var oldValue = this.getSelectedItemId();
    	
    	if ( !this._equal(oldValue, selectedItemId) ) {
    		this._selectedItemId = selectedItemId;
    		this._dispatchAsyncChangePropertyEvent( 'selectedItem', oldValue, this._selectedItemId );
    	}
    },

    
    // TODO: Similar en Menu, TreeView y SideBar
	getSideBarItemById : function(id) {
		if (this.getChildren !== undefined && this.getChildren() !== null) {
			
			for (var i=0 ; i<this.getChildren().length ; i++) {
				var result = this.getChildren()[i].getSideBarItemById(id);
				
				if (result != null) {
					return result;
				}
			}
		}
		return null;
	}

  }
});
