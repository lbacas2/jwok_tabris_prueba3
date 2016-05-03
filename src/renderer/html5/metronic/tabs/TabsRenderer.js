jsw.qx.Class.define( "renderer.html5.metronic.TabsRenderer", {

	extend : renderer.html5.base.TabsRenderer,

	construct : function() {
		this.base( arguments );
		this.navEl     = null;
		this.contentEl = null;
	},

	members : {
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null && (elem.attr('data-template') === 'tabs' || elem.attr('data-template') === undefined) ) {
				// workaround
				this.__proto__.classname = 'renderer.html5.metronic.TabsRenderer';
					
				this.setEl( elem );
				this.base( arguments );
					
				// TODO: Add support for this class in data-class:
				// 		tabs-below, tabs-left, tabs-right
				// 		nav-pill
				 
				this.navEl = $(document.createElement('ul'))
								.attr('class', 'nav nav-tabs ' + (this.getEl().attr('data-class') || '') )
								.appendTo( this.getEl() );
				this.contentEl = $(document.createElement('div')).attr('class', 'tab-content').appendTo( this.getEl() );
				
				this.addTabListener();
				
				this._renderIsDone();
			}
		},
		
		getnavigationEl : function() {
			return this.navEl;
		},
		
		getContentEl : function() {
			return this.contentEl;
		},
		
		addTabListener : function() {
			if (this.navEl !== null) {
				var _this = this;
				
				// Listener to change tabs events
				this.navEl.on('show.bs.tab click', 'a[data-toggle="tab"]', function (e) {
					var itemWidget = _this.getJSWWidget().getTabItemById( $(this).attr('data-id') );
					if ( itemWidget === null ) {
						return false;
					}
					
					// Prevent event when do click in the selected tab 
					if (e.type === 'click' && itemWidget.isSelected() === true ) {
						return true;
					}
						
					itemWidget.setSelected( true );
					// Check is change active tabItem is done on server side.
					if ( itemWidget.isSelected() !== true ) {
						return false;
					}
				});
			}
		},
		
		removeTabListener : function() {
			if (this.navEl != null) {
				this.navEl.off('show.bs.tab click', 'a[data-toggle="tab"]');
			}
		}

	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Tabs", {
	create : function() {
		return new renderer.html5.metronic.TabsRenderer();
	}
});