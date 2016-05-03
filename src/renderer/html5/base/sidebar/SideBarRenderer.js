
jsw.qx.Class.define( "renderer.html5.base.SideBarRenderer", {

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

		_onPropertyChangeEvent : function( evt ){
			this.base( arguments, evt );
			
			if ("selectedItem" == evt.property ) {
				this._onSelectedItemPropertyChangeEvent( evt );
			}
			return;
		},
		
		
		_onSelectedItemPropertyChangeEvent : function( evt ){
			if(evt.oldValue !== undefined && evt.oldValue != null && evt.oldValue != ""){
				var sideBarItem = this.getJSWWidget().getSideBarItemById(evt.oldValue);
				if(sideBarItem != null){
					var itemRenderer = this.findRendererForWidget(sideBarItem);
					if(itemRenderer != null){
						itemRenderer.unselect();
					}
				}
			}
			if(evt.newValue !== undefined && evt.newValue != null && evt.newValue != ""){
				var sideBarItem = this.getJSWWidget().getSideBarItemById(evt.newValue);
				if(sideBarItem != null){
					var itemRenderer = this.findRendererForWidget(sideBarItem);
					if(itemRenderer != null){
						itemRenderer.select();
					}
				}
			}
			return;
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.SideBar", {
	create : function() {
		return new renderer.html5.base.SideBarRenderer();
	}
});


