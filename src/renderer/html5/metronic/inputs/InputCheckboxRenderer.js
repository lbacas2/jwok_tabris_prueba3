
jsw.qx.Class.define( "renderer.html5.metronic.InputCheckboxRenderer", {

	extend : renderer.html5.base.InputCheckboxRenderer,
	
	include : renderer.html5.metronic.mixin.InputControlRenderer,

	members : {
		__wrapper : null,
		__textLabelEl : null,
		__wrappingLabelEl : null,
		
		
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );
				
				// Creamos el span para el texto.
				this.__textLabelEl = $('<span>').addClass('title');
				
				// Wrapping label
				this.getEl().wrap('<label><span></span></label>');
				this.__wrappingLabelEl = this.getEl().closest('label');
				this.__wrappingLabelEl.append( this.__textLabelEl );

				//Label Style
				var labelClass = this.getEl().attr('data-label-class');
				this.getEl().removeAttr('data-label-class');
				if (labelClass === 'inline') {
					this.__wrappingLabelEl.attr({ class : 'checkbox-inline' });
				}
				// Checkbox properties
				this.getEl().attr({ type : 'checkbox' });

				this.base( arguments );
				this._updateLabel();
				 
				// Checkbox Template
				var templateStyle = this.getEl().attr('data-template-style');
				this.getEl().removeAttr('data-template-style');

				// Add UniformJS/material design support
				 if (templateStyle === 'material') {
					 // TODO: set Material design style
					 
				 } else if ( (templateStyle === 'uniform' || templateStyle === undefined) && $().uniform) {
					this.__wrapper = 'uniform';
					this.getEl().uniform();
				}
				
				this._renderIsDone();
			}
		},
		
		_onPropertyChangeEvent : function( evt ) {
			if ( evt.property === 'readOnly' || evt.property === 'enabled' ) {
				this.__changeHighlight();
			}
			
			this.base(arguments, evt);
		},
		
		// @override
		_updateEnabled : function () {
			if (this.getEl() !== null) {
				var disabled = !this.getJSWWidget().isEnabled() || this.getJSWWidget().isReadOnly();
				
				this.getEl().prop( 'disabled', disabled );
				if (this.__wrapper === 'uniform') {
					$.uniform.update( this.getEl() );
				}
			}
		},
		
		// @override
		_updateReadOnly : function () {
			if (this.getEl() !== null) {
				var readOnly = this.getJSWWidget().isReadOnly();
				var disabled = !this.getJSWWidget().isEnabled() || readOnly;
				
				this.getEl().prop( 'readonly', readOnly );
				this.getEl().prop( 'disabled', disabled );
				if (this.__wrapper === 'uniform') {
					$.uniform.update( this.getEl() );
				}
			}
		},
		
		// @override
		_updateValue : function () {
			this.getEl().prop('checked', this.getJSWWidget().isChecked() );
			if (this.__wrapper === 'uniform') {
				$.uniform.update( this.getEl() );
			}
		},
		
		_updateLabel : function () {
			if (this.__textLabelEl !== null) {
				this.__textLabelEl.text( this.getJSWWidget().getLabel() );
			}
		},
		
		// @override ( InputControlRenderer )
		_updateWidgetValue : function( event ) {
			var _this = event.data.renderer;
			_this.getJSWWidget().setValue( _this.getEl().prop('checked') );
		}

	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputCheckbox",  {
	create : function() {
		return new renderer.html5.metronic.InputCheckboxRenderer();
	}
});

