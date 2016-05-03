
jsw.qx.Class.define( "renderer.html5.base.ChartColumnRenderer", {

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
			            type: 'column'
			        },
					title: {
			            text: this.getJSWWidget().getTitle() || ''
			        },
					xAxis: {
			            categories: this.getJSWWidget().getCategories() || [],
			            crosshair: true
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: 'Rainfall (mm)'
			            }
			        },
			        tooltip: {
			            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
			            footerFormat: '</table>',
			            shared: true,
			            useHTML: true
			        },
			        plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0
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

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ChartColumn", {
	create : function() {
		return new renderer.html5.base.ChartColumnRenderer();
	}
});

