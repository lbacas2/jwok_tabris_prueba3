/*global jsw:false */
jsw.qx.Class.define( "jsw.widgets.calendar.CalendarEvent", {
	// TODO: Mirar si seria de JSWItem
  extend : jsw.widgets.base.Parent,

  construct : function( styles ) {
    this.base( arguments );

	this._title = "";
	this._start = "";
	this._end   = "";
	this._url   = "";

	return;
  },

  members : {
    destroy : function() {
      this.base( arguments );
    },

    /** To be called after jsw_XXX states are set */
    initialize : function() {
    },

    getTitle : function() {
	    return this._title;
	},

	_setTitle : function(title) {
		if(!this._equal(this._title, title)){
			var oldValue = this._title;

			this._title = title;
			this._dispatchAsyncChangePropertyEvent( "title", oldValue, this._title );
		}
	},


	getStart : function() {
	    return this._start;
	},

	_setStart : function(start) {
		if(!this._equal(this._start, start)){
			var oldValue = this._start;

			this._start = start;
			this._dispatchAsyncChangePropertyEvent( "start", oldValue, this._start );
		}
	},


	getEnd : function() {
	    return this._end;
	},

	_setEnd : function(end) {
		if(!this._equal(this._end, end)){
			var oldValue = this._end;

			this._end = end;
			this._dispatchAsyncChangePropertyEvent( "end", oldValue, this._end );
		}
	},


	getUrl : function() {
	    return this._url;
	},

	_setUrl : function(url) {
		if(!this._equal(this._url, url)){
			var oldValue = this._url;

			this._url = url;
			this._dispatchAsyncChangePropertyEvent( "url", oldValue, this._url );
		}
	}
  }
});
