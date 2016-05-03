jsw.qx.Class.define( "renderer.html5.base.TableColumnRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	construct : function() {
		this.base( arguments );
		
		this._imgEl  = null;
		this._textEl = null;
	},


	members : {
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			
			switch (evt.property) {
				case 'text':
					this._updateText();
					break;
				case 'image':
					this._updateImage();
					break;
				case 'visible':
					this._updateVisible();
					break;
				case 'sortable':
					this._updateSortable();
					break;
				default:
			}
		},
		
		_updateText : function () {
			return;
			// NOTE: Redefined in specific renderer: metronic, ...
		},
		
		_updateImage : function () {
			return;
			// NOTE: Redefined in specific renderer: metronic, ...
		},
		
		_updateVisible : function () {
			return;
			// NOTE: Redefined in specific renderer: metronic, ...
		},
		
		_updateSortable : function () {
			return;
			// NOTE: Redefined in specific renderer: metronic, ...
		},

	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.table.TableColumn", {
	create : function() {
		return new renderer.html5.base.TableColumnRenderer();
	}
});