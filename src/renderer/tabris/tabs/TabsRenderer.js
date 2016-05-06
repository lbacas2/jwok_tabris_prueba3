jsw.qx.Class.define( "renderer.tabris.TabsRenderer", {

	construct : function() {
		this.base( arguments );
		
		this.__tabs = [];
	},

	extend : renderer.tabris.ParentWidgetRenderer,

	members : {
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var tabFolder = new tabris.TabFolder({
					id : this.getJSWWidget().getRenderRole(),
					paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
				}).appendTo( parentElem );
				
				this.setEl( tabFolder );
				this.base( arguments );
				
				this.getEl().on( 'change:selection', this.__updateSelectedTab, this );
			}
			
			this._renderIsDone();
		},
		
		__updateSelectedTab : function( tabFolder, tabItem ) {
			/*
			var _this = this;
			this.__options.forEach( function( option ) {
				console.log('   >>>  option.id: ' + option.id + ', id: ' + selOption.id + ' : ' +  (option === selOption) );
				_this.getJSWWidget().getComboItemById( option.id ).setSelected( (option === selOption) );
			});
			*/
			console.log( tabItem.get("title") );
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Tabs", {
	create : function() {
		return new renderer.tabris.TabsRenderer();
	}
});
