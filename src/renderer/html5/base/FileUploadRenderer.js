
jsw.qx.Class.define( "renderer.html5.base.InputFileUploadRenderer", {

	extend : renderer.html5.base.InputControlRenderer,

	members : {
		getElementBuilderInfo : function() {
			return {
				type  : 'input',
				class : 'hidden',
				attrs : {
					'type': 'file'
				}
			};
		},
		
		render : function() {
			this.base( arguments );
			
			// Initializate control: Set value, readOnly and placeholder properties.
			this.init();
		},
		
		
		_onPropertyChangeEvent : function( event ) {
			this.base( arguments, event );
			
			switch ( event.property ) {
				case 'label':
				case 'link':
					this._updateLabelAndLink();
					break;
				case 'maxSize':
					this._updateMaxSize();
					break;
				case 'uploadUrl':
					this._updateUploadUrl();
					break;
				default:
			}
		},
		
		/*
		 * Los elementos HTML input de tipo File no permite asignar un valor mediante código a excepción 
		 * de la cadena vacía por temas de seguridad.
		 */
		// @Override
		_updateValue : function() {
			strValue = this.getJSWWidget().getValue();
			if (this.getEl() !== null && (strValue === null || strValue === '') ) {
				this.getEl().val( '' );
			}
		},
		
		_updateLabelAndLink : function() {
			return;
		},
		
		_updateMaxSize : function() {
			return;
		},
		
		_updateUploadUrl : function() {
			return;
		}, 
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.FileUpload", {
	create : function() {
		return new renderer.html5.base.InputFileUploadRenderer();
	}
});
