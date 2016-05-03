
jsw.qx.Class.define( "renderer.html5.base.InputComboRenderer", {

	extend : renderer.html5.base.ParentWidgetRenderer,

	members : {
		getElementBuilderInfo : function() {
			return {
				type  : 'select',
				class : 'hidden',
				attrs : {}
			};
		},
		
		select : function() {
			return;
		},

		unselect : function() {
			return;
		},
		
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			
			switch (evt.property) {
				case 'value':
					this._updateValue();
					break;
				case 'placeholder':
					this._updatePlaceholder();
					break;
				case 'readOnly':
					this._updateReadOnly();
					break;
				case 'multipleSelection':
					this._updateMultipleSelection();
					break;
				case 'searchEnabled':
					break;
				default:
			}
			return;
		},
		
		_updateValue : function () {
			if (this.getEl() !== null) {
				this.getEl().val(this.getJSWWidget().getValue());
			}
		},
		
		_updatePlaceholder : function () {
			if (this.getEl() !== null) {
				this.getEl().attr('placeholder', this.getJSWWidget().getPlaceHolder() );
			}
		},
		
		_updateReadOnly : function () {
			if (this.getEl() !== null) {
				this.getEl().prop('readonly', this.getJSWWidget().isReadOnly() );
			}
		},
		
		_updateMultipleSelection : function() {
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputCombo", {
	create : function() {
		return new renderer.html5.base.InputComboRenderer();
	}
});
