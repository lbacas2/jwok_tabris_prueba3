
jsw.qx.Class.define( "renderer.html5.base.LinkRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	construct : function() {
		this.base( arguments );
		this.imgEl = null;
	},


	members : {
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );
					
				var _this = this;
				this.getEl().on("click", function( event ) {
					event.preventDefault();

					_this.onCommand();
				});
			
				this.base(arguments);
				this._updateRender();
			}
		},

		_onPropertyChangeEvent : function(evt) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'text':
					this._updateRender();
					break;
				default:
			}
			return;
		},
		
		_updateRender : function () {
			if (this.getEl() !== null) {
				var text = this.getJSWWidget().getText() || '';
				this.getEl().text( jsw.widgets.util.TextUtil.stripHtml(text) );
			}
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Link", {
	create : function() {
		return new renderer.html5.base.LinkRenderer();
	}
});

