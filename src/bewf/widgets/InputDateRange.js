
jsw.qx.Class.define( "jsw.widgets.InputDateRange", {

	extend : jsw.widgets.base.JSWItem,
	
	include: jsw.widgets.mixin.InputControl,

	members : {
		_minDate : '',
		_maxDate : '',
		_showMonthYearSelector : false,
		_showPredefinedRanges  : true,
		_isLinkedCalendars     : true,
		
		
		getStartDate : function() {
			if(this.getValue() === '' || this.getValue().length < 2 ) {
				return '';
			}
			return this._value[0]; 
		},
		
		getEndDate : function() {
			if(this.getValue() === '' || this.getValue().length < 2 ) {
				return '';
			}
			return this._value[1];
		},
		
		_setMinDate : function( date ) {
			if(!this._equal(this._minDate, date)) {
	  			var oldValue = this._minDate;
		  		this._minDate = date;
		  		this._dispatchAsyncChangePropertyEvent("minDate", oldValue, this._minDate);
		  	}
		},
		
		getMinDate : function() {
			return this._minDate;
		},
		
		
		_setMaxDate : function( date ) {
			if(!this._equal(this._maxDate, date)) {
	  			var oldValue = this._maxDate;
		  		this._maxDate = date;
		  		this._dispatchAsyncChangePropertyEvent("maxDate", oldValue, this._maxDate);
		  	}
		},
		
		getMaxDate : function() {
			return this._maxDate;
		},
		
		
		
		_setShowMonthYearSelector : function( visible ) {
			if(!this._equal(this._showMonthYearSelector, visible)) {
	  			var oldValue = this._showMonthYearSelector;
		  		this._showMonthYearSelector = visible;
		  		this._dispatchAsyncChangePropertyEvent("showMonthYearSelector", oldValue, this._showMonthYearSelector);
		  	}
		},
		
		getShowMonthYearSelector : function() {
			return this._showMonthYearSelector;
		},
		
		
		_setShowPredefinedRanges : function( visible ) {
			if(!this._equal(this._showPredefinedRanges, visible)) {
	  			var oldValue = this._showPredefinedRanges;
		  		this._showPredefinedRanges = visible;
		  		this._dispatchAsyncChangePropertyEvent("showPredefinedRanges", oldValue, this._showPredefinedRanges);
		  	}
		},
		
		getShowPredefinedRanges : function() {
			return this._showPredefinedRanges;
		},
		
		
		_setLinkedCalendars : function( linked ) {
			if(!this._equal(this._isLinkedCalendars, linked)) {
	  			var oldValue = this._isLinkedCalendars;
		  		this._isLinkedCalendars = linked;
		  		this._dispatchAsyncChangePropertyEvent("isLinkedCalendars", oldValue, this._isLinkedCalendars);
		  	}
		},
		
		isLinkedCalendars : function() {
			return this._isLinkedCalendars;
		}
	}
} );


