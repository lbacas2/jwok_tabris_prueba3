
jsw.qx.Class.define( "renderer.tabris.CompositeRenderer", {

	extend : renderer.CompositeRenderer,

	members : {
		render : function() {
			if ( this.getParent() !== null && this.getParent().getEl() !== null ) {
				var elem = new tabris.Composite({
						id : this.getJSWWidget().getRenderRole()
				}).appendTo( this.getParent().getEl() );
				
				this.setEl( elem );
				
				this.base( arguments );
			}
			
			this._renderIsDone();
		}
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Composite", {
	create : function() {
		return new renderer.tabris.CompositeRenderer();
	}
});