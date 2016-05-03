
jsw.qx.Class.define( "renderer.html5.base.MenuModuleItemRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	members : {
		select : function() {
		},

		unselect : function() {
		},
		
		onCommand : function() {
			this.getJSWWidget().command();
		},
		

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
				//case 'selectable':
				case 'selected':
					this._updateSelectedRender();
					break;
				default:
			}
		},
		
		_updateRender : function() {
			return;
		},
		
		_updateAdditionalRender : function() {
			return;
		},
		
		_updateSelectedRender : function() {
			this.getJSWWidget().isSelected() ? this.select() : this.unselect();
		}
		
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.menu.MenuModuleItem", {
	create : function() {
		return new renderer.html5.base.MenuModuleItemRenderer();
	}
});
