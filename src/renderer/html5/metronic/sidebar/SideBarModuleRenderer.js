
jsw.qx.Class.define( "renderer.html5.metronic.SideBarModuleRenderer", {

	extend : renderer.html5.base.SideBarModuleRenderer,

	construct : function() {
		this.base( arguments );
		this.imgEl  = null;
		this.textEl = null;
	},

	destruct : function() {
		this.base( arguments );
	},

	members : {
		render : function(){
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
				
				this.aEl = $(document.createElement('a')).addClass('nav-link nav-toggle').appendTo( this.getEl() );
				// Image
				this._updateImage();
				
				this.textEl = $(document.createElement('span')).addClass('title').appendTo( this.aEl );
				
				$(document.createElement('span')).addClass('arrow').appendTo( this.aEl );
				$(document.createElement('ul')).addClass('sub-menu').appendTo( this.getEl() );
								
				// Hide img element if image is not found
				this.imgEl.error(function () { 
				    $(this).css( {visibility: "hidden"} ); 
				});

				if(this.getParent().getJSWWidget().classname === "jsw.widgets.SideBar"){
					this.getParent().getEl().before( this.getEl() );
					
				} else if(this.getParent().getJSWWidget().classname === "jsw.widgets.sidebar.SideBarModule"){
					this.getParent().getEl().find("ul:first").append( this.getEl() );
				} else if(this.getParent().getJSWWidget().classname === "jsw.widgets.sidebar.SideBarGroup"){
					var all = this.getParent().getChildren();
					var found = null;
					for(var i = 0 ; i!=all.length ;i++){
						if(all[i] == this){
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
							
				// Adding tooltip to the element
				if (this.$el !== null && this.getJSWWidget().getTooltip() !== null) {
					this.$el.tooltip({
						title: this.getJSWWidget().getTooltip(),
						placement: 'right',
						html: false,
						container: 'body'
					});
				}
			}
			
			this.updateRender();
			
			// Adding additional text to the element
			var childEl = this.$el.find('a:first');
			if (childEl !== null && this.getJSWWidget().getAdditionalText() !== null) {
				var adText = $(document.createElement('span'))
								.addClass('badge badge-danger')
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
			
			this._renderIsDone();
		},
		
		select : function() {
			this.base(arguments);
			this.$el.addClass("active");
			return;
		},

		unselect : function() {
			this.base(arguments);
			this.$el.removeClass("active");
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

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.sidebar.SideBarModule",  {
	create : function() {
		return new renderer.html5.metronic.SideBarModuleRenderer();
	}
});

