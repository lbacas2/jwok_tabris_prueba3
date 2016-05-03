jsw.qx.Class.define( "jsw.widgets.ChartGauge", {

	extend : jsw.widgets.base.Parent,
	  
	include: jsw.widgets.mixin.AbstractChart,
	
	construct : function() {
		this.base( arguments );
		
		this._serie = [];
		this._serieName = "";
		this._minValue = 0;
		this._maxValue = 100;
		this._value = 0;
		return;
	},
	
  members: {
	getSerie : function() {
	    return this._serie;
	},
	  
	_setSerie : function(serie) {
		if(!this._equal(this._serie, serie)){
			var oldValue = this._serie;
			this._serie = serie;
			this._dispatchAsyncChangePropertyEvent( "serie", oldValue, this._serie );
		}
	},
		
	
    getSerieName : function() {
        return this._serieName;
    },
      
    _setSerieName : function(name) {
		if(!this._equal(this._serieName, name)){
			var oldValue = this._serieName;
			this._serieName = name; 
			this._dispatchAsyncChangePropertyEvent( "serieName", oldValue, this._serieName );
		}
    },
    	
	
	getMinValue : function() {
	    return this._minValue;
	},
	  
	_setMinValue : function(value) {
		if(!this._equal(this._minValue, value)){
			var oldValue = this._minValue;
			this._minValue = value;
			this._dispatchAsyncChangePropertyEvent( "minValue", oldValue, this._minValue );
		}
	},
	
	
	getMaxValue : function() {
	    return this._maxValue;
	},
	  
	_setMaxValue : function(value) {
		if(!this._equal(this._maxValue, value)){
			var oldValue = this._maxValue;
			this._maxValue = value;
			this._dispatchAsyncChangePropertyEvent( "maxValue", oldValue, this._maxValue );
		}
	},
	
	
	getValue : function() {
	    return this._value;
	},
	  
	_setValue : function(value) {
		if(!this._equal(this._value, value)){
			var oldValue = this._value;
			this._value = value;
			this._dispatchAsyncChangePropertyEvent( "value", oldValue, this._value );
		}
	}
	
  }
});