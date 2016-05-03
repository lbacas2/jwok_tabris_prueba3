
jsw.qx.Class.define( "jsw.widgets.Table", {

	extend : jsw.widgets.base.Parent,

  construct : function( styles ) {
    this.base( arguments );
    
    this._columns = null;
    
    this._multipleSelection = false;
    this._selectionColumnVisible = false;
    this._deselectRowAllowed = false;
    this._fixedColumns = 0;
    
    this._sortColumnInternalId = 0;
    this._sortDirection = "ASC";
  },

  members : {
    getColumns: function() {
    	if (this._columns === null) {
    		this._columns = [];
	    	var children = this.getChildren();
	    	
	    	for (i = 0; i < children.length; i++) {
	    		if (children[i].classname === 'jsw.widgets.table.TableColumn') {
	    			this._columns.push( children[i] );
	    		}
	    	}
    	}
    	return this._columns;
    },
    
    getColumn: function( index ) {
    	var columns = (this._columns !== null) ? this._columns : this.getColumns();
    	if ( !isNaN( index ) && index >= 0 && index < columns.length) {
    		return columns[ index ].getInternalId();
    	}
    	return null;
    },
    
    
    getRows: function() {
		var rows = [];
    	var children = this.getChildren();
    	
    	for (i = 0; i < children.length; i++) {
    		if (children[i].classname === 'jsw.widgets.table.TableRow') {
    			rows.push( children[i] );
    		}
    	}
    	return rows;
    },
    
    getRow: function( index ) {
    	var rows = this.getRows();
    	if ( !isNaN( id ) && index >= 0 && index < rows.length) {
    		return rows[ index ].getInternalId();
    	}
    	return null;
    },
    
    getRowByInternalId: function( id ) {
    	if ( isNaN( id ) ) {
    		return null;
    	}
    	
		var row = null;
    	var children = this.getChildren();
    	
    	for (i = 0; i < children.length && row === null; i++) {
    		if (children[i].classname === 'jsw.widgets.table.TableRow' && children[i].getInternalId() === id) {
    			row = children[i];
    		}
    	}
    	return row;
    },
    
    isMultipleSelection : function() {
  		return this._multipleSelection;
  	},

  	_setMultipleSelection : function( multipleSelection ) {
  		if ( !this._equal(this._multipleSelection, multipleSelection) ) {
  			var oldValue = this._multipleSelection;

  			this._multipleSelection = multipleSelection;
  			this._dispatchAsyncChangePropertyEvent( "multipleSelection", oldValue, this._multipleSelection );
  		}
  	},
  	
  	
  	isDeselectRowAllowed : function() {
  		return this._deselectRowAllowed;
  	},

  	_setDeselectRowAllowed : function( deselectRowAllowed ) {
  		if ( !this._equal(this._deselectRowAllowed, deselectRowAllowed) ) {
  			var oldValue = this._deselectRowAllowed;

  			this._deselectRowAllowed = deselectRowAllowed;
  			this._dispatchAsyncChangePropertyEvent( "deselectRowAllowed", oldValue, this._deselectRowAllowed );
  		}
  	},
  	
  	
  	getFixedColumns : function() {
  		return this._fixedColumns;
  	},

  	_setFixedColumns : function( fixedColumns ) {
  		fixedColumns = parseInt(fixedColumns);
  		if ( !isNaN( fixedColumns ) && fixedColumns >= 0 && !this._equal(this._fixedColumns, fixedColumns) ) {
  			var oldValue = this._fixedColumns;

  			this._fixedColumns = fixedColumns;
  			this._dispatchAsyncChangePropertyEvent( "fixedColumns", oldValue, this._fixedColumns );
  		}
  	},
  	
  	
  	isSelectionColumnVisible : function() {
  		return this._selectionColumnVisible;
  	},

  	_setSelectionColumnVisible : function( visible ) {
  		if ( !this._equal(this._selectionColumnVisible, visible) ) {
  			var oldValue = this._selectionColumnVisible;

  			this._selectionColumnVisible = visible;
  			this._dispatchAsyncChangePropertyEvent( "selectionColumnVisible", oldValue, this._selectionColumnVisible );
  		}
  	},
  	
  	
  	getSortColumn : function() {
  		return this._sortColumnInternalId;
  	},

  	_setSortColumn : function( sortColumn ) {
  		if ( !this._equal(this._sortColumnInternalId, sortColumn) ) {
  			var oldValue = this._sortColumnInternalId;

  			this._sortColumnInternalId = sortColumn;
  			this._dispatchAsyncChangePropertyEvent( "sortColumn", oldValue, this._sortColumnInternalId );
  		}
  	},
  	
  	setSortColumn : function( sortColumn ) {
  		if ( !this._equal(this._sortColumnInternalId, sortColumn) ) {
  			var oldValue = this._sortColumnInternalId;

  			this._sortColumnInternalId = sortColumn;
  			this._dispatchAsyncChangePropertyEvent( "sortColumn", oldValue, this._sortColumnInternalId );
  			this._handlePropertyModification( "SortingChanged", "sortColumn", this._sortColumnInternalId );
  		}
  	},
  	
  	
  	getSortDirection : function() {
  		return this._sortDirection;
  	},

  	_setSortDirection : function( sortDirection ) {
  		if ( !this._equal(this._sortDirection, sortDirection) ) {
  			var oldValue = this._sortDirection;

  			this._sortDirection = sortDirection;
  			this._dispatchAsyncChangePropertyEvent( "sortDirection", oldValue, this._sortDirection );
  		}
  	},
  	
  	setSortDirection : function( sortDirection ) {
  		if ( !this._equal(this._sortDirection, sortDirection) ) {
  			var oldValue = this._sortDirection;

  			this._sortDirection = sortDirection;
  			this._dispatchAsyncChangePropertyEvent( "sortDirection", oldValue, this._sortDirection );
  			this._handlePropertyModification( "SortingChanged", "sortDirection", this._sortDirection );
  		}
  	}
  }
});
