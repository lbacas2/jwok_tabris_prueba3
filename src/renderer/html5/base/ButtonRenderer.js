
jsw.qx.Class.define( "renderer.html5.base.ButtonRenderer", {

	extend : renderer.html5.base.WidgetRenderer,
	
	construct : function() {
		this.base( arguments );
		this.imgEl = null;
		this.textEl = null;
	},

	members : {
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );
				
				if ( (this.textEl = this.getEl().find('.title').first() ).length == 0) {
					this.textEl = $(document.createElement('span')).addClass('title').appendTo( this.getEl() );
				}

				var _this = this;
				this.getEl().on("click", function( event ) {
					event.preventDefault();
					
					_this.onCommand();
				});
				
				this.base(arguments);
				this._updateText();
				this._updateImage();
			}
		},
		
		onCommand : function() {
			this.getJSWWidget().command();
		},
		
		
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			
			switch (evt.property) {
				case 'text':
					this._updateText();
					break;
				case 'image':
					this._updateImage();
					break;
				default:
			}
		},
		
		_updateText : function () {
			if (this.textEl !== null) {
				this.textEl.html( this.getJSWWidget().getText() );
			}
		},
		
		_updateImage : function () {
			// NOTE: Redefined in specific renderer: metronic, ...
		},
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Button", {
	create : function() {
		return new renderer.html5.base.ButtonRenderer();
	}
});

