
jsw.qx.Class.define( "renderer.html5.base.ChartBarRenderer", {

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
			            type: 'bar',
			            animation: false
			        },
					title: {
			            text: this.getJSWWidget().getTitle() || ''
			        },
			        subtitle: {
			        	text: this.getJSWWidget().getSubtitle() || ''
			        },
			        xAxis: {
			            categories: this.getJSWWidget().getCategories() || [],
			            title: {
			                text: null
			            }
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: 'Population (millions)',
			                align: 'high'
			            },
			            labels: {
			                overflow: 'justify'
			            }
			        },
			        tooltip: {
			            valueSuffix: ' millions'
			        },
			        plotOptions: {
			            bar: {
			                dataLabels: {
			                    enabled: true
			                }
			            }
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'top',
			            x: -40,
			            y: 80,
			            floating: true,
			            borderWidth: 1,
			            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
			            shadow: true
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

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ChartBar", {
	create : function() {
		return new renderer.html5.base.ChartBarRenderer();
	}
});

