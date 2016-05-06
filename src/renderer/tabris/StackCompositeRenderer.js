
jsw.qx.Class.define( "renderer.tabris.StackCompositeRenderer", {

	extend : renderer.tabris.ParentWidgetRenderer,

	members : {
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var elem = new tabris.Composite({
						id : this.getJSWWidget().getRenderRole() || ''
				}).appendTo( parentElem );
				
				this.setEl( elem );
				
				this.base( arguments );
			}
			
			this._renderIsDone();
		}
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.StackComposite", {
	create : function() {
		return new renderer.tabris.StackCompositeRenderer();
	}
});