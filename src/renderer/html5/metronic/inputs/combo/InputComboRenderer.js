
jsw.qx.Class.define( "renderer.html5.metronic.InputComboRenderer", {

	extend : renderer.html5.base.InputComboRenderer,

	include : renderer.html5.metronic.mixin.InputControlRenderer,

	members : {
		_roTextEl : null,
		
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				if ( elem.attr('data-template') === 'combo' || elem.attr('data-template') === undefined ) {
					// Comprobamos que el elemento en el DOM sea del tipo adecuado
					if (elem.prop("tagName") !== 'SELECT') {
						elem = this.replaceTag( elem, 'select' );
					}
					this.setEl( elem );
					
					// Get ReadOnly alternative widget
					var roRenderRole = this.getJSWWidget().getRenderRole() + '_RO';
					this._roTextEl = this.__locateInTemplate('[data-render-role="' + roRenderRole +'"]');
	
					if ($.fn.selectpicker !== undefined) {
						this.getEl().addClass('show-tick show-menu-arrow')
									.attr({ 
										'data-live-search' : true,
										'data-placeholder' : 'Choose one of the following...'
									});
						// Inicialization of select picker
						this.getEl().selectpicker({container: 'body'});	// Container is mandatory to handle click listener!!

					}
					
					// Save initial value in element data.
					this.getEl().data( 'oldValue', this.getEl().val() );
					
					this.base( arguments );
					this._updateValue();
					this._updateMultipleSelection();
					this._updatePlaceholder();
					this._updateReadOnly();
					
					var _this = this;
					this.getEl().on('change', function() {
						_this.__updateSelectedOptions();
					});
					
					this._renderIsDone();
				}
			}
		},
		
		_onPropertyChangeEvent : function( evt ) {
			if ( evt.property === 'readOnly' || evt.property === 'enabled' ) {
				this.__changeHighlight();
			}
			
			this.base(arguments, evt);
		},
		
		onCreate : function() {
			this.base(arguments);
		},
		
		onDispose : function(evt) {
			if ( this.getEl() !== null ) {
				this.getEl().remove();
				this.setEl( null );
			}
			this.base( arguments, evt );
		},

		select : function() {
			// Do nothing due to select propagation
			return;
		},

		unselect : function() {
			// Do nothing due to unselect propagation 
			return;
		},
		
		_updateValue : function () {
			if ( this.getEl() !== null ) {
				// Update oldValue data.
				this.getEl().data( 'oldValue', this.getEl().val() );
			}
			this.base( arguments );
		},
		
		_updateMultipleSelection : function() {
			if (this.getEl() !== null) {
				var isMultipleSelection = this.getJSWWidget().isMultipleSelection();
				if (typeof isMultipleSelection === "string") { isMultipleSelection = $.parseJSON(isMultipleSelection); }
			
				// Generic definition for standard select widget
				this.getEl().attr('multiple', isMultipleSelection);
			}
		},
		
		__updateSelectedOptions : function() {
			// Getting the old value
			var oldValue = this.getEl().data( 'oldValue' ),
				newValue = this.getEl().val();
			
			// Store the current value on change
			this.getEl().data( 'oldValue', newValue );
			
			if ( $.isArray( newValue ) || this.getEl().val() === null ) {
				var unselected  = $(oldValue).not(newValue).get(),
					newSelected = $(newValue).not(oldValue).get()
				
				$.each( newSelected, function( index, value ) {
					this.getJSWWidget().getComboItemById( value ).setSelected( true );
				});
				$.each( unselected, function( index, value ) {
					this.getJSWWidget().getComboItemById( value ).setSelected( false );
				});
			} else {
				this.getJSWWidget().getComboItemById( this.getEl().val() ).setSelected( true );
			}
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputCombo",  {
	create : function() {
		return new renderer.html5.metronic.InputComboRenderer();
	}
});

