
jsw.qx.Class.define( "renderer.html5.metronic.MenuRenderer", {

	extend : renderer.html5.base.MenuRenderer,

	members : {
		render : function() {
// TODO: Usar método _locateInTemplate
			var widget = this.getJSWWidget();
			var role   = widget.getRenderRole();
			
			// Si se especifica renderRole intentamos localizar el elemento en el DOM
			if (role !== null) {
				var elem;
				if ( (elem = $('ul.navbar-nav[data-render-role="' + role +'"]').first()).length > 0 ) {
					this.setEl( elem );
				}
			}
			
			// Si no hay renderRole o no se encuentra el elemento en el DOM procedemos a crear uno.
			if ( this.getEl() === null ) {
				var topViewHeaderEl = $('.hor-menu').first();
				if ( topViewHeaderEl.length === 0 ) {
					topViewHeaderEl = $(document.createElement('div'))
												.attr( {'class': 'hor-menu hor-menu-light hidden-sm hidden-xs'})
												.insertAfter( $('.page-logo') );
				}
				
				this.setEl( $(document.createElement('ul')).attr( {'class': 'nav navbar-nav'}).appendTo( topViewHeaderEl ) );
			}
				
				
			if ( this.getEl() !== null ) {	
				// Disable click event on disabled items
				this.getEl().on('click', '.nav li.disabled a', function() {
					e.preventDefault();
					return false;
				});
				
				this.base(arguments);
				this._renderIsDone();
			}
		},
		
		onDispose : function(evt) {
			this.getEl().remove();
			this.base(arguments, evt);
		},
		
		getChildrenContainer : function() {
			return this.getEl();
		}
		
	}
} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Menu",  {
	create : function() {
		return new renderer.html5.metronic.MenuRenderer();
	}
});
