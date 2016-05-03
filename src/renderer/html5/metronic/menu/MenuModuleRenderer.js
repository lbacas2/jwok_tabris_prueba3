
jsw.qx.Class.define( "renderer.html5.metronic.MenuModuleRenderer", {

	extend : renderer.html5.base.MenuModuleRenderer,

	construct : function() {
		this.base( arguments );
		
		this.aEl      = null;
		this.imgEl    = null;
		this.textEl   = null;
		this.adTextEl = null;
		
		this._childrenEl = null;
	},
	
	members : {
		render : function() {
			var widget = this.getJSWWidget();
			var role   = (widget.getRenderRole() !== null) ? widget.getRenderRole() : 'menu_'+ widget.getInternalId();
			var _this  = this;
			
			this.setEl( $(document.createElement('li'))
					.attr('data-render-role', role)
					.appendTo( this.getParent().getChildrenContainer() ) );
			
			this.aEl    = $(document.createElement('a')).attr('href', 'javascript:;').appendTo( this.getEl() );
			this.textEl = $(document.createElement('span')).addClass('title').appendTo( this.aEl );

			// Create image element
			var image = widget.getImage(),
				imageType = jsw.widgets.util.ImageUtil.getImageType( image );
	
			if ( (this.imgEl = this.getEl().find( imageType.elementType ).first()).length == 0) {
				this.imgEl = $(document.createElement( imageType.elementType ) ).prependTo( this.aEl );
			} else {
				this.imgEl.attr('data-class', this.imgEl.attr('class') );
			}
			// Hide img element if image is not found
			this.imgEl.error(function () { 
			    $(this).css( {visibility: "hidden"} ); 
			});
			
			// Create root node for children.
			this._childrenEl = $(document.createElement('ul')).addClass( 'dropdown-menu pull-left' ).appendTo( this.getEl() );
		
			this.base(arguments);
			this._updateRender();

			// Add attributes
			if(this.getParent().getJSWWidget().classname === "jsw.widgets.menu.MenuModule") {
				// Submenu (not a root element)
				this.getEl().addClass('dropdown-submenu');
				
				// Add tooltip to the element
				if (this.getEl() !== null && this.getJSWWidget().getTooltip() !== '') {
					this.getEl().tooltip({
						title: this.getJSWWidget().getTooltip(),
						placement: 'auto left',
						html: false,
						container: 'body'
					});
				}

				// Add badge (additional text)
				if (this.aEl !== null && this.getJSWWidget().getAdditionalText() !== '') {
					this.adTextEl = $(document.createElement('span'))
							.addClass('badge badge-warning')
							.html( this.getJSWWidget().getAdditionalText() )
							.appendTo( this.aEl );

					// Set rounded badge if the value is a number, squared in another case
					if (this.adTextEl !== null && isNaN( this.adTextEl.text() ) ) {
						// this.adTextEl.addClass('badge-roundless'); CSS not available at this scope
						this.adTextEl.attr( {'style':'border-radius: 0px !important;-webkit-border-radius: 0px !important; -moz-border-radius: 0px !important;'});
					}

					if (this.adTextEl !== null && this.getJSWWidget().getAdditionalTooltip() !== '') {
						this.adTextEl.tooltip({
							title: this.getJSWWidget().getAdditionalTooltip(),
							placement: 'top',
							html: false,
							container: 'body'
						});
					}
				}
				
				this._updateAdditionalRender();
				
			} else {
				// Root element in menu
				this.getEl().addClass('classic-menu-dropdown');
				this.aEl.attr( {'data-toggle': 'dropdown', 'data-hover':'megamenu-dropdown'});
				
				// Force close other elements if desired
				this.aEl.attr( {'data-close-others': 'true'});
			}
				
			
	        // handle hover dropdown menu for desktop devices only
	        $('[data-hover="megamenu-dropdown"]').not('.hover-initialized').each(function() {   
	            $(this).dropdownHover(); 
	            $(this).addClass('hover-initialized'); 
	        });
	        
	        $(document).on('click', '.mega-menu-dropdown .dropdown-menu', function (e) {
	            e.stopPropagation();
	        });
	        
	        this._renderIsDone();
		},
		
		onDispose : function(evt) {
			this.getEl().remove();
			this.base(arguments, evt);
		},
		
		getChildrenContainer : function() {
			return this._childrenEl;
		},
		
		_updateRender : function() {
			this.base( arguments );
			
			if (this.textEl !== null) {
				this.textEl.html( this.getJSWWidget().getText() );
			}
			if (this.imgEl !== null) {
				var image = this.getJSWWidget().getImage(),
					imageType = jsw.widgets.util.ImageUtil.getImageType( image );
				
				if (imageType === jsw.widgets.util.ImageUtil.IMAGE.NONE) {
					image = this.imgEl.attr('data-class') || 'fa-fw';
				}
				this.imgEl.attr(imageType.elementAttr, image );
			}
			// TODO: Update toolTip
				
			if (this.getEl() !== null) {
				this.getJSWWidget().isEnabled() ? this.getEl().removeClass('disabled') : this.getEl().addClass('disabled');
				this.getJSWWidget().isVisible() ? this.getEl().removeClass('hidden')   : this.getEl().addClass('hidden') ;
			}
		},
		
		_updateAdditionalRender : function() {
			this.base( arguments );
			
			if (this.adTextEl !== null) {
				this.adTextEl.html( this.getJSWWidget().getAdditionalText() );
			}
			// TODO: Update additional toolTip
		}
	}
} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.menu.MenuModule",  {
	create : function() {
		return new renderer.html5.metronic.MenuModuleRenderer();
	}
});
