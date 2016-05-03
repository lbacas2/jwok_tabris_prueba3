
jsw.qx.Class.define( "renderer.html5.metronic.SideBarModuleItemRenderer", {

	extend : renderer.html5.base.SideBarModuleItemRenderer,

	construct : function() {
		this.base( arguments );
		this.imgEl  = null;
		this.textEl = null;
	},

	destruct : function() {
		this.base( arguments );
	},

	members : {
		render : function() {
			var widget = this.getJSWWidget();
			var role   = widget.getRenderRole();
			var _this  = this;
			
			if (role != null) {
				this.setEl( $('li[data-render-role="' + role +'"]').first() );
			} else {
				role = 'sideBar_'+ widget.getInternalId();
			}
			
			this.base(arguments);
			
			if (this.getEl() === null) {
				this.setEl( $(document.createElement('li')).attr('data-render-role', role) );
				this.getEl().addClass('nav-item');
				
				this.aEl = $(document.createElement('a')).addClass('nav-link').appendTo( this.getEl() );

				// Image
				this._updateImage();
				
				//this.imgEl  = $(document.createElement('img')).attr('src', widget.getImage() ).appendTo( aEl );
				this.textEl = $(document.createElement('span')).addClass('title').appendTo( this.aEl );
				
				// Setting the new element in the template 
				if(this.getParent().getJSWWidget().classname === "jsw.widgets.SideBar") {
					this.getParent().getEl().before( this.getEl() );
					
				} else if(this.getParent().getJSWWidget().classname === "jsw.widgets.sidebar.SideBarModule") {
					this.getParent().getEl().find("ul:first").append( this.getEl() );
					
				} else if(this.getParent().getJSWWidget().classname === "jsw.widgets.sidebar.SideBarGroup") {
					var all = this.getParent().getChildren();
					var found = null;
					for(var i = 0 ; i!=all.length ;i++) {
						if (all[i] == this) {
							break;
						}
						found = all[i];
					}
					if(found != null){
						found.getEl().after(str);
					} else{
						this.getParent().getEl().after( this.getEl() );
					}
				}
			}
			
			// Adding tooltip to the element
			if (this.getEl() !== null && this.getJSWWidget().getTooltip() !== null) {
				this.getEl().tooltip({
					title: this.getJSWWidget().getTooltip(),
					placement: 'right',
					html: false,
					container: 'body'
				});
			}
			
			this.updateRender();
			
			// Adding additional text to the element
			var childEl = this.getEl().find('a:first');
			if (childEl !== null && this.getJSWWidget().getAdditionalText() !== null) {
				var adText = $(document.createElement('span'))
								.addClass('badge badge-success')
								.html( this.getJSWWidget().getAdditionalText() )
								.appendTo( childEl );
				
				// Set rounded badge if the value is a number, squared in another case
				if (adText !== null && isNaN( adText.text() ) ) {
					adText.addClass('badge-roundless');
				}
				
				if (adText !== null && this.getJSWWidget().getAdditionalTooltip() !== null) {
					adText.tooltip({
						title: this.getJSWWidget().getAdditionalTooltip(),
						placement: 'top',
						html: false,
						container: 'body'
					});
				}
				
				this.updateAdditionalRender();
			}
			
			if (this.getJSWWidget().isSelected()) {
				this.select();
			}
			
			this.getEl().on("click", function( event ) {
				event.preventDefault();
				
				_this.onCommand();
			});
			
			this._renderIsDone();
		},

		select : function() {
			this.base(arguments);
			this.getEl().addClass("active");
			return;
		},

		unselect : function() {
			this.base(arguments);
			this.getEl().removeClass("active");
			return;
		},
		
		updateRender : function() {
			this.textEl.html( this.getJSWWidget().getText() );
			this._updateImage();
			// TODO: Update toolTip
		},
		
		updateAdditionalRender : function() {
			// TODO: Update additional text
			// TODO: Update additional toolTip
		},

		
		_updateImage : function() {
			this.imgEl = renderer.html5.metronic.keyTranslation.setWidgetImage( this.getJSWWidget(), this.aEl );
		}

	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.sidebar.SideBarModuleItem",  {
	create : function() {
		return new renderer.html5.metronic.SideBarModuleItemRenderer();
	}
});

