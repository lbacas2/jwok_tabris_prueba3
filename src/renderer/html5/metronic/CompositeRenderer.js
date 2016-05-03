
jsw.qx.Class.define( "renderer.html5.metronic.CompositeRenderer", {

	extend : renderer.html5.base.CompositeRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}	
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Composite", {
	create : function() {
		return new renderer.html5.metronic.CompositeRenderer();
	}
});