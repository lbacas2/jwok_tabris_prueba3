
jsw.qx.Class.define( "jsw.widgets.InputCombo", {

  extend : jsw.widgets.base.Parent,
  
  include: jsw.widgets.mixin.InputControl,

  construct : function( styles ) {
    this.base( arguments );

    this._multipleSelection = false;
    this._searchEnabled = false;
  },

  members : {
  	isMultipleSelection : function() {
  		return this._multipleSelection;
  	},

  	_setMultipleSelection : function(multipleSelection) {
  		if(!this._equal(this._multipleSelection, multipleSelection)){
  			var oldValue = this._multipleSelection;
  			this._multipleSelection = multipleSelection;
  			this._dispatchAsyncChangePropertyEvent( "multipleSelection", oldValue, this._multipleSelection);
  		}
  	},

  	isSearchEnabled : function() {
  		return this._searchEnabled;
  	},

  	_setSearchEnabled : function(searchEnabled) {
  		if(!this._equal(this._searchEnabled, searchEnabled)){
  			var oldValue = this._searchEnabled;
  			this._searchEnabled = searchEnabled;
  			this._dispatchAsyncChangePropertyEvent( "searchEnabled", oldValue, this._multipleSelection);
  		}
  	},

	getComboItemById : function(id){
		if(this.getChildren === undefined || this.getChildren() === null){
			return null;
		}

		for(var i=0 ; i<this.getChildren().length ; i++){
			var result = this.getChildren()[i].getComboItemById(id);
			if(result != null){
				return result;
			}
		}
		return null;
	}
  }
} );
