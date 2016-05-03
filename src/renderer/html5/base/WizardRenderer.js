jsw.qx.Class.define( "renderer.html5.base.WizardRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
		
		_onPropertyChangeEvent : function( evt ) {
			this.base( arguments, evt );
			
			if ("text" == evt.property) {
				this._onCurrentPageChange( evt );
			} 

			return;
		}	
		
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Wizard", {
	create : function( ){
		return new renderer.html5.base.WizardRenderer( );
	}
});
renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.wizard.WizardPage", {
	create : function() {}
});