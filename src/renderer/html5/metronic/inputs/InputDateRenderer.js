
jsw.qx.Class.define( "renderer.html5.metronic.InputDateRenderer", {

	extend : renderer.html5.base.InputDateRenderer,
	
	include : renderer.html5.metronic.mixin.InputControlRenderer,

	members : {
		__dateContainerEl  : null,
		__calendarBtnEl    : null,
		__serverDateFormat    : 'YYYY-MM-DD',
		__componentDateFormat : 'dd/mm/yyyy',
		__clientDateFormat    : 'DD/MM/YYYY',
		
		
		getElementBuilderInfo : function() {
			return {
				type  : 'input',
				class : 'hidden',
				attrs : {}
			};
		},
		
		onDispose : function( evt ) {
			if (this.__dateContainerEl !== null) {
				this.__dateContainerEl.remove();
			}
			
			this.base(arguments);
		},
		
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );
				
				if ( jQuery().datepicker ) {
					this.getEl().prop( 'readonly', true ).attr('type', 'text');
					
					// Comprobamos si ya tiene un DIV contenedor o lo creamos
					if ( this.getEl().parent('.input-group.date').length === 0 ) {
						this.getEl().wrap( "<div class='input-group date'></div>" );
					}
					this.__dateContainerEl = this.getEl().parent();
					if ( this.__dateContainerEl.attr('data-date-format') !== undefined && this.__dateContainerEl.attr('data-date-format') !== '' ) {
						this.__componentDateFormat = this.__dateContainerEl.attr('data-date-format');
					} else {
						this.__dateContainerEl.attr('data-date-format', this.__componentDateFormat );
					}
					
					if ( this.__dateContainerEl.find('.date-button').length === 1 ) {
						this._calendarBtnEl = this.__dateContainerEl.find('.date-button');
					} else {
						var spanCalendarButton = $(document.createElement('span'))
								.attr( {'class': 'input-group-btn'})
								.appendTo( this.__dateContainerEl );
			
						this._calendarBtnEl = $(document.createElement('button'))
								.attr({
									'class': 'btn default', 
									'type': 'button'
								})
								.appendTo( spanCalendarButton );
				
						var calendarIcon =  $(document.createElement('i'))
								.attr( {'class': 'fa fa-calendar'})
								.appendTo( this._calendarBtnEl );
					}

					// https://github.com/eternicode/bootstrap-datepicker
					this.__dateContainerEl.datepicker({
					    format:    this.__componentDateFormat,
					    weekStart: 1,
					    todayBtn:  true,
					    language:  "es",
					    autoclose: true,
					    daysOfWeekHighlighted: "0,6",
					    toggleActive: true,
					    todayHighlight: true
					});
				}
				
				this.base(arguments);
		
				this._renderIsDone();
			}
		},
		
		_onPropertyChangeEvent : function( evt ) {
			if ( evt.property === 'readOnly' || evt.property === 'enabled' ) {
				this.__changeHighlight();
			}
			
			this.base(arguments, evt);
		},
		
		// @Override
		_updateValue : function () {
			if ( this.getEl() !== null ) {
				var value = moment( this.getJSWWidget().getValue() || '', this.__serverDateFormat );
				var formattedValue = '';
				
				if ( value.isValid() ) {
					if ( $.isArray(this.__clientDateFormat) && this.__clientDateFormat.length > 0 ) {
						formattedValue = value.format( this.__clientDateFormat[0] );
					} else {
						formattedValue = value.format( this.__clientDateFormat );
					}					
				}
				this.getEl().attr( 'value', formattedValue );
			}
		},
		
		// @Override
		_updateReadOnly : function () {
			var readOnly = this.getJSWWidget().isReadOnly();
			var disabled = readOnly || !this.getJSWWidget().isEnabled();
			
			if ( this.getEl() !== null ) {
				this.getEl().prop( 'readonly', readOnly );
			}
			if ( this.getEl() !== null && this._calendarBtnEl !== null ) {
				this._calendarBtnEl.prop( 'disabled', disabled );
			}
		},
		
		_updateVisible : function() {
			this.base( arguments );
			
			if ( this.getEl() !== null && this._calendarBtnEl !== null ) {
				if ( this.getJSWWidget().isVisible() ) {
					this.__dateContainerEl.removeClass('hidden');
				} else {
					this.__dateContainerEl.addClass('hidden');
				}
			}
		},
		
		_updateEnabled : function() {
			this.base( arguments );
			
			if ( this.getEl() !== null && this._calendarBtnEl !== null ) {
				// Gestionamos la propiedad enabled
				this._calendarBtnEl.prop( 'disabled', !this.getJSWWidget().isEnabled() );
				if ( this.getJSWWidget().isEnabled() ) {
					this._calendarBtnEl.removeAttr('disabled');
				} else {
					this._calendarBtnEl.attr('disabled', true );
				}
			}
		},
		
		// @Override
		_updateWidgetValue : function( event ) {
			var _this = event.data.renderer;
			var value = moment( _this.getEl().val(), _this.__clientDateFormat );
			
			if ( value.isValid() ) {
				_this.getJSWWidget().setValue( value.format( _this.__serverDateFormat ) );
			}
		}
	}
} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputDate",  {
	create : function() {
		return new renderer.html5.metronic.InputDateRenderer();
	}
});

