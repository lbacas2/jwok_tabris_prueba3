jsw.qx.Class.define( "jsw.widgets.ChartColumn", {

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