jsw.qx.Class.define( "renderer.tabris.TableRenderer", {

	extend : renderer.tabris.ParentWidgetRenderer,

	construct : function() {
		this.base( arguments );
		this.__rows = [];
	},
	
	members : {
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var elem = new tabris.CollectionView({
					layoutData: {left: 0, top: 0, right: 0, bottom: 0},
					itemHeight: ( device.platform === "iOS" ? 40 : 48 ),
					initializeCell: function( cell ) {
						var imageView = new tabris.ImageView({
							layoutData: {left: 10, centerY: 0, width:32, height: 48},
							scaleMode: 'fit'
						}).appendTo( cell );
						var textView = new tabris.TextView({
							layoutData: {left: 64, right: 16, top: 16},
							markupEnabled: true,
							textColor: "#4a4a4a"
						}).appendTo( cell );
						var subtextView = new tabris.TextView({
							layoutData: {left: 64, right: 16, top: [textView, 4]},
							textColor: "#7b7b7b"
						}).appendTo( cell );
						cell.on("change:item", function(widget, row ) {
							imageView.set( 'image', row.image );
							textView.set( 'text', item.text );
							subtextView.set( 'text', item.subtext );
						});
					}
				}).appendTo( parentElem );

				this.setEl( elem );
				this.base( arguments );
				
				this.getEl().on( 'select', this.__updateSelectedRow, this );
			}
			
			this._renderIsDone();
		},
		
		addRow : function( data ) {
			if ( this.getEl() !== null && data && typeof data.id !== 'undefined' && typeof data.text !== 'undefined' && typeof data.image !== 'undefined' ) {
				//this.__rows.push ( data );
				//this.redraw();
				this.getEl().insert( data );
			}
		},
		
		removeRow : function( data ) {
			if ( this.getEl() !== null && data && typeof data.id !== 'undefined' && typeof data.text !== 'undefined' && typeof data.image !== 'undefined' ) {
				var index = this.getEl().get( 'items ').indexOf( data );
				if (index != -1 ) {
					//this.__rows.splice( index, 1 );
					//this.redraw();
					this.getEl().remove( index );
				}
			}
		},
		
		redraw : function () {
			if ( this.getEl() !== null ) {
				//this.getEl().set( 'items', this.__rows );
				this.getEl().refresh();
			}
		},

		__updateSelectedRow : function( sideBar, selRow ) {
			var _this = this;
			this.__rows.forEach( function( row ) {
				_this.getJSWWidget().getRowByInternalId( row.id ).setSelected( (row === selRow) );
			});
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Table", {
	create : function() {
		return new renderer.tabris.TableRenderer();
	}
});