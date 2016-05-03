jsw.qx.Class.define( "jsw.widgets.Tabs", {

  extend : jsw.widgets.base.Parent,

  construct : function( styles ) {
    this.base( arguments );

    this._multipleSelection = false;
  },

  members : {
  	isMultipleSelection : function() {
  		return this._multipleSelection;
  	},

  	_setMultipleSelection : function(multipleSelection) {
  		if(!this._equal(this._multipleSelection, multipleSelection)){
  			var oldValue = this._multipleSelection;

  			this._multipleSelection = multipleSelection;
  			this._dispatchAsyncChangePropertyEvent( "multipleSelection", oldValue, this._multipleSelection );
  		}
  	},

    // TODO: Similar en Menu, Tabs, TreeView y SideBar
	getTabItemById : function(id) {
		if(this.getChildren === undefined || this.getChildren() === null){
			return null;
		}
		
		for (var i=0 ; i<this.getChildren().length ; i++) {
			if (this.getChildren()[i].getInternalId() == id) {
				return this.getChildren()[i];
			}
		}
		return null;
	}
  	
  }
});
