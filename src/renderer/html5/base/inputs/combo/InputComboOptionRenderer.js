
jsw.qx.Class.define( "renderer.html5.base.InputComboOptionRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	members : {
		select : function() {
			return;
		},

		unselect : function() {
			return;
		},
		
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			
			switch (evt.property) {
				case 'text':
					this._updateText();
					break;
				case 'image':
					this._updateImage();
					break;
				case 'additionalText':
					this._updateAdditionalText();
					break;
				case 'selected':
					this._updateSelected();
					break;
				case 'disabled':
					this._updateDisabled();
					break;
				default:
			}
			return;
		},
		
		_updateText : function() {
		},
		
		_updateImage : function() {
		},
		
		_updateAdditionalText : function() {
		},
		
		_updateSelected : function() {
		},
		
		_updateDisabled : function() {
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.inputcombo.InputComboOption", {
	create : function() {
		return new renderer.html5.base.InputComboOptionRenderer();
	}
});

