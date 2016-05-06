
jsw.qx.Class.define( "renderer.tabris.SideBarModuleItemRenderer", {

	construct : function() {
		this.base( arguments );
		
		this.__itemData = {};
		this.__sideBarRenderer = null;
	},

	extend : renderer.tabris.WidgetRenderer,

	members : {
		onDispose : function( evt ) {
			if ( this.getParent() !== null && this.__sideBarRenderer !== null ) {
				this.__sideBarRenderer.removeItem( this.__itemData );
			}
			
			this.base( arguments, evt );
		},
		
		render : function() {
			this.__sideBarRenderer = this.getJSWWidget().getSideBar().getRenderer();
			
			this._updateItem();
			this._renderIsDone();
		},
		
		_onPropertyChangeEvent : function( evt ) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'text':
				case 'image':
					this._updateItem();
					break;
				default:
			}
		},

		_updateItem : function() {
			if ( this.getParent() !== null && this.__sideBarRenderer !== null ) {
				var oldItem = this.__itemData;
				this.__itemData = { 'id': this.getJSWWidget().getInternalId(), 'text': this.getJSWWidget().getText(), 'image': this.getJSWWidget().getImage(), 'leaf' : true };
			
				this.__sideBarRenderer.removeItem( oldItem );
				this.__sideBarRenderer.addItem( this.__itemData );
			}
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.sidebar.SideBarModuleItem", {
	create : function() {
		return new renderer.tabris.SideBarModuleItemRenderer();
	}
});


