
jsw.qx.Class.define( "renderer.html5.base.ChartLineRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	members : {
		render : function(){
			var role = this.getJSWWidget().getRenderRole();
			this.setEl( $('[data-render-role="' + role +'"]').first() );			
			
			if (this.getEl() != null) {
				var _this = this;
				
				var serializedData = this.getJSWWidget().getSeries() || [],
					seriesTitle    = this.getJSWWidget().getSeriesTitle() || [],
					series = [],
					data, i, j;
				
				for (i = 0; i < serializedData.length; i++) {
					data = [];
					
					for (j = 0; j < serializedData[i].length; j++) {
						data.push( parseFloat(serializedData[i][j]) );
					}
					
					series.push({
		                name: (i < seriesTitle.length)? seriesTitle[i]: '',
		                data: data
		            });
				}
				
				this.getEl().highcharts({
					chart: {
			            type: 'line'
			        },
					title: {
			            text: this.getJSWWidget().getTitle() || ''
			        },
					xAxis: {
			            categories: this.getJSWWidget().getCategories() || []
			        },
			        zoneAxis: 'x',
			        zones: [{
			            value: 4
			        }, {
			            dashStyle: 'dot'
			        }],
			        plotOptions: {
			            series: {
			                animation: true
			            }
			        },
			        credits: {
			            enabled: false
			        },
			        series: series
			    });
			}

			this._renderIsDone();
			return;
		},
		
		onDispose : function( evt ) {
			this.getEl().highcharts().destroy();
			return;
		},

	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ChartLine", {
	create : function() {
		return new renderer.html5.base.ChartLineRenderer();
	}
});

