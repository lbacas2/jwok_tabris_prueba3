
jsw.qx.Class.define( "renderer.html5.base.InputComboSeparatorRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	members : {
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.inputcombo.InputComboSeparator", {
	create : function() {
		return new renderer.html5.base.InputComboSeparatorRenderer();
	}
});