
jsw.qx.Class.define( "renderer.html5.base.ImageRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	construct : function() {
		this.base( arguments );
		this.imgEl = null;
	},

	destruct : function() {
		if (this.getEl() !== null) {
			this.getEl().remove();
			
			this.imgEl = null;
			this.setEl( null );
		}
	},

	members : {
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) { 
				this.setEl( elem );
				
				this.base(arguments);
				
				this._updateImage();
				this._updateAltText();
			}
		},
		
		_onPropertyChangeEvent : function(evt) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'source':
					this._updateImage();
					break;
				case 'alternativeText':
					this._updateAltText();
					break;
				default:
			}
			return;
		},
		
		_updateImage : function () {
			if (this.getEl() !== null) {
				this.getEl().attr( 'src', this.getJSWWidget().getSource() );
				this.getEl().css( 'max-width', '100%' );
			}
		},
		
		_updateAltText : function () {
			if (this.getEl() !== null) {
				this.getEl().attr( 'alt', this.getJSWWidget().getAlternativeText() );
			}
		}	
	}
});






renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Image", {
	create : function() {
		return new renderer.html5.base.ImageRenderer();
	}
});
