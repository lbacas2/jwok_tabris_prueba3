
jsw.qx.Class.define( "renderer.html5.metronic.SideBarRenderer", {

	extend : renderer.html5.base.SideBarRenderer,

	members : {
		render : function() {
			var elem = this.__locateInTemplate('.page-sidebar-menu .last');
			if ( elem !== null ) {
				this.setEl( elem );
				
				this.base(arguments);
				this._renderIsDone();
			}
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.SideBar",  {
	create : function() {
		return new renderer.html5.metronic.SideBarRenderer();
	}
});

