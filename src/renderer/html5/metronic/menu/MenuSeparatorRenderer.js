
jsw.qx.Class.define( "renderer.html5.metronic.MenuSeparatorRenderer", {

	extend : renderer.html5.base.MenuSeparatorRenderer,

	members : {
		render : function(){
			var sepEl = $(document.createElement('li'))
								.attr( {'id': 'menu_'+ this.getJSWWidget().getInternalId()} )
								.appendTo( this.getParent().getChildrenContainer() );
			$(document.createElement('hr')).addClass( 'dropdown-menu-separator' ).appendTo( sepEl );
			
			this.setEl( sepEl );
			this.base(arguments);
			
			this._renderIsDone();
		},
		
		onDispose : function(evt) {
			this.getEl().remove();
			this.base(arguments, evt);
		},
		
		getChildrenContainer : function() {
			return null;
		},
		
		_updateRender : function() {
			this.base( arguments );
			if (this.getEl() !== null) {
				this.getJSWWidget().isVisible() ? this.getEl().removeClass('hidden') : this.getEl().addClass('hidden') ;
			}
		},
	}
} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.menu.MenuSeparator",  {
	create : function() {
		return new renderer.html5.metronic.MenuSeparatorRenderer();
	}
});
