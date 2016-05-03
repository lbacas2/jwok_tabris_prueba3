
jsw.qx.Class.define( "renderer.html5.base.ChartGaugeRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	members : {
		render : function(){
			var role = this.getJSWWidget().getRenderRole();
			this.setEl( $('[data-render-role="' + role +'"]').first() );			
			
			if (this.getEl() != null) {
				var _this = this;
				
				var serializedData = this.getJSWWidget().getSerie(),
					data = [];
				
				for (var i = 0; i < serializedData.length; i+=2) {
					data.push({
		                name: serializedData[i],
		                y:    parseFloat(serializedData[i+1])
		            });
				}
				
				this.getEl().highcharts({
			        chart: {
			            type: 'gauge',
			            plotBackgroundColor: null,
			            plotBackgroundImage: null,
			            plotBorderWidth: 0,
			            plotShadow: false
			        },
			        title: {
			        	text: this.getJSWWidget().getTitle() || ''
			        },
			        subtitle: {
			        	text: this.getJSWWidget().getSubtitle() || ''
			        },
			        pane: {
			            startAngle: -150,
			            endAngle: 150,
			            background: [{
			                backgroundColor: {
			                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			                    stops: [
			                        [0, '#FFF'],
			                        [1, '#333']
			                    ]
			                },
			                borderWidth: 0,
			                outerRadius: '109%'
			            }, {
			                backgroundColor: {
			                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			                    stops: [
			                        [0, '#333'],
			                        [1, '#FFF']
			                    ]
			                },
			                borderWidth: 1,
			                outerRadius: '107%'
			            }, {
			                // default background
			            }, {
			                backgroundColor: '#DDD',
			                borderWidth: 0,
			                outerRadius: '105%',
			                innerRadius: '103%'
			            }]
			        },

			        // the value axis
			        yAxis: {
			            min: this.getJSWWidget().getMinValue() || 0,
			            max: this.getJSWWidget().getMaxValue() || 100,

			            minorTickInterval: 'auto',
			            minorTickWidth: 1,
			            minorTickLength: 10,
			            minorTickPosition: 'inside',
			            minorTickColor: '#666',

			            tickPixelInterval: 30,
			            tickWidth: 2,
			            tickPosition: 'inside',
			            tickLength: 10,
			            tickColor: '#666',
			            labels: {
			                step: 2,
			                rotation: 'auto'
			            },
			            title: {
			                text: 'km/h **'
			            },
			            plotBands: [{
			                from: 0,
			                to: 120,
			                color: '#55BF3B' // green
			            }, {
			                from: 120,
			                to: 160,
			                color: '#DDDF0D' // yellow
			            }, {
			                from: 160,
			                to: 200,
			                color: '#DF5353' // red
			            }]
			        },
			        credits: {
			            enabled: false
			        },
			        series: [{
			            name: this.getJSWWidget().getSerieName() || '',
			            data: [ this.getJSWWidget().getValue() || 0 ],
			            tooltip: {
			                valueSuffix: ' km/h ++'
			            }
			        }]

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

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ChartGauge", {
	create : function() {
		return new renderer.html5.base.ChartGaugeRenderer();
	}
});