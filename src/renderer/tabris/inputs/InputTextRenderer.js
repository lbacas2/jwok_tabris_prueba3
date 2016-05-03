
jsw.qx.Class.define( "renderer.tabris.InputTextRenderer", {

	extend : renderer.InputTextRenderer,

	members : {
		render : function() {
			if ( this.getParent() !== null && this.getParent().getEl() !== null ) {
				var _this = this;
				var elem = new tabris.TextInput({
						id :       this.getJSWWidget().getRenderRole(),
						keyboard : 'default',
						type :     'default'
				}).appendTo( this.getParent().getEl() );
				
				this.setEl( elem );
				
				elem.on("select", function() {
					_this.onCommand();
				});
				
				this.base( arguments );
				
				this._updateValue();
				this._updatePlaceholder();
				this._updateReadOnly();
			}
			
			this._renderIsDone();
		},
		
		_updateValue : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'text', this.getJSWWidget().getValue() );
			}
		},
		
		_updatePlaceholder : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'message', this.getJSWWidget().getPlaceHolder() );
			}
		},
		
		_updateReadOnly : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'editable', !this.getJSWWidget().isReadOnly() );
			}
		},

	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputText",  {
	create : function() {
		return new renderer.tabris.InputTextRenderer();
	}
});
