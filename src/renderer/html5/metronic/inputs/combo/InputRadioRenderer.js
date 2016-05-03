
jsw.qx.Class.define( "renderer.html5.metronic.InputRadioRenderer", {

	extend : renderer.html5.metronic.InputComboRenderer,

	include : renderer.html5.metronic.mixin.InputControlRenderer,
	
	members : {
		render : function() {
			var elem = this.__locateInTemplate();
			if (elem !== null && elem.attr('data-template') === 'radio-list' ) {
				this.setEl( elem );
				
				this.base(arguments);
				
				this.isMultipleSelection = this.getJSWWidget().isMultipleSelection();
				if (typeof this.isMultipleSelection === "string") { this.isMultipleSelection = $.parseJSON(this.isMultipleSelection); }
				
				// Remove data-template attribute form DOM element
				this.getEl().removeAttr('data-template');
				
				// Fill radio-list widget with options
				this._createRadioChilds( this.getJSWWidget(), this.getEl() );
				
				// Add class to radio group and add a listener to change the value when the selection is changed
				var _this = this;
				this.getEl().addClass('radio-list')
						.change('option', function() {
							
							if ( _this.isMultipleSelection === true ) {
								// If isMultipleSelection is enabled, send unselect events too
								 _this.getEl().find('input:radio').each(function( index, item ) {
									 _this.getJSWWidget().getComboItemById( item.value ).setSelected( false );
								});
							}
							
							var internalId = _this.getEl().find('input:radio').filter(":checked").first().val();
							_this.getJSWWidget().getComboItemById( internalId ).setSelected( true );
						});
				
				
				var templateStyle = this.$el.attr('data-template-style');
				this.getEl().removeAttr('data-template-style');
				
				// Add UniformJS / material design style support
				var inputs = this.$el.find("input[type=radio]:not(.toggle, .md-check, .md-radiobtn, .star, .make-switch, .icheck)");
				if (templateStyle === 'material') {
					// TODO : No hay un plugin que genere la estructura en material design.
					//        La solución más óptima sería buscar un alibreria (como uniform) que generase la 
					//        estructura definida en Metronic para Material Design
					
				} else if ( (templateStyle === 'uniform' || templateStyle === undefined) && $().uniform) {
			        if (inputs.size() > 0) {
			        	inputs.each(function() {
			                if ($(this).parents(".checker").size() === 0) {
			                    $(this).show();
			                    $(this).uniform();
			                }
			            });
			        }
		        }
				
				this._renderIsDone();
				
			} else {
				// Por la forma particular por como están extendidos los renderer de InputRadio y de InputCombo del mismo
				// widget hay que lanzar este mecanismo junto con el workaround de la clase.
				this.base( arguments );
			}
		},
		
		_onPropertyChangeEvent : function( evt ) {
			if ( evt.property === 'readOnly' || evt.property === 'enabled' ) {
				this.__changeHighlight();
			}
			
			this.base(arguments, evt);
		},
		
		_createRadioChilds : function( widget, domElem ) {
			var children   = widget.getChildren(),
				role 	   = this.getJSWWidget().getRenderRole(),
				labelClass = this.$el.attr('data-label-class'),
				radioClass = this.$el.attr('data-radio-class'),
				label, 
				option, 
				i;
			
			// Remove data-*-class attributes form DOM element
			domElem.removeAttr('data-label-class').removeAttr('data-radio-class');
			
			for (i = 0; i < children.length; i++) {
				if (children[i].classname === 'jsw.widgets.inputcombo.InputComboOption') {
					// Sanitize boolean data
					var isSelected = children[i].isSelected();
					var isDisabled = children[i].isDisabled();
					if (typeof isSelected === "string") { isSelected = $.parseJSON(isSelected); }
					if (typeof isDisabled === "string") { isDisabled = $.parseJSON(isDisabled); }
					
					label = $(document.createElement('label'))
									.addClass(labelClass)
									.html( ' ' + children[i].getText() + ' ' )
									.appendTo( domElem );
					
					option = $(document.createElement('input'))
									.attr({
										'type':  'radio',
										'name':  role,
										'id':    role + '_' + children[i].getInternalId(),
										'value': children[i].getInternalId()
									})
									.addClass(radioClass)
									.prependTo( label );
					
					option.prop("checked", isSelected);
					option.prop("disabled", isDisabled);
				}
			} 
		},
		
		select : function(){
			// Do nothing due to select propagation
			return;
		},

		unselect : function(){
			// Do nothing due to unselect propagation 
			return;
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputCombo",  {
	create : function() {
		return new renderer.html5.metronic.InputRadioRenderer();
	}
});

