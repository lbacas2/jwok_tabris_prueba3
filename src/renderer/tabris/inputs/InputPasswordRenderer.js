
jsw.qx.Class.define( "renderer.tabris.InputPasswordRenderer", {

	extend : renderer.tabris.InputControlRenderer,

	members : {
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var _this = this;
				var elem = new tabris.TextInput({
						id :       this.getJSWWidget().getRenderRole(),
						keyboard : 'default',
						type :     'password'
				}).appendTo( parentElem );
				
				this.setEl( elem );
				this.base( arguments );
				
				// Initializate control: Set value, readOnly and placeholder properties.
				this.init();
				this.addInputControlListeners();
				
// TODO: eliminar!!!!
				switch ( this.getJSWWidget().getRenderRole() ) {
					case 'passwordInput':
						this.getJSWWidget().setValue( 'netzima' );
						break;
					default:
				}
// TODO: HASTA AQUÍ
			}
			
			this._renderIsDone();
		}

	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputPassword",  {
	create : function() {
		return new renderer.tabris.InputPasswordRenderer();
	}
});
