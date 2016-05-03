
jsw.qx.Class.define( "jsw.widgets.TreeView", {

  extend : jsw.widgets.base.Parent,

  members : {
	  _multipleSelection : false,
	  _sorted            : false,
	  _editable          : false,
	  //_selected          : false,
	  //_checked           : false,
	  _expanded          : false,
	
	  isMultipleSelection : function() {
		  return this._multipleSelection;
	  },

	  _setMultipleSelection : function( multipleSelection ) {
		  if (typeof multipleSelection === 'string') {
			  multipleSelection = $.parseJSON( multipleSelection );
		  }
		  if ( !this._equal(this._multipleSelection, multipleSelection) ) {
			  var oldValue = this._multipleSelection;
			  this._multipleSelection = multipleSelection;
			  this._dispatchAsyncChangePropertyEvent( "multipleSelection", oldValue, this._multipleSelection );
		  }
	  },

  	
	  isSorted : function() {
		  return this._sorted;
	  },

	  _setSorted : function( sorted ) {
		  if (typeof sorted === 'string') {
			  sorted = $.parseJSON( sorted );
		  }
		  if ( !this._equal(this._sorted, sorted) ) {
			  var oldValue = this._sorted;
			  this._sorted = sorted;
			  this._dispatchAsyncChangePropertyEvent( "sorted", oldValue, this._sorted );
		  }
	  },
  	

	  isEditable : function() {
		  return this._editable;
	  },

	  _setEditable : function( editable ) {
		  if (typeof editable === 'string') {
			  editable = $.parseJSON( editable );
		  }
		  if ( !this._equal(this._editable, editable) ) {
			  var oldValue = this._editable;
			  this._editable = editable;
			  this._dispatchAsyncChangePropertyEvent( "editable", oldValue, this._editable );
		  }
	  },
	  
	  
	  // TODO: Similar en Menu, Tabs, TreeView y SideBar
	  getTreeViewItemById : function( id ) {
		  if (this.getChildren !== undefined && this.getChildren() !== null) {
			  for (var i=0; i<this.getChildren().length; i++) {
				  var result = this.getChildren()[i].getTreeViewItemById( id );
				
				  if (result != null) {
					  return result;
				  }
			  }
		  }
		  return null;
	  }
  }
});
