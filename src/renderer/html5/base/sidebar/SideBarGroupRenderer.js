
jsw.qx.Class.define( "renderer.html5.base.SideBarGroupRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
		select : function() {
			// Do nothing due to select propagation
			return;
		},

		unselect : function() {
			// Do nothing due to unselect propagation 
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
		},
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.sidebar.SideBarGroup", {
	create : function() {
		return new renderer.html5.base.SideBarGroupRenderer();
	}
});


