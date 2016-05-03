jsw.qx.Class.define( "jsw.widgets.ChartLine", {

	extend : jsw.widgets.base.Parent,
	  
	include: [
	          jsw.widgets.mixin.AbstractChart,
	          jsw.widgets.mixin.AbstractChartXY
	],
	
	construct : function() {
		this.base( arguments );
		return;
	}
});