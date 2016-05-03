
jsw.qx.Class.define( "renderer.html5.base.StackCompositeRenderer", {

	extend : renderer.html5.base.CompositeRenderer,

	members : {
		_topControl : null,
		
		render : function() {
			this.base( arguments );
		},
		
		_onPropertyChangeEvent : function(evt) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'topControl':
					this._updateTopControlRender();
					break;
				default:
			}
		},
		
		_updateTopControlRender : function () {
			var widget = this.getJSWWidget().getTopControl();
			if ( widget !== null && widget !== '' ) {
				this._topControl = jsw.remote.ObjectRegistry.getObject( widget );
			} else {
				this._topControl = null;
			}
			
			// No debería ser necesario ya que se gestiona desde el widget en Java. 
			var children = this.getJSWWidget().getChildren();
			for ( var i = 0, len = children.length; i < len; i++) {
				children[ i ].setVisible( children[ i ] === this._topControl );
			}
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.StackComposite", {
	create : function() {
		return new renderer.html5.base.StackCompositeRenderer();
	}
});
