
jsw.qx.Class.define( "renderer.html5.base.MenuModuleRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
		_onPropertyChangeEvent : function( evt ) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'text':
				case 'image':
				case 'tooltip':
					this._updateRender();
					break;
				case 'additionalText':
				case 'additionalTooltip':
					this._updateAdditionalRender();
					break;
				default:
			}
		},
		
		_updateRender: function() {
			return;
		},
		
		_updateAdditionalRender: function() {
			return;
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.menu.MenuModule", {
	create : function() {
		return new renderer.html5.base.MenuModuleRenderer();
	}
});


