jsw.qx.Class.define( "renderer.html5.base.TableRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	construct : function() {
		this.base( arguments );
		this._colRenderers = [];
	},
	
	members : {
		setColumnRenderer : function( index, renderer ) {
			if ( !isNaN(index) && index >= 0 ) {
				this._colRenderers[ index ] = renderer;
			}
		},
		
		getColumnRenderers : function() {
			return this._colRenderers;
		},
		
		selectRow : function( rowEl ) {
			var row = this.getRowByEl( rowEl );
			if (row !== null) {
				this._runBlockerCommand( row, row.setSelected, [ true ] );
				//row.setSelected( true );
			}
		},

		unselectRow : function( rowEl ) {
			var row = this.getRowByEl( rowEl );
			if (row !== null) {
				this._runBlockerCommand( row, row.setSelected, [ false ] );
				//row.setSelected( false );
			}
		},
		
		checkRow : function( rowEl ) {
			var row = this.getRowByEl( rowEl );
			if (row !== null) {
				row.setChecked( true );
			}
		},

		uncheckRow : function( rowEl ) {
			var row = this.getRowByEl( rowEl );
			if (row !== null) {
				row.setChecked( false );
			}
		},
		
		getRowByEl : function( rowEl ) {
			var id = parseInt( rowEl.attr('data-id') );
			
			return this.getJSWWidget().getRowByInternalId( id );
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Table", {
	create : function() {
		return new renderer.html5.base.TableRenderer();
	}
});