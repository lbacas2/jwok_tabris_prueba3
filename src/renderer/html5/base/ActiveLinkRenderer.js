
jsw.qx.Class.define( "renderer.html5.base.ActiveLinkRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	members : {
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );

				this.base(arguments);
				this._updateText();
				this._updateLink();
			}
		},

		_onPropertyChangeEvent : function(evt) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'text':
					this._updateText();
					break;
				case 'source':
				case 'target':
					this._updateLink();
					break;
				default:
			}
			return;
		},
		
		_updateText : function () {
			if ( this.getEl() !== null ) {
				var text = this.getJSWWidget().getText() || '';
				var elem;
				
				if ( (elem = this.getEl().find('.title').first()).length > 0 ) {
					elem.text( jsw.widgets.util.TextUtil.stripHtml( text ) );
					// Show or hide another subelements if text is empty or not.
					if ( text === '' ) {
						this.getEl().children().addClass('hidden');
					} else {
						this.getEl().children().removeClass('hidden');
					}
				} else if ( text !== '' ) {
					this.getEl().text( jsw.widgets.util.TextUtil.stripHtml( text ) );
				}
			}
		},
		
		_updateLink : function () {
			if ( this.getEl() !== null ) {
				this.getEl().attr({
					href :   this.getJSWWidget().getSource() || 'javascript:;',
					target : this.getJSWWidget().getTarget() || '_blank'
				});
			}
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ActiveLink", {
	create : function() {
		return new renderer.html5.base.ActiveLinkRenderer();
	}
});

