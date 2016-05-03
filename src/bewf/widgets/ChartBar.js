jsw.qx.Class.define( "jsw.widgets.ChartBar", {

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