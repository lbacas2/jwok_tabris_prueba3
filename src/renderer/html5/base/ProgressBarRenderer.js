jsw.qx.Class.define( "renderer.html5.base.ProgressBarRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	members : {
		onValuePropertyChangeEvent : function( evt ) {
			return;
		},

		_onPropertyChangeEvent : function( evt ) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'value':
				case 'minValue':
				case 'maxValue':
					this._updateValuesRender();
					break;
				default:
			}
			return;
		},
		
		_updateValuesRender : function() {
			// NOTE: Redefined in specific renderer: metronic, ...
		}

	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ProgressBar", {
	create : function() {
		return new renderer.html5.base.ProgressBarRenderer();
	}
});

