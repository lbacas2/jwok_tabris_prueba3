jsw.qx.Class.define( "jsw.widgets.ChartPie", {

	extend : jsw.widgets.base.Parent,
	  
	include: jsw.widgets.mixin.AbstractChart,
	
	construct : function() {
		this.base( arguments );
		
		this._serie     = '';
		this._serieName = '';
		return;
	},
	
  members: {
	getSerie : function() {
	    return this._serie;
	},
	  
	_setSerie : function( serie ) {
		if ( !this._equal(this._serie, serie) ) {
			var oldValue = this._serie;
			this._serie = serie;
			this._dispatchAsyncChangePropertyEvent( "serie", oldValue, this._serie );
		}
	},
	
	
    getSerieName : function() {
        return this._serieName;
    },
      
    _setSerieName : function( name ) {
		if ( !this._equal(this._serieName, name) ) {
			var oldValue = this._serieName;
			this._serieName = name; 
			this._dispatchAsyncChangePropertyEvent( "serieName", oldValue, this._serieName );
		}
    }
    
  }
});