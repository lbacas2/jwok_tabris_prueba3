jsw.qx.Class.define( "renderer.html5.base.TabItemRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
		select : function() {
		},

		unselect : function() {
		},

		_onPropertyChangeEvent : function( evt ) {
			this.base( arguments, evt );
			
			switch(evt.property) {
			  case 'text':
			  case 'image':
			  case 'tooltip':
				this._updateRender();
				break;
			  case 'content':
				this._updateContentRender();
				break;
			  case 'selected':
				this.getJSWWidget().isSelected() ? this.select() : this.unselect();
				break;
			  default:
			}
		},
		
		_updateRender : function( evt ) {
			return;
			// NOTE: Redefined in specific renderer: metronic, ...
		},
		
		_updateContentRender : function( evt ) {
			return;
			// NOTE: Redefined in specific renderer: metronic, ...
		},
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.tabs.TabItem", {
	create : function() {
		return new renderer.html5.base.TabItemRenderer();
	}
});


