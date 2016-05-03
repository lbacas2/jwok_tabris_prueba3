jsw.qx.Class.define( "renderer.html5.base.TableRowRenderer", {

	extend : renderer.html5.base.WidgetRenderer,
	
	members : {
		render : function(){
			this.base( arguments );
		},
		
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			
			switch (evt.property) {
				case 'texts':
				case 'images':
				case 'backgrounds':
				case 'foregrounds':
				case 'widgets':
					this._updateRowValues();
					break;
				case 'selected': 
					this._updateSelected();
					break;
				case 'checked': 
					this._updateChecked();
					break;
				default:
			}
			return;
		},

	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.table.TableRow", {
	create : function() {
		return new renderer.html5.base.TableRowRenderer();
	}
});