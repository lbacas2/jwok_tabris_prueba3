jsw.qx.Mixin.define("jsw.widgets.mixin.AbstractChartXY", {

	construct : function() {
		this._categories  = [];
		this._seriesTitle = [];
		this._series      = [];
	},

	statics : {
		widgetProperties : [
		    "categories",
			"seriesTitle",
			"series"
		],

		widgetMethods : {
	  		"categories" : function( widget, value ) {
			    widget._setCategories( value );
			},
	  		"seriesTitle" : function( widget, value ) {
			    widget._setSeriesTitle( value );
			},
			"series" : function( widget, value ) {
			    widget._setSeries( value );
			}
		}
	},

  members: {
	getCategories : function() {
		return this._categories;
	},

	_setCategories : function(categories) {
		if(!this._equal(this._categories, categories)){
			var oldValue = this._categories;
			this._categories = categories; 
			this._dispatchAsyncChangePropertyEvent( "categories", oldValue, this._categories );
		}
    },
    

	getSeriesTitle : function() {
		return this._seriesTitle;
    },

    _setSeriesTitle : function(titles) {
		if(!this._equal(this._seriesTitle, titles)){
			var oldValue = this._seriesTitle;
			this._seriesTitle = titles; 
			this._dispatchAsyncChangePropertyEvent( "seriesTitle", oldValue, this._seriesTitle );
		}
    },
    
    
    getSeries : function() {
		return this._series;
    },

    _setSeries : function(series) {
    	series = JSON.parse(series);
    	
		if(!this._equal(this._series, series)){
			var oldValue = this._series;
			this._series = series; 
			this._dispatchAsyncChangePropertyEvent( "series", oldValue, this._series );
		}
    }
  }
});
