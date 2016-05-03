
jsw.qx.Class.define( "renderer.html5.metronic.ButtonRenderer", {

	extend : renderer.html5.base.ButtonRenderer,

	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		}, 
		
		_updateImage : function() {
			this.imgEl = renderer.html5.metronic.keyTranslation.setWidgetImage( this.getJSWWidget(), this.getEl() );
		}, 
		
		onCommand : function() {
			this._runBlockerCommand( this, this.__onCommand );
		},
		
		__onCommand : function() {
			this.getJSWWidget().command();
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Button",  {
	create : function() {
		return new renderer.html5.metronic.ButtonRenderer( );
	}
});

