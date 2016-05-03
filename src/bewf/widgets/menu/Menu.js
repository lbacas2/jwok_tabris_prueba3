
jsw.qx.Class.define( "jsw.widgets.Menu", {

  extend : jsw.widgets.base.Parent,

  construct : function( styles ) {
    this.base( arguments );
    
    this._selectedItemId = null;
  },

  members : {
    // TODO: Similar en Menu, TreeView y SideBar
  	getMenuItemById : function(id) {
  		if (this.getChildren !== undefined && this.getChildren() !== null) {
  			
  			for (var i=0 ; i<this.getChildren().length ; i++) {
  				var result = this.getChildren()[i].getMenuItemById(id);
  				
  				if (result != null) {
  					return result;
  				}
  			}
  		}
  		return null;
  	}

  }
});
