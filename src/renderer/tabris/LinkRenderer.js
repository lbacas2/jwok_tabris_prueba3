
jsw.qx.Class.define( "renderer.tabris.LinkRenderer", {

	extend : renderer.tabris.WidgetRenderer,

	members : {
		//@Override
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var _this = this;
				var elem = new tabris.TextView({
						id : this.getJSWWidget().getRenderRole(),
						markupEnabled : true
				}).appendTo( parentElem );
				
				this.setEl( elem );
				this.base( arguments );
				
				this.getEl().on("tap", function() {
					_this.onCommand();
				});
				
				this._updateTextAndLink();
			}
			
			this._renderIsDone();
		},
		
		_onPropertyChangeEvent : function(evt) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'text':
					this._updateText();
					break;
				default:
			}
			return;
		},
		
		_updateText : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'text', this.getJSWWidget().getText() );
			}
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Link",  {
	create : function() {
		return new renderer.tabris.LinkRenderer();
	}
});
