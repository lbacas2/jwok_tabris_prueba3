jsw.qx.Mixin.define("jsw.widgets.mixin.AbstractChart", {

	construct : function() {
		this._title    = '';
		this._subtitle = '';
	},

	statics : {
		widgetProperties : [
		    "title",
			"subtitle"
		],

		widgetMethods : {
	  		"title" : function( widget, value ) {
			    widget._setTitle( value );
			},
	  		"subtitle" : function( widget, value ) {
			    widget._setSubtitle( value );
			}
		}
	},

  members: {
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
    

	getSubtitle : function() {
		return this._subtitle;
    },

    _setSubtitle : function(subtitle) {
		if(!this._equal(this._subtitle, subtitle)){
			var oldValue = this._subtitle;
			this._subtitle = subtitle; 
			this._dispatchAsyncChangePropertyEvent( "subtitle", oldValue, this._subtitle );
		}
    },
    
  }
});
