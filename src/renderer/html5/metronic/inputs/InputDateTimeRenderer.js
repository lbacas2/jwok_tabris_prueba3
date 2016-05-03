
jsw.qx.Class.define( "renderer.html5.metronic.InputDateTimeRenderer", {

	extend : renderer.html5.base.InputDateTimeRenderer,
	
	include : renderer.html5.metronic.mixin.InputControlRenderer,

	members : {
		__dateContainerEl  : null,
		__calendarBtnEl    : null,
		__cleanBtnEl       : null,
		
		__componentDateFormat : 'dd/mm/yyyy hh:ii',
		__clientDateFormat    : ['DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY HH:mm'],
		__serverDateFormat    : 'YYYY-MM-DD HH:mm:ss',
		
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
				
				if ( jQuery().datetimepicker ) {
					this.getEl().prop( 'readonly', true ).attr('type', 'text');
					
					// Comprobamos si ya tiene un DIV contenedor o lo creamos
					if ( this.getEl().parent('.input-group.date').length === 0 ) {
						this.getEl().wrap( "<div class='input-group date'></div>" ); // Clase 'date' es necesaria
					}
					this.__dateContainerEl = this.getEl().parent();
					if ( this.__dateContainerEl.attr('data-date-format') !== undefined && this.__dateContainerEl.attr('data-date-format') !== '' ) {
						this.__componentDateFormat = this.__dateContainerEl.attr('data-date-format');
					} else {
						this.__dateContainerEl.attr('data-date-format', this.__componentDateFormat );
					}
					
					if ( this.__dateContainerEl.find('.date-set').length === 1 ) {
						this.__calendarBtnEl = this.__dateContainerEl.find('.date-set');
					} else {
						var spanCalendarButton = $(document.createElement('span'))
								.attr( {'class': 'input-group-btn'})
								.appendTo( this.__dateContainerEl );
			
						this.__calendarBtnEl = $(document.createElement('button'))
								.attr( {'class': 'btn default date-set', 'type': 'button'} )
								.appendTo( spanCalendarButton );
						// Clase 'date-set' es necesaria
				
						var calendarIcon =  $(document.createElement('i'))
								.attr( {'class': 'fa fa-calendar'})
								.appendTo( this.__calendarBtnEl );
					}
					
					// Clean button
					if ( this.__dateContainerEl.find('.date-reset').length === 1 ) {
						this.__cleanBtnEl = this.__dateContainerEl.find('.date-reset');
					}

					var isRTL = false; // App.isRTL()
					// http://www.malot.fr/bootstrap-datetimepicker
					this.__dateContainerEl.datetimepicker({
			            isRTL          : isRTL,
			            format         : this.__componentDateFormat,
			            autoclose      : true,
			            todayBtn       : true,
			            pickerPosition : (isRTL ? "bottom-right" : "bottom-left"),
			            minuteStep     : 5,
			            language       : 'en',
			            fontAwesome    : true
			        });
					
					var _this = this;
					this.__dateContainerEl.on('click', function( event ) {
						if ( _this.getJSWWidget().isReadOnly() || !_this.getJSWWidget().isEnabled() ) {
							event.preventDefault();
							event.stopPropagation();
						}
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
				this.getEl().prop( 'disabled', disabled );
				
				if ( this.__calendarBtnEl !== null ) {
					this.__calendarBtnEl.prop( 'disabled', disabled );
				}
				if ( this.__cleanBtnEl !== null ) {
					this.__cleanBtnEl.prop( 'disabled', disabled );
				}
			}
		},
		
		_updateVisible : function() {
			this.base( arguments );
			
			if ( this.getEl() !== null && this.__calendarBtnEl !== null ) {
				if ( this.getJSWWidget().isVisible() ) {
					this.__dateContainerEl.removeClass('hidden');
				} else {
					this.__dateContainerEl.addClass('hidden');
				}
			}
		},
		
		_updateEnabled : function() {
			this._updateReadOnly( arguments );
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
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputDateTime",  {
	create : function() {
		return new renderer.html5.metronic.InputDateTimeRenderer();
	}
});

