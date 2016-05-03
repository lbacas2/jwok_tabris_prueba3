jsw.qx.Class.define( "renderer.html5.metronic.InputComboOptionRenderer", {

	extend : renderer.html5.base.InputComboOptionRenderer,

	members : {
		render : function() {
			var option         = this.getJSWWidget();
				parentRenderer = this.getParent(),
				parent         = this.getParent().getJSWWidget();
			
			if ( option && parent && parentRenderer ) {
				var role     = option.getRenderRole() || '',
					parentEl = parentRenderer.getEl();
				
				if ( parentEl !== null ) {
					// Option 
					var attr = { 'value' : option.getInternalId() };
					this.setEl( $(document.createElement('option')).attr( attr ).appendTo( parentEl ) );
					
					this.base( arguments );
					
					this._updateText();
					this._updateImage();
					this._updateAdditionalText();
					this._updateSelected();
					this._updateDisabled();
					
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
		
		_updateText : function() {
			if ( this.getEl() !== null ) {
				this.getEl().html( this.getJSWWidget().getText() || '' );
			}
		},
		
		_updateImage : function() {
			// TODO : Revisar
			if ( this.getEl() !== null ) {
				this.getEl().attr( 'data-icon', this.getJSWWidget().getImage() || '' );
			}
		},
		
		_updateAdditionalText : function() {
			// TODO : Revisar
			if ( this.getEl() !== null ) {
				this.getEl().attr( 'data-subtext', this.getJSWWidget().getAdditionalText() || '' );
			}
		},
		
		_updateSelected : function() {
			if ( this.getEl() !== null ) {
				var isSelected = this.getJSWWidget().isSelected();
				if (typeof isSelected === "string") { isSelected = $.parseJSON(isSelected); }
				
				this.getEl().prop('selected', ( isSelected ) ? 'selected' : false );
			}
		},
		
		_updateDisabled : function() {
			if ( this.getEl() !== null ) {
				var isDisabled = this.getJSWWidget().isDisabled();
				if (typeof isDisabled === "string") { isDisabled = $.parseJSON(isDisabled); }
				
				this.getEl().prop('disabled', ( isDisabled ) );
			}
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.inputcombo.InputComboOption", {
	create : function() {
		return new renderer.html5.metronic.InputComboOptionRenderer();
	}
});