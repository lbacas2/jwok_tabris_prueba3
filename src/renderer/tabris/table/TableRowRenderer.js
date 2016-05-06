jsw.qx.Class.define( "renderer.tabris.TableRowRenderer", {

	construct : function() {
		this.base( arguments );
		
		this.__rowData = {};
		this.__tableRenderer = null;
	},

	extend : renderer.tabris.WidgetRenderer,
	
	members : {
		onDispose : function( evt ) {
			if ( this.getParent() !== null && this.__tableRenderer !== null ) {
				this.__tableRenderer.removeRow( this.__rowData );
			}
			
			this.base( arguments, evt );
		},
		
		render : function() {
			this.__tableRenderer = this.getJSWWidget().getTable().getRenderer();
			
			this._updateRow();
			this._renderIsDone();
		},
		
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			
			// 'widgets', 'selected', 'checked' properties are not supported in Tabris.js implementation
			switch (evt.property) {
				case 'texts':
				case 'images':
				case 'backgrounds':
				case 'foregrounds':
					this._updateRow();
					break;
				default:
			}
			return;
		},

		_updateRow : function() {
			if ( this.getParent() !== null && this.__tableRenderer !== null ) {
				var oldRow = this.__rowData;
				
				// Generate rowData object
				this.__rowData = { 'id': this.getJSWWidget().getInternalId(), 'text': null, 'subtext': null, 'image': null };
				
				var t = 0;
				var texts = this.getJSWWidget().getTexts();
				while ( t < texts.length && this.__rowData.subtext === null ) {
					if ( texts[t] !== null ) {
						if ( this.__rowData.text === null ) {
							this.__rowData.text = texts[t];
						} else {
							this.__rowData.subtext = texts[t];
						}
					}
					t++;
				}
				
				var i = 0;
				var images = this.getJSWWidget().getImages();
				while ( i < images.length && this.__rowData.image === null ) {
					if ( images[i] !== null ) {
						this.__rowData.image = images[i];
					}
					i++;
				}
			
				this.__tableRenderer.removeRow( oldRow );
				this.__tableRenderer.addRow( this.__rowData );
			}
		}

	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.table.TableRow", {
	create : function() {
		return new renderer.tabris.TableRowRenderer();
	}
});