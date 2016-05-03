
jsw.qx.Class.define( "renderer.html5.metronic.InputTextRenderer", {

	extend : renderer.html5.base.InputTextRenderer,

	include : renderer.html5.metronic.mixin.InputControlRenderer,

	members : {
		render : function() {
			this.base( arguments );
			
			this._renderIsDone();
		}, 
		
		_onPropertyChangeEvent : function( evt ) {
			if ( evt.property === 'readOnly' || evt.property === 'enabled' ) {
				this.__changeHighlight();
			}
			
			this.base(arguments, evt);
		}
	}
} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputText",  {
	create : function() {
		return new renderer.html5.metronic.InputTextRenderer();
	}
});
