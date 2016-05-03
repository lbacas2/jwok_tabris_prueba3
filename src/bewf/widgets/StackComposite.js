jsw.qx.Class.define( "jsw.widgets.StackComposite", {
	
	extend : jsw.widgets.Composite,

	construct : function( styles ) {
		this.base( arguments );
		
		this._topControl = null;
	},
	
	members : {
		getTopControl : function() {
			return this._topControl;
		},
	
		_setTopControl : function( control ) {
			if ( !this._equal(this._topControl, control) ) {
				var oldValue = this._topControl;
				this._topControl = control; 
				this._dispatchAsyncChangePropertyEvent( "topControl", oldValue, this._topControl );
			}
		}
		
	}
});