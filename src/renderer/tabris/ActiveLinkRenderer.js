
jsw.qx.Class.define( "renderer.tabris.ActiveLinkRenderer", {

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
				
				this._updateTextAndLink();
			}
			
			this._renderIsDone();
		},
		
		_onPropertyChangeEvent : function(evt) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'text':
				case 'source':
				case 'target':
					this._updateTextAndLink();
					break;
				default:
			}
			return;
		},
		
		_updateTextAndLink : function () {
			if ( this.getEl() !== null ) {
				var text   = jsw.widgets.util.TextUtil.stripHtml( this.getJSWWidget().getText() || '' );
				var href   = this.getJSWWidget().getSource() || 'javascript:;';
				var target = this.getJSWWidget().getTarget() || '';
				
				if ( text === '' ) {
					text = href;
				}
				this.getEl().set( 'text', '<a href="' + href + '" target="' + target + '">' + text + '</a>' );
			}
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ActiveLink",  {
	create : function() {
		return new renderer.tabris.ActiveLinkRenderer();
	}
});
