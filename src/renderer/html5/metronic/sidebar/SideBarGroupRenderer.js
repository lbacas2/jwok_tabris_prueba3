
jsw.qx.Class.define( "renderer.html5.metronic.SideBarGroupRenderer", {

	extend : renderer.html5.base.SideBarGroupRenderer,

	construct : function() {
		this.base( arguments );
		this.childEl = null;
	},

	destruct : function() {
		this.base( arguments );
	},

	members : {
		render : function() {
			this.setEl( $(document.createElement('li'))
							.attr( {'data-id': 'sideBar_'+ this.getJSWWidget().getInternalId(), 'class': 'heading'})
							.insertBefore( this.getParent().getEl() )
					  );
			this.childEl = $(document.createElement('h3')).addClass( 'uppercase' ).appendTo( this.getEl() );
			
			// Adding tooltip to the element
			if (this.getEl() !== null && this.getJSWWidget().getTooltip() !== null) {
				this.getEl().tooltip({
					title: this.getJSWWidget().getTooltip(),
					placement: 'auto right',
					html: false,
					container: 'body'
				});
			}
			
			this.base(arguments);
			this.updateRender();
			
			// Adding additional text to the element
			if (childEl !== null && this.getJSWWidget().getAdditionalText() !== null) {
				var adText = $(document.createElement('span'))
								.addClass('badge badge-roundless badge-warning')
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
		
		updateRender : function() {
			this.childEl.html( this.getJSWWidget().getText() );
			// TODO: Update toolTip
		},
		
		updateAdditionalRender : function() {
			// TODO: Update additional text
			// TODO: Update additional toolTip
		}

	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.sidebar.SideBarGroup",  {
	create : function() {
		return new renderer.html5.metronic.SideBarGroupRenderer();
	}
});

