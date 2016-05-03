
jsw.qx.Class.define( "renderer.html5.metronic.InputTextAreaRenderer", {

	extend : renderer.html5.base.InputTextAreaRenderer,

	include : renderer.html5.metronic.mixin.InputControlRenderer,

	members : {
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );
				
				var _this = this;
				this.base(arguments);
				
				if ( this.getJSWWidget().isRichText() && typeof CKEDITOR !== 'undefined' && CKEDITOR !== undefined ) {
					// *** USING CKEDITOR ***
					this.getEl().addClass('ckeditor');
					
					// Remove default InputControl listeners
					this.removeInputControlListeners();
					// Add onBlur listener for CKEditor
					var editor = CKEDITOR.replace( this.getEl() );
					editor.on('blur', function() { 
						if ( this.checkDirty() ) {
							_this.getJSWWidget().setValue( _this.getEl().val() );
		    				this.resetDirty();
		    		 	}
		     		});
				}
				
				this._renderIsDone();
			}
		},

		onDispose : function(evt) {
			this.base(arguments, evt);
			try {
				if ( this.getJSWWidget().isRichText() && CKEDITOR.instances[this.getJSWWidget().getRenderRole()] !== undefined) {
					CKEDITOR.instances[this.getJSWWidget().getRenderRole()].destroy();
				}
			} catch (e) {
			}
		},
		
		_onPropertyChangeEvent : function( evt ) {
			if ( evt.property === 'readOnly' || evt.property === 'enabled' ) {
				this.__changeHighlight();
			}
			
			this.base(arguments, evt);
		},
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputTextArea",  {
	create : function() {
		return new renderer.html5.metronic.InputTextAreaRenderer();
	}
});

