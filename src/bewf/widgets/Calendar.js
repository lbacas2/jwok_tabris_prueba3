jsw.qx.Class.define( "jsw.widgets.Calendar", {
  extend : jsw.widgets.base.Parent,

  construct : function( styles ) {
    this.base( arguments );

	this._selectedDate = "";
	this._editable     = false;
	return;
  },

  members : {
    destroy : function() {
      this.base( arguments );
    },

    /** To be called after jsw_XXX states are set */
    initialize : function() {
    },

    getSelectedDate : function() {
	    return this._selectedDate;
	},

	_setSelectedDate : function(date) {
		if(!this._equal(this._selectedDate, date)){
			var oldValue = this._selectedDate;
			this._selectedDate = date;
			this._dispatchAsyncChangePropertyEvent( "selectedDate", oldValue, this._selectedDate );
		}
	},

	setSelectedDate : function(date) {
		if(!this._equal(this._selectedDate, date)){
			this._selectedDate = date;
		}
	},


  	isEditable : function() {
  		return this._editable;
  	},

  	_setEditable : function(editable) {
  		if(!this._equal(this._editable, editable)){
  			var oldValue = this._editable;

  			this._editable = editable;
  			this._dispatchAsyncChangePropertyEvent( "editable", oldValue, this._editable );
  		}
  	},


  	getEvents: function () {
    	return this.getChildren();
    }

  }
} );
