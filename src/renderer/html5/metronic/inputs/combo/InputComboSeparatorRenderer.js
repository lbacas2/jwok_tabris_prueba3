jsw.qx.Class.define( "renderer.html5.metronic.InputComboSeparatorRenderer", {

	extend : renderer.html5.base.InputComboSeparatorRenderer,

	members : {
		render : function() {
			var separator     = this.getJSWWidget();
				comboRenderer = this.getParent(),
				combo         = this.getParent().getJSWWidget();
			
			if (separator && combo && comboRenderer ) {
				var role    = separator.getRenderRole() || '',
					comboEl = comboRenderer.getEl();
				
				if ( comboEl !== null ) {
					this.setEl( $(document.createElement('option')).attr( {'data-divider': true} ).appendTo( comboEl ) );
					this.base( arguments );
					
					this._renderIsDone();
				} else {
					console.error('Parent combo DOM element is not defined!');
				}
			}
		},
		
		onCreate : function() {
			this.base(arguments);
		},
		
		onDispose : function(evt) {
			if ( this.getEl() !== null ) {
				try {
					this.getEl().remove();
				} catch( ex ) {
					console.error (ex.stack);
				}
				this.setEl( null );
			}
			this.base(arguments, evt );
		},
		
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.inputcombo.InputComboSeparator", {
	create : function() {
		return new renderer.html5.metronic.InputComboSeparatorRenderer();
	}
});