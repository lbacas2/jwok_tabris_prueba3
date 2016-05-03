
jsw.qx.Class.define( "renderer.html5.base.TreeViewItemRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
		select : function() {
		},

		unselect : function() {
		},
		
		check : function() {
		},
		
		uncheck : function() {
		},
		
		expand : function() {
		},
		
		collapse : function() {
		},
		
		onCommand : function() {
			this.getJSWWidget().command();
		},
		
		_onPropertyChangeEvent : function( evt ) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'text':
					this._updateTextRender();
					break;
				case 'image':
					this._updateImageRender();
					break;
				case 'selected':
					this._updateSelectedRender();
					break;
				case 'checked':
					this._updateCheckedRender();
					break;
				case 'expanded':
					this._updateExpandedRender();
					break;
				default:
			}
		},
				
		_updateTextRender : function() {
		},
		
		_updateImageRender : function() {
		},
		
		_updateSelectedRender : function() {
			this.getJSWWidget().isSelected() ? this.select() : this.unselect();
		},
		
		_updateCheckedRender : function() {
			this.getJSWWidget().isChecked() ? this.check() : this.uncheck();
		},
		
		_updateExpandedRender : function() {
			this.getJSWWidget().isExpanded() ? this.expand() : this.collapse();
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.treeview.TreeViewItem", {
	create : function() {
		return new renderer.html5.base.TreeViewItemRenderer();
	}
});

