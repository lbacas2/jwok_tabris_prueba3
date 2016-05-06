
jsw.qx.Class.define( "renderer.tabris.SideBarRenderer", {

	construct : function() {
		this.base( arguments );
		
		this.__items = [];
	},
	
	extend : renderer.tabris.ParentWidgetRenderer,

	members : {
		render : function() {
			new tabris.Drawer();	// tabris.ui.drawer
			
			var elem = new tabris.CollectionView({
				layoutData: {left: 0, top: 0, right: 0, bottom: 0},
				itemHeight: ( device.platform === "iOS" ? 40 : 48 ),
				initializeCell: function( cell ) {
					var composite = new tabris.Composite({
						layoutData: {left: 0, right: 0, bottom: 0, height: 1},
						background: "#bbb"
					}).appendTo( cell );
					var imageView = new tabris.ImageView({
						layoutData: {left: 10, top: 10, bottom: 10}
					}).appendTo( cell );
					var textView = new tabris.TextView({
						layoutData: {left: 50, centerY: 0},
						font: ( device.platform === "iOS" ? "17px .HelveticaNeueInterface-Regular" : "14px Roboto Medium" ),
						textColor: ( device.platform === "iOS" ? "rgb(22, 126, 251)" : "#212121" )
					}).appendTo( cell );
					cell.on("change:item", function( widget, item ) {
						imageView.set( 'image', item.image );
						textView.set( 'text', item.text );
						
						if ( item.leaf === true ) {
							imageView.set( 'left', 40 );
							textView.set( 'left', ( item.image === null ? 50 : 80) );
						} else {
							cell.set( 'background', '#666' );
							cell.set( 'textColor',  '#eee' );
							textView.set( 'left', ( item.image === null ? 10 : 50) );
						}
					});
				}
			}).appendTo( tabris.ui.drawer );

			this.setEl( elem );
			this.base( arguments );
			
			this.getEl().on( 'select', this.__updateSelectedItem, this );
			
			this._renderIsDone();
		},
		
		addItem : function( data ) {
			if ( data && typeof data.id !== 'undefined' && typeof data.text !== 'undefined' && typeof data.image !== 'undefined' ) {
				this.__items.push ( data );
				this.redraw();
			}
		},
		
		removeItem : function( data ) {
			if ( data && typeof data.id !== 'undefined' && typeof data.text !== 'undefined' && typeof data.image !== 'undefined' ) {
				var index = this.__items.indexOf( data );
				if (index != -1 ) {
					this.__items.splice( index, 1 );
					this.redraw();
				}
			}
		},
		
		redraw : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'items', this.__items );
			}
		},
		
		/*
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			
			switch (evt.property) {
				case 'selectedItem':
					this._onSelectedItemPropertyChangeEvent( evt );
					break;
				default:
			}
			return;
		},
		*/
		
		__updateSelectedItem : function( sideBar, selItem ) {
			if ( selItem.leaf === true ) {
				var item = this.getJSWWidget().getSideBarItemById( selItem.id );
				if ( item !== null && typeof item.command === 'function' ) {
					item.command();
				}
			}
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.SideBar", {
	create : function() {
		return new renderer.tabris.SideBarRenderer();
	}
});


