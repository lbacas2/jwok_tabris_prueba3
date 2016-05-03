
jsw.qx.Class.define( "renderer.html5.base.SashCompositeRenderer", {

	extend : renderer.html5.base.CompositeRenderer,

	members : {
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.SashComposite", {
	create : function() {
		return new renderer.html5.base.SashCompositeRenderer();
	}
});
