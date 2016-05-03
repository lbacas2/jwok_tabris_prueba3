
jsw.qx.Class.define( "renderer.html5.base.SideBarModuleRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
		select : function() {
			this.getParent().select();
			return;
		},

		unselect : function() {
			this.getParent().unselect();
			return;
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
			
			return;
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.sidebar.SideBarModule", {
	create : function() {
		return new renderer.html5.base.SideBarModuleRenderer();
	}
});


