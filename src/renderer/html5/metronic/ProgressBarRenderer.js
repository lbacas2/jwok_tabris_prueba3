jsw.qx.Class.define( "renderer.html5.metronic.ProgressBarRenderer", {

	extend : renderer.html5.base.ProgressBarRenderer,

	construct : function() {
		this.base( arguments );
		this._progressBarEl = null;
	},

	members : {
		getElementBuilderInfo : function() {
			return {
				type  : 'div',
				class : 'hidden',
				attrs : {}
			};
		},
		
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );

				// Add class to specificate div element
				this.getEl().addClass('progress');
				
				// Create a child div element to show progress bar progression
				this._progressBarEl = $(document.createElement('div'))
					.attr({
						'class'         : 'progress-bar',
						'role'          : 'progressbar', 
						'aria-valuemin' : this.getJSWWidget().getMinValue(),
						'aria-valuemax' : this.getJSWWidget().getMaxValue()
					})
					.addClass( this.getEl().attr('data-class') )
					.appendTo( this.getEl() );
				
				this._updateValuesRender();
				
				this.base( arguments );
				this._renderIsDone();
			}
		},
		
		_updateValuesRender : function() {
			if ( this.getEl() !== null && this._progressBarEl !== null ) {
				var value    = this.getJSWWidget().getValue() || 0,
					minValue = this.getJSWWidget().getMinValue() || 0,
					maxValue = this.getJSWWidget().getMaxValue() || 100;
				var percent = (value * 100) / ( maxValue - minValue );
				
				try {
					// Update progressBar area
					this._progressBarEl.css( 'width', value + '%' )
									   .attr({'aria-valuenow' : value, 'aria-valuemin' : minValue, 'aria-valuemax' : maxValue});
					
					if (this.getEl().attr('data-show-label') ) {
						this._progressBarEl.css('min-width', '2em').text( percent + '%');
						
					} else {
						// Get or create a child element to containt legible information
						var spanProgressBar;
						if ( this._progressBarEl.find('span').length > 0 ) { 
							spanProgressBar = this._progressBarEl.find('span');
						} else { 
							spanProgressBar = $(document.createElement('span')).appendTo( this._progressBarEl );
						}
						spanProgressBar.attr('class', 'sr-only').text( percent + '% Complete');
					}
				} catch (err) {
					console.error ( err );
				}
			}
		}
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ProgressBar",  {
	create : function() {
		return new renderer.html5.metronic.ProgressBarRenderer();
	}
});