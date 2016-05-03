
jsw.qx.Class.define( "renderer.html5.base.ExpandableCompositeRenderer", {

	extend : renderer.html5.base.CompositeRenderer,

	members : {
		render : function() {
			this.base( arguments );
		},
		
		_onPropertyChangeEvent : function(evt) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'expandable':
					this._updateExpandable();
					break;
				case 'expanded':
					this._updateExpanded();
					break;
				case 'title':
					this._updateTitle();
					break;
				default:
			}
		},
		
		_updateExpandable : function () {
			return;
			// NOTE: Redefined in specific renderer: metronic, ...
		},
		
		_updateExpanded : function () {
			return;
			// NOTE: Redefined in specific renderer: metronic, ...
		},
		
		_updateTitle : function () {
			return;
			// NOTE: Redefined in specific renderer: metronic, ...
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ExpandableComposite", {
	create : function() {
		return new renderer.html5.base.ExpandableCompositeRenderer();
	}
});
