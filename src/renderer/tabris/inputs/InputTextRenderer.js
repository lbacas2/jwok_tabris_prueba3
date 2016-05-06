
jsw.qx.Class.define( "renderer.tabris.InputTextRenderer", {

	extend : renderer.tabris.InputControlRenderer,

	members : {
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var _this = this;
				var elem = new tabris.TextInput({
						id :       this.getJSWWidget().getRenderRole(),
						keyboard : 'default',
// TODO: Cambiar
						//type :     'default'
						type : ( this.getJSWWidget().getRenderRole() === 'passwordInput' ? 'password' : 'default' )
				}).appendTo( parentElem );
				
				this.setEl( elem );
				this.base( arguments );
				
				// Initializate control: Set value, readOnly and placeholder properties.
				this.init();
				this.addInputControlListeners();
				
// TODO: eliminar!!!!

				switch ( this.getJSWWidget().getRenderRole() ) {
					case 'userInput':
						//this.getJSWWidget().setValue( 'enrique.almohalla' );
						this.getJSWWidget().setValue( 'netzima' );
						break;
					case 'passwordInput':
						this.getJSWWidget().setValue( 'netzima' );
						break;
					default:
				}
// TODO: HASTA AQUÍ
			}
			
			this._renderIsDone();
		},

	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputText",  {
	create : function() {
		return new renderer.tabris.InputTextRenderer();
	}
});
