
jsw.qx.Class.define( "renderer.html5.metronic.ToolItemRenderer", {

	extend : renderer.html5.base.ToolItemRenderer,
	
	members : {
		render : function() {
			this.base( arguments );
			this._renderIsDone();
		},
		
		_updateImage : function() {
			// TODO: gestionar hotImage y disabledImage
			this.imgEl = renderer.html5.metronic.keyTranslation.setWidgetImage( this.getJSWWidget(), this.getEl() );
		},
		
		_updateSelected : function () {
			if (this.getEl() !== null) {
				if ( this.getJSWWidget().isSelected() ) {
					this.getEl().addClass('selected');
				} else {
					this.getEl().removeClass('selected');
				}
			}
		},
		
		onCommand : function() {
			this._runBlockerCommand( this, this.__onCommand );
		},
		
		__onCommand : function() {
			this.getJSWWidget().command();
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ToolItem",  {
	create : function() {
		return new renderer.html5.metronic.ToolItemRenderer( );
	}
});

