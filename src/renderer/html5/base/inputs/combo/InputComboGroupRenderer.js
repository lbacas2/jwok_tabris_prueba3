
jsw.qx.Class.define( "renderer.html5.base.InputComboGroupRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			
			switch (evt.property) {
				case 'text':
					this._updateText();
					break;
				default:
			}
			return;
		},
		
		_updateText : function() {
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.inputcombo.InputComboGroup", {
	create : function() {
		return new renderer.html5.base.InputComboGroupRenderer();
	}
});

