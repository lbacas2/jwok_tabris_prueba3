
jsw.qx.Class.define( "renderer.html5.metronic.InputDateRangeRenderer", {

	extend : renderer.html5.base.InputDateRangeRenderer,
	
	include : renderer.html5.metronic.mixin.InputControlRenderer,

	members : {
		__drp : null,
		
		__dateContainerEl : null,
		__calendarBtnEl   : null,
		__cleanBtnEl      : null,
		
		__serverDateFormat : 'yyyy-mm-dd',
		__dateFormat       : 'dd-mm-yyyy',
		__dateSeparator    : ' - ',
		
		
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
				// Save the object for later access to their properties)
				var _this = this;
				
				if ( jQuery().daterangepicker ) {
					this.getEl().prop( 'readonly', true ).attr('type', 'text');
					
					// Comprobamos si ya tiene un DIV contenedor o lo creamos
					if ( this.getEl().parent('.input-group').length === 0 ) {
						this.getEl().wrap( "<div class='input-group'></div>" );
					}
					this.__dateContainerEl = this.getEl().parent();
					if ( this.__dateContainerEl.attr('data-date-format') !== undefined && this.__dateContainerEl.attr('data-date-format') !== '' ) {
						this.__dateFormat = this.__dateContainerEl.attr('data-date-format');
					} else {
						this.__dateContainerEl.attr('data-date-format', this.__dateFormat );
					}
					
					// Calendar button
					if ( this.__dateContainerEl.find('.date-button').length === 1 ) {
						this.__calendarBtnEl = this.__dateContainerEl.find('.date-button');
					} else {
						var spanCalendarButton = $(document.createElement('span'))
								.attr( {'class': 'input-group-btn'})
								.appendTo( this.__dateContainerEl );
			
						this.__calendarBtnEl = $(document.createElement('button'))
								.attr({
									'class': 'btn default', 
									'type': 'button'
								})
								.appendTo( spanCalendarButton );
				
						var calendarIcon =  $(document.createElement('i'))
								.attr( {'class': 'fa fa-calendar'})
								.appendTo( this.__calendarBtnEl );
					}

					// Clean button
					if ( this.__dateContainerEl.find('.clean-button').length === 1 ) {
						this.__cleanBtnEl = this.__dateContainerEl.find('.clean-button');
						
						this.__cleanBtnEl.on('click', function(e) {
							e.stopPropagation();
							
							_this.getJSWWidget().setValue( [null, null] );
							_this.getEl().val('');
						});
					}
					
					// https://github.com/dangrossman/bootstrap-daterangepicker
					var ranges = {
		                    'Today':        [moment(), moment()],
		                    'Yesterday':    [moment().subtract('days', 1), moment().subtract('days', 1)],
		                    'Last 7 Days':  [moment().subtract('days', 6), moment()],
		                    'Last 30 Days': [moment().subtract('days', 29), moment()],
		                    'This Month':   [moment().startOf('month'), moment().endOf('month')],
		                    'Last Month':   [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
				    };
			        //daysOfWeek:  ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			        //monthNames:  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

					var localeInfo = {
							format:      this.__dateFormat.toUpperCase(),
						    separator:   this.__dateSeparator,
					        applyLabel:  "Apply",
					        cancelLabel: "Cancel",
					        fromLabel:   "From",
					        toLabel:     "To",
					        customRangeLabel: "Custom",
					        daysOfWeek:  ["D", "L", "M", "X", "J", "V", "S"],
					        monthNames:  ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
					        firstDay:    1
					}; 
					
					var options = {
						    autoApply: 		 true,
						    showDropdowns: 	 this.getJSWWidget().getShowMonthYearSelector() || false,
						    linkedCalendars: this.getJSWWidget().isLinkedCalendars() || true,
//						    ranges: 		 ranges,
//						    locale: 		 localeInfo,
						    buttonClasses: 	 "btn btn-sm",
						    alwaysShowCalendars: true
					};
					if ( this.getJSWWidget().getMinDate() !== '' ) {
						options.minDate = this.getJSWWidget().getMinDate();
					}
					if ( this.getJSWWidget().getMaxDate() !== '' ) {
						options.maxDate = this.getJSWWidget().getMaxDate();
					}	

					this.__dateContainerEl.daterangepicker( options );	
					this.__drp = this.__dateContainerEl.data('daterangepicker');
				}
				
				this.base(arguments);
				
				if ( this.__drp !== null ) {
					this.removeInputControlListeners();
					
					this.__dateContainerEl.on('apply.daterangepicker', function(ev, picker) {
						_this.getJSWWidget().setValue( [picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD')] );
					});
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
		
		// @Override
		_updateValue : function () {
			if ( this.getEl() !== null ) {
				var start = '', 
					end   = '';
				
				if ( this.getJSWWidget().getStartDate() !== null) {
					start = this.getJSWWidget().getStartDate() || '';
					start = renderer.utils.dateUtil.convertDateFormat( start , this.__serverDateFormat.toUpperCase(), this.__dateFormat.toUpperCase() );
				}
				if ( ( this.getJSWWidget().getEndDate() !== null) ) {
					end = this.getJSWWidget().getEndDate() || '';
					end = renderer.utils.dateUtil.convertDateFormat( end ,   this.__serverDateFormat.toUpperCase(), this.__dateFormat.toUpperCase() );
				}
				
				// Si existe DateRangePicker
				if ( this.__drp !== null ) {
					if ( start !== '' ) {
						this.__drp.setStartDate( start );
					}
					if ( end !== '' ) {
						this.__drp.setEndDate( end );
					}
					// Imitate autoUpdate for dateRangePicker on non-input element.
					if ( start !== '' || end !== '' ) {
						var startDate = moment( start, this.__dateFormat.toUpperCase() ),
							endDate   = moment( end, this.__dateFormat.toUpperCase() );
						this.getEl().val( startDate.format( this.__dateFormat.toUpperCase() ) + this.__dateSeparator + endDate.format( this.__dateFormat.toUpperCase() ) );
						this.getEl().trigger('change');
					}
	                
				// Si no existe DateRangePicker
				} else {
					if ( start === '' && end === '' ) {
						value = ''
					} else {
						if ( start !== '' && end === '' ) {
							end = start;
						} else if ( start === '' && end !== '' ) {
							start = end;
						}
						value = start + ' - ' + end;
					}
					this.getEl().attr( 'value', value );
				}
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
		
		// @Override
		_updateEnabled : function() {
			this._updateReadOnly( arguments );
		},
		
		// @Override
		_updateWidgetValue : function( event ) {
			var _this = event.data.renderer;
			var value = _this.getEl().val().split(' - ');
			if ( value.lenth >= 2 ) {
				var start = renderer.utils.dateUtil.convertDateFormat( value[0], _this.__dateFormat.toUpperCase(), _this.__serverDateFormat.toUpperCase() );
				var end   = renderer.utils.dateUtil.convertDateFormat( value[1], _this.__dateFormat.toUpperCase(), _this.__serverDateFormat.toUpperCase() );
				
				_this.getJSWWidget().setValue( [start, end] );
			}
		},

	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputDateRange",  {
	create : function() {
		return new renderer.html5.metronic.InputDateRangeRenderer();
	}
});

