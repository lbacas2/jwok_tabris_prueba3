jsw.qx.Class.define( "renderer.html5.base.ChartPieRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	members : {
		__HighCharts : null,
		__formattedSerie : [],
		
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );				
				this.base( arguments );

				// Convert serie data to HighChart format 
				try{
					this.__formattedSerie = this.__formatSerie( this.getJSWWidget().getSerie() );
				} catch(err){
					this.__formattedSerie = new Array(0);
				}

				this.__highCharts = this.getEl().highcharts({
			        chart: {
			            plotBackgroundColor: null,
			            plotBorderWidth: null,
			            plotShadow: false,
			            type: 'pie'
			        },
			        title: {
			            text: this.getJSWWidget().getTitle() || ''
			        },
			        subtitle: {
			        	text: this.getJSWWidget().getSubtitle() || ''
			        },
			        tooltip: {
			            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			        },
			        plotOptions: {
			            pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
			                    style: {
			                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
			                    }
			                }
			            }
			        },
			        credits: {
			            enabled: false
			        },
			        series: [{
			            name: this.getJSWWidget().getSerieName() || '',
			            data: this.__formattedSerie
			        }]
			    });
				// Guardamos un enlace al objeto HighCharts
				this.__HighCharts = this.getEl().highcharts();
			}

			this._renderIsDone();
		},
		
		onDispose : function( evt ) {
			if ( this.__HighCharts !== null ) {
				this.__HighCharts.destroy();
			} else if ( this.getEl() !== null ) {
				this.getEl().highcharts().destroy();
			}
			this.__HighCharts = null;
		},
		
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			
			switch (evt.property) {
				case 'title':
				case 'subtitle':
				case 'serie':
				case 'serieName':
					this._updateChart();
					break;
				default:
			}
		},
		
		_updateChart : function() {
			return;
		},
		
		__formatSerie : function( serie ) {
			if ( serie == null ) {
				return [];
			}
			var obj = JSON.parse( serie );

			//this.options.series[0].name = obj.cols[1].label;

			// Se computan los valores del eje x
			var arrayLength = obj.rows.length;
			var xValues = new Array(arrayLength);
			for (var i = 0 ; i < arrayLength ; i++) {
				xValues[i] = {sliced: false, selected: false};
				xValues[i].name = obj.rows[i].c[0].v;
				xValues[i].y = obj.rows[i].c[1].v;
			}
			return xValues;
		}

	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ChartPie", {
	create : function() {
		return new renderer.html5.base.ChartPieRenderer();
	}
});

