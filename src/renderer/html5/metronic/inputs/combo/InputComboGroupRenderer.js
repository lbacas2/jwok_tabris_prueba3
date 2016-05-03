jsw.qx.Class.define( "renderer.html5.metronic.InputComboGroupRenderer", {

	extend : renderer.html5.base.InputComboGroupRenderer,

	members : {
		render : function() {
			var group         = this.getJSWWidget();
				comboRenderer = this.getParent(),
				combo         = this.getParent().getJSWWidget();
			
			if ( group && combo && comboRenderer ) {
				var role    = group.getRenderRole() || '',
					comboEl = comboRenderer.getEl();
				
				if ( comboEl !== null ) {
					this.setEl( $(document.createElement('optgroup')).appendTo( comboEl ) );

					this.base( arguments );
					this._updateText();
					
					this._renderIsDone();
				} else {
					console.error('Parent combo DOM element is not defined!');
				}
			}
		},

		onDispose : function(evt) {
			if ( this.getEl() !== null ) {
				try {
					this.getEl().remove();
				} catch( ex ) {
					console.error( ex.stack );
				}
				this.setEl( null );
			}
			this.base(arguments, evt );
		},
		
		_updateText : function() {
			if ( this.getEl() !== null ) {
				this.getEl().attr( {'label': this.getJSWWidget().getText() || ''} );
			}
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.inputcombo.InputComboGroup", {
	create : function() {
		return new renderer.html5.metronic.InputComboGroupRenderer();
	}
});