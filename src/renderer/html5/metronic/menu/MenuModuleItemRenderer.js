
jsw.qx.Class.define( "renderer.html5.metronic.MenuModuleItemRenderer", {

	extend : renderer.html5.base.MenuModuleItemRenderer,

	construct : function() {
		this.base( arguments );
		this.aEl      = null;
		this.imgEl    = null;
		this.textEl   = null;
		this.adTextEl = null;
		this.selectedEl = null;
	},
	
	members : {
		render : function() {
			var widget = this.getJSWWidget();
			var role   = (widget.getRenderRole() !== null) ? widget.getRenderRole() : 'menu_'+ widget.getInternalId();
			var _this  = this;
			
			this.setEl( $(document.createElement('li')).attr('data-render-role', role) );
			
			this.aEl    = $(document.createElement('a')).attr('href', 'javascript:;').appendTo( this.getEl() );
			this.textEl = $(document.createElement('span')).addClass('title').appendTo( this.aEl );
			
			this.getEl().appendTo( this.getParent().getChildrenContainer() );
			
			this.base(arguments);
			this._updateRender();

			// Add tooltip to the element
			if (this.getEl() !== null && this.getJSWWidget().getTooltip() !== '') {
				this.getEl().tooltip({
					title: this.getJSWWidget().getTooltip(),
					placement: 'auto right',
					html: false,
					container: 'body'
				});
			}

			// Add badge (additional text) 
			if (this.aEl !== null && this.getJSWWidget().getAdditionalText() !== '') {
				this.adTextEl = $(document.createElement('span'))
									.addClass('badge badge-warning')
									.appendTo( this.aEl );

				// Set rounded badge if the value is a number, squared in another case
				if (this.adTextEl !== null && isNaN( this.adTextEl.text() ) ) {
					// adText.addClass('badge-roundless'); CSS not available at this scope
					adText.attr( {'style':'border-radius: 0px !important;-webkit-border-radius: 0px !important; -moz-border-radius: 0px !important;'});
				}

				if (this.adTextEl !== null && this.getJSWWidget().getAdditionalTooltip() !== '') {
					this.adTextEl.tooltip({
						title: this.getJSWWidget().getAdditionalTooltip(),
						placement: 'top',
						html: false,
						container: 'body'
					});
				}
				
				this._updateAdditionalRender();
			}
			
			this.getEl().on("click", function(){
				_this.onCommand();
			});
			
			this._renderIsDone();
		},
		
		onDispose : function(evt) {
			this.getEl().remove();
			this.base(arguments, evt);
		},

		select : function() {
			this.base(arguments);
			
			if ( this.getJSWWidget().isSelectable() && this.selectedEl !== null) {
				this.selectedEl.attr( "class", "fa fa-check" );
			};
		},
	
		unselect : function() {
			this.base(arguments);
			
			if ( this.getJSWWidget().isSelectable() && this.selectedEl !== null) {
				this.selectedEl.attr( "class", "fa fa-square-o" );
			}
		},
		
		getChildrenContainer : function() {
			return null;
		},
		
		
		_updateRender : function() {
			this.base( arguments );
			
			if (this.textEl !== null) {
				this.textEl.html( this.getJSWWidget().getText() );
			}
			
			// Add check icon
			if ( this.getJSWWidget().isSelectable() ) {
				// The menu item is a selectable one
				this.selectedEl = $(document.createElement('i')).prependTo( this.aEl );
				this._updateSelectedRender();
				
			} else {
				// Non-selectable item
				var defValue = { attr: 'class', image: 'fa fa-fw' };
				this.imgEl = renderer.html5.metronic.keyTranslation.setWidgetImage( this.getJSWWidget(), this.aEl, 'before', defValue );
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

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.menu.MenuModuleItem",  {
	create : function() {
		return new renderer.html5.metronic.MenuModuleItemRenderer();
	}
});
