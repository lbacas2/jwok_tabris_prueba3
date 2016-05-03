
jsw.qx.Class.define( "renderer.html5.base.LabelRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	construct : function() {
		this.base( arguments );
		
		this._imgEl = null;
		this.__maxLength = null;
	},

	members : {
		getElementBuilderInfo : function() {
			return {
				type  : 'label',
				class : 'hidden',
				attrs : {}
			};
		},
		
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );
					
				// Get max length to strip the text and add ellipsis
				if ( this.getEl().attr('data-max-length') && !isNaN( this.getEl().attr('data-max-length') ) ) {
					this.__maxLength = this.getEl().attr('data-max-length');
				}
			
				this.base( arguments );
				this._updateRender();
			}
		},

		_onPropertyChangeEvent : function(evt) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'text':
				case 'image':
				case 'richText':
					this._updateRender();
					break;
				default:
			}
			return;
		},
		
		_updateRender : function () {
			if (this.getEl() !== null) {
				
				// Update Text 
				var text = this.getJSWWidget().getText() || '';
				if ( this.getJSWWidget().isRichText() ) {
					this.getEl().html( text );
				} else {
					var strippedText = jsw.widgets.util.TextUtil.stripHtml(text);
					if ( this.__maxLength !== null && this.__maxLength > 0 && strippedText.length > this.__maxLength ) {
						strippedText = jQuery.trim( strippedText ).substring(0, this.__maxLength ).split(' ').slice(0, -1).join(' ') + "...";
					}
					this.getEl().text( strippedText );
				}
				
				// Update image 
				if ( this.getJSWWidget().getImage() !== null ) {
					if (this._imgEl === null) {
						this._imgEl = $('img').prependTo( this.getEl() );
					}
					this._imgEl.attr('src', this.getJSWWidget().getImage() );
					
				} else if (this._imgEl !== null) {
					this._imgEl.remove();
				}
			}
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Label", {
	create : function() {
		return new renderer.html5.base.LabelRenderer();
	}
});

