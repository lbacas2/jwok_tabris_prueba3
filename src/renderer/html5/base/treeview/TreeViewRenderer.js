
jsw.qx.Class.define( "renderer.html5.base.TreeViewRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
		},
		
		select : function() {
			return;
		},

		unselect : function() {
			return;
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.TreeView", {
	create : function() {
		return new renderer.html5.base.TreeViewRenderer();
	}
});


