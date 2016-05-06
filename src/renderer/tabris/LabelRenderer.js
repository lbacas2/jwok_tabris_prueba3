
jsw.qx.Class.define( "renderer.tabris.LabelRenderer", {

	extend : renderer.tabris.WidgetRenderer,

	members : {
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var _this = this;
				var elem = new tabris.TextView({
						id : this.getJSWWidget().getRenderRole(),
						markupEnabled : this.getJSWWidget().isRichText() || false
				}).appendTo( parentElem );
				
				this.setEl( elem );
				this.base( arguments );
				
				this._updateText();
				this._updateImage();
			}
			
			this._renderIsDone();
		},
		
		_onPropertyChangeEvent : function(evt) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'text':
					this._updateText();
					break;
				case 'image':
					this._updateImage();
					break;
				/*
				// NOTE: Tabris.js only support set 'markupEnabled' property on widget creation phase.
				case 'richText':
					this._updateRichText();
					break;
				*/
				default:
			}
			return;
		},
		
		_updateText : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'text', this.getJSWWidget().getText() || '' );
			}
		},
		
		_updateImage : function () {
			console.debug ( 'Method LabelRenderer._updateImage has been not implemented yet!!!');
			// TODO
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Label",  {
	create : function() {
		return new renderer.tabris.LabelRenderer();
	}
});
