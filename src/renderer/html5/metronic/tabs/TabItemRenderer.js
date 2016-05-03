jsw.qx.Class.define( "renderer.html5.metronic.TabItemRenderer", {

	extend : renderer.html5.base.TabItemRenderer,

	construct : function() {
		this.base( arguments );
		this.headerEl     = null;
		this.headerTextEl = null;
		this.headerImgEl  = null;
	},

	members : {
		onDispose : function(evt) {
			if (this.headerEl !== null) {
				this.headerEl.remove();
				
				this.headerEl     = null;
				this.headerTextEl = null;
				this.headerImgEl  = null;
			}
			
			if (this.getEl() !== null) {
				this.getEl().remove();
				
				this.setEl( null );
			}
			
			this.base(arguments);
		},
		
		show : function() {
			// nothing. The Tab widget add or remove active class to selected tabItem 
		},
		
		hide : function() {
			// nothing. The Tab widget add or remove active class to selected tabItem
		}, 
		
		render : function() {
			var tabItem = this.getJSWWidget();
				tab     = (tabItem) ? tabItem.getTab() : null;
			
			if (tabItem && tab && this.getParent() !== null && this.getParent().getEl() !== null) {
				var role         = tabItem.getRenderRole() || '',
					image        = tabItem.getImage() || '',
					imageType    = jsw.widgets.util.ImageUtil.getImageType( image ),
					tabNavEl     = this.getParent().getnavigationEl(),
					tabContentEl = this.getParent().getContentEl(),
					headerAEl,
					tabId;
				
				if (tabNavEl === null || tabContentEl === null) {
					return ;
				}
				
				if (role === '') {
					role = tab.getRenderRole() + '_' + tabItem.getInternalId();
				}
				// Se producen problemas al usar un identificador con puntos o espacios.
				tabId = role.replace(/([\\s\\.]+)/g, '_') + renderer.base.WidgetRenderer.getUniqueId();
				
				// Create tab header for the tabItem
				this.headerEl = $(document.createElement('li'));
				headerAEl = $(document.createElement('a'))
									.attr({
										'href':        '#' + tabId, 
										'data-id' :    tabItem.getInternalId(),
										'data-toggle': 'tab'
									})
									.appendTo( this.headerEl );
				
				// Set or create text and image elements inside tabHeader element
// TODO: Comprobar si existen los elementos en la plantilla antes de crearlos.
//				if ( (this.headerTextEl = headerAEl.find('.title').first() ).length == 0) {
					this.headerTextEl = $(document.createElement('span')).addClass('title').appendTo( headerAEl );
//				}
//				if ( (this.headerImgEl = headerAEl.find( imageType.elementType ).first()).length == 0) {
					this.headerImgEl = $(document.createElement( imageType.elementType ) ).appendTo( headerAEl );
//				} else {
//					this.headerImgEl.attr('data-class', this.headerImgEl.attr('class') );
//				}
				this.headerEl.appendTo( tabNavEl );
				
				// Get or create tab body for the tabItem
				this.setEl( $(document.createElement('div')).attr({'id' : tabId, 'data-render-role' : role}).addClass('tab-pane fade') );
				this.getEl().appendTo( tabContentEl );
						
				this.base(arguments);
				this._updateRender();
				
				if ( this.getJSWWidget().isSelected() ) {
					this.select();
				}
				
				this._renderIsDone();
			}
		},
			
		select : function() {
			this.headerEl.find('a:first').tab('show');
		},
		
		_updateRender : function() {
			var tabItem = this.getJSWWidget();
				tab     = (tabItem) ? tabItem.getTab() : null;
			
			if (this.headerTextEl !== null) {
				this.headerTextEl.html( tabItem.getText() );
			}

			if (this.headerImgEl !== null) {
				var image     = tabItem.getImage(),
					imageType = jsw.widgets.util.ImageUtil.getImageType( image );
				
				if (imageType === jsw.widgets.util.ImageUtil.IMAGE.NONE) {
					image = this.headerImgEl.attr('data-class') || '';
				}
				this.headerImgEl.attr(imageType.elementAttr, image );
			}
			
			if (this.headerEl !== null) {
				if ( tabItem.isEnabled() ) {
					this.headerEl.removeClass('disabled');
					this.getEl().removeClass('disabled');
				} else {
					this.headerEl.addClass('disabled');
					this.getEl().addClass('disabled');
				}
				
				if ( tabItem.isVisible() ) { 
					this.headerEl.removeClass('hidden');
					this.getEl().removeClass('hidden');
				} else {
					this.headerEl.addClass('hidden');
					this.getEl().addClass('hidden');
				}
			}
			
			// Si solo existe una pestaña agregamos la clase 'unique'
			if ( tab && tab.getChildrenLength() === 1 ) {
				this.headerEl.addClass('unique');
			} else {
				this.getEl().removeClass('unique');
			}
		},
		
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.tabs.TabItem", {
	create : function() {
		return new renderer.html5.metronic.TabItemRenderer();
	}
});