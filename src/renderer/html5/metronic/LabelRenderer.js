
jsw.qx.Class.define( "renderer.html5.metronic.LabelRenderer", {

	extend : renderer.html5.base.LabelRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}

	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Label", {
	create : function() {
		return new renderer.html5.metronic.LabelRenderer();
	}
});