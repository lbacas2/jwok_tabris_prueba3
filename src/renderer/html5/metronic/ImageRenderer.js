
jsw.qx.Class.define( "renderer.html5.metronic.ImageRenderer", {

	extend : renderer.html5.base.ImageRenderer,

	members : {
		//@Override
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) { 
				this.imgEl = elem.wrap('<div></div>');
				this.setEl( elem.parent() );

				this.base(arguments);
				this._renderIsDone();
			}
		},
		
		//@Override
		_updateImage : function () {
			if (this.getEl() !== null) {
				this.imgEl = renderer.html5.metronic.keyTranslation.setWidgetImage( this.getJSWWidget(), this.getEl() );
				this.imgEl.css( 'max-width', '100%' );
			}
		},
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Image",  {
	create : function() {
		return new renderer.html5.metronic.ImageRenderer();
	}
});
