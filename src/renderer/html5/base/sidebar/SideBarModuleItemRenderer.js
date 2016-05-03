
jsw.qx.Class.define( "renderer.html5.base.SideBarModuleItemRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	members : {
		select : function() {
			this.getParent().select();
		},

		unselect : function() {
			this.getParent().unselect();
		},
		
		onCommand : function() {
			this._runBlockerCommand( this, this.__onCommand );
		},
		
		__onCommand : function() {
			this.getJSWWidget().command();
		},
		
		
		_onPropertyChangeEvent : function( evt ) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'text':
				case 'image':
				case 'tooltip':
					this.updateRender();
					break;
				case 'additionalText':
				case 'additionalTooltip':
					this.updateAdditionalRender();
					break;
				default:
			}
		}
		
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.sidebar.SideBarModuleItem", {
	create : function() {
		return new renderer.html5.base.SideBarModuleItemRenderer();
	}
});

