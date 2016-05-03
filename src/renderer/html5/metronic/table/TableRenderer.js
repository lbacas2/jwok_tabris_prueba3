
jsw.qx.Class.define( "renderer.html5.metronic.TableRenderer", {

	extend : renderer.html5.base.TableRenderer,
	
	include : renderer.html5.base.mixin.AsyncWidgetRenderer,

	construct : function() {
		this.base( arguments );
		this._DataTable = null;
		this._tableEl = null;
		this._dirty = true;
		
		this.__baseArguments = null;
	},

	members : {
		render : function() {
			var _this  = this;
			var widget = this.getJSWWidget();
			
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this._tableEl = elem;
				
				// Create table structure
				this._createHeader( widget, this._tableEl );
				this._createFooter( widget, this._tableEl );
				this._createBody( widget,   this._tableEl );
				
				var useDataTables = (this._tableEl.attr('data-style') || 'expanded') !== 'plain';		// 'plain' or 'rich'
				var fixedColumns  = this._tableEl.attr('data-fixed-columns') || widget.getFixedColumns();
				
				// [[ 1, 'asc' ]]
// TODO
				var dataOrder = this._tableEl.attr('data-order') || [];
				
				if ( useDataTables && this._tableEl.DataTable !== undefined ) {
					this._tableEl.addClass('table table-hover table-striped table-bordered table-condensed nowrap');
					
					this.__baseArguments = arguments;
					
					var cols       = widget.getColumns();
					var columnDefs = new Array( cols.length );
					
					// Establecemos la primera columna que puede incluir el selector de Checkbox.
					columnDefs[ 0 ] = {
						width:      '11px',
						type:       'string',
						visible:    cols[ 0 ].isVisible(),
						targets:    [ 0 ],
						searchable: false,
						sortable:   false
					};
					// Set columns definition: width, hidden, ...
					for (c = 1; c < cols.length; c++) {
						columnDefs[ c ] = {
							targets:  [ c ],
							visible:  cols[ c ].isVisible(),
							sortable: cols[ c ].isSortable(),
							type:     'string'
						};
					}

					// DataTable buttons: print, file export, ...
					var buttonsConfig = this.__createDataTablesButtons();
					// Datatable info
					var showInfo = this.__showDataTablesInfo();
					
					var dtDomSpec = this.__getDataTablesDomSpec( showInfo, buttonsConfig );
					
					// Checkbox support in first column
					if ( widget.isSelectionColumnVisible() ) {
						selectConfig = {
							style: 'multi',
							selector: 'td:first-child'
						};
						columnDefs[0].className = 'select-checkbox';
					} else {
						selectConfig = true;
					}
/*
'fixedHeader': {
    'header': true,
    'footer': false
},
'fixedColumns': {
	'leftColumns':  fixedColumns
},
*/				
					this._tableEl.removeAttr('data-render-role');
					
					this._startAsyncRendering();
					
					// Create DataTable object
					this._DataTable = this._tableEl.DataTable({
						'dom':          dtDomSpec,
						'deferRender':  true,
						'autoWidth':    true,
						'retrieve':     true,
				        'ordering':     true,
				        'filter':       false,
				        'pagination':   true,
				        'lengthChange': false,
				        'scrollY':      '300px',
				        'scrollX':      true,
				        'scrollCollapse': true,
				        'scroller': {
				            loadingIndicator: true,
				            displayBuffer: 15
				        },
				        'order':        dataOrder,
				        'buttons':      buttonsConfig,
				        'select':       selectConfig,
				        'columnDefs':   columnDefs,
	                    'language': {
                            'url':      './metronic/assets/global/plugins/datatables/media/i18n/Spanish.json',
	                        'decimal':  ',' ,
	                        'thousands': '.'
	                    },
	                    'initComplete': function( settings, json ) {
	                    	// Workfix: Wait for wrapper is created.
	                    	_this.waitFor(
	                    			_this.__isReallyInitComplete, 
	                    			true, 
	                    			50, 
	                    			60, 
	                    			_this.__afterInitComplete, 
	                    			function() {
	                    				console.error(' Elem .dataTables_wrapper no encontrado!!');
	                    			}
	                    	);
	                    }
					});
					
				} else {
					this.setEl( this._tableEl );
					
					// Hide img element if image is not found
					this.getEl().on('error', 'img', function () { 
						$(this).css( {visibility: "hidden"} ); 
					});
					
					this.base(arguments);
				}
				
				// Handle the cheked row process
				this._tableEl.find('tbody').on( 'click', 'tr > td.select-checkbox', function ( event ) {
					event.stopPropagation();
					event.preventDefault();
					
					var rowEl = $(this).parent('tr');
					// Evitamos la fila con el mensaje de que no se muestra ningún dato.
					if ( rowEl.find('td.dataTables_empty').length > 0 ) {
						return;
					}
					
					var row = _this.getRowByEl( rowEl ) || null;
					if ( row ) {
						var isPrevChecked = row.isChecked();
						
				        if ( isPrevChecked ) {
				        	_this.uncheckRow( rowEl );
				        } else {
				        	_this.checkRow( rowEl );
				        }
					} else {
						console.error('Row widget not found for checked element');
					}
			    });
				
				// Handle the selection row process
				this._tableEl.find('tbody').on( 'click', 'tr', function ( event ) {
					event.stopPropagation();
					event.preventDefault();
					
					var rowEl = $(this);
					// Evitamos la fila con el mensaje de que no se muestra ningún dato.
					if ( rowEl.find('td.dataTables_empty').length > 0 ) {
						return;
					}
					
					var row = _this.getRowByEl( rowEl ) || null;
					if ( row ) {
						var isPrevSelected = row.isSelected();
						
				        if ( isPrevSelected ) {
				        	if ( widget.isDeselectRowAllowed() ) {
				        		_this.unselectRow( rowEl );
				        	}
				        } else {
				        	_this.selectRow( rowEl );
				        }
					} else {
						console.error('Row widget not found for selected element');
					}
			    });
				
				// Handle double click in a row to show details
				this._tableEl.find('tbody').on( 'dblclick', 'tr', function ( event ) {
					event.stopPropagation();
					event.preventDefault();
					
					var rowEl = $(this);
					// Evitamos la fila con el mensaje de que no se muestra ningún dato.
					if ( rowEl.find('td.dataTables_empty').length > 0 ) {
						return;
					}
					var row = _this.getRowByEl( $(this) );
					if (row !== null) {
						row.showDetails();
					}
			    });
				
				// Manage Hyperlinks data cells.
				this._tableEl.find('tbody').on( 'click', 'a[target="_rwt"]',  function ( event ) {
					event.preventDefault();
					event.stopPropagation();
					
					var row = _this.getRowByEl( $(this).closest("tr") );
					if (row !== null) {
						row.execHyperlink( $(this).attr('href') || '' );
					}
			    });
				
				// Si no es DataTables, lo marcamos como renderizado
				if ( this._DataTable === null ) {
					this._renderIsDone();
				}
			}
		},
		
		onCreate : function() {
			this.base(arguments);
		},
		
		onDispose : function(evt) {
			try {
				// Eliminamos el listener del TableRenderer
				this._dirty = false;
				renderer.base.Renderer.RendererQueueManager.removeFromChildrenChangedQueue( this );
				
				if ( this.getEl() !== null ) {
					if (this._DataTable !== null) {
						this._DataTable.destroy();
						this._DataTable = null;
						
						//this._tableEl.remove(); 	// El destroy del datatables elimina el DOM de la tabla.
						this._tableEl = null;
					}
				}
					
			} catch( ex ) {
				console.error (ex.stack);
			} finally {
				this.base(arguments);
			}
		},
		
		getTableEl : function() {
			return this._tableEl;
		},
		
		getDataTable : function() {
			return this._DataTable;
		},
		
		afterChildrenChanged : function () {
			this.base(arguments);
			
			if ( this._DataTable !== null && this._dirty ) {
				this._DataTable.scroller.measure();
				this._DataTable.row( 'tr.selected' ).scrollTo();
				this._dirty = false;
			}
		},
		
		markAsDirty : function () {
			this._dirty = true;
		},
		
		_createHeader : function( widget, domElem ) {
			var columns = widget.getColumns(),
				headerElem,
				headerRowElem;
			
			if ( (headerElem = domElem.find( 'thead' ).first()).length == 0) {
				headerElem = $(document.createElement('thead')).appendTo(domElem);
			}
			if ( (headerRowElem = headerElem.find( 'tr' ).first()).length == 0) {
				headerRowElem = $(document.createElement('tr')).appendTo(headerElem);
			}
			
			for (var i = 0; i < columns.length; i++) {
				var colRenderRole = columns[i].getRenderRole() || '';
				var columnElem    = null
				
				// Sanitize boolean data
				var isSortable = columns[i].isSortable();
				if (typeof isSortable === "string") { isSortable = $.parseJSON(isSortable); }
				
				// Header column
				var attr = { 'data-valid': 'true' };
				
				// Check if exist column header in template
				if ( colRenderRole !== '' )  { 
					columnElem = headerRowElem.find( 'th[data-render-role="' + colRenderRole +'"]' ).first();
					attr['data-render-role'] = colRenderRole;
				}
				// If column header doesn't exist in template, we create it.
				if (columnElem === null || columnElem.length == 0) {
					columnElem = $(document.createElement('th')).appendTo( headerRowElem );
				}
				columnElem.attr(attr).html( columns[i].getText() );
				
				
				// Set column in correct position
				if (i > 0) {
					columnElem.detach().insertAfter( headerRowElem.children(':eq(' + (i-1) + ')') );
				} else {
					columnElem.detach().prependTo( headerRowElem );
				}
			}
			
			// Remove extra columns
			headerRowElem.children('th').not("[data-valid='true']").each(function( index ) {
				$( this ).remove();
			});
			
		},
		
		_createBody : function( widget, domElem ) {
			var bodyElem; 
			
			if ( (bodyElem = domElem.find( 'tbody' ).first()).length == 0) {
				bodyElem = $(document.createElement('tbody')).appendTo(domElem);
			}
		},
		
		_createFooter : function( widget, domElem ) {
			var footerElem; 
			
			if ( (footerElem = domElem.find( 'tfoot' ).first()).length == 0) {
				footerElem = $(document.createElement('tfoot')).appendTo(domElem);
			}
		},
		
		__showDataTablesInfo : function() {
			var showInfo = true;
			
			if ( typeof this._tableEl.attr('data-info') !== 'undefined' ) {
				showInfo = ( this._tableEl.attr('data-info') === 'false' && this._tableEl.attr('data-info') === 'hide' );
			}
			return showInfo;
		},
		
		__createDataTablesButtons : function() {
			var buttons = false;
			
			if ( typeof this._tableEl.attr('data-buttons') !== 'undefined' ) {
				if ( this._tableEl.attr('data-buttons') !== '' ) {
					buttons = this._tableEl.attr('data-buttons').split();
				}
			} else {
				buttons = [
					{
					    extend:    'print',
					    text:      '<i class="fa fa-print"></i>',
					    titleAttr: 'Print',
					    className: 'btn-sm'
					},
				    {
						extend : 'collection',
		                text :   '<i class="fa fa-download"></i> Exportar  <i class="fa fa-angle-down"></i>',
		                className: 'btn-sm',
						buttons : [
						    {
						    	name:      'copy',
				                extend:    'copyHtml5',
				                text:      '<i class="fa fa-files-o"></i> Copiar',
				                titleAttr: 'Copy to clipboard'
				            },
				            {
				            	name:      'excel',
				                extend:    'excelHtml5',
				                text:      '<i class="fa fa-file-excel-o"></i> Excel',
				                download:  'open',
				                titleAttr: 'Export as Excel file'
				            },
				            {
				            	name:      'csv',
				                extend:    'csvHtml5',
				                text:      '<i class="fa fa-file-text-o"></i> CSV',
				                download:  'open',
				                titleAttr: 'Export as CSV file'
				            },
				            {
				            	name:      'pdf',
				                extend:    'pdfHtml5',
				                text:      '<i class="fa fa-file-pdf-o"></i> PDF',
				                download:  'open',
				                titleAttr: 'Export as PDF file'
				            }
						]
				    }
				];
			}
			
			return buttons;
		},
		
		__getDataTablesDomSpec : function( info, buttons ) {
			/*
			 * l - length changing input control
			 * f - filtering input
			 * t - The table!
			 * i - Table information summary
			 * p - pagination control
			 * r - processing display element
			 * B - buttons
			 */
			
			var spec = '';
			if ( buttons !== false && buttons.length > 0 ) {
				spec += 'B';
			}
			spec += 'rt';
			if ( info !== false ) {
				spec += 'i';
			}
			//spec +='p';
			
			return spec;
		},
		
		
		
		__isReallyInitComplete : function() {
			return ( this._tableEl.closest( '.dataTables_wrapper' ).length !== 0);
		},
		
		__afterInitComplete : function() {
			this.setEl( this._tableEl.closest( '.dataTables_wrapper' ) );
            this._tableEl.attr( 'data-render-role', this.getJSWWidget().getRenderRole() );
            
            // Llamamos al renderer padre para que establezca las propiedades visible, enable, ...
            if ( this.__baseArguments !== null ) {
            	this.base( this.__baseArguments );
            	this.__baseArguments = null;
            }
            
            // Hide img element if image file is not found
            this.getEl().on('error', 'img', function () { 
            	$(this).css( {visibility: "hidden"} ); 
            });
            
            // Colocamos los botones en la plantilla dentro del area correspondiente
            var buttonsContainerEl = this.getParent().getEl().find('[data-table-buttons]').first();
            if ( buttonsContainerEl.length > 0 ) {
            	buttonsContainerEl.append( this._DataTable.buttons().container() );
            }
            
            // Handler sorting column
            var _this = this;
            this._DataTable.on( 'order.dt', function () {
            	var order = _this._DataTable.order();
            	
            	if ($.isArray(order) && order.length > 0) {
            		var colId = _this.getJSWWidget().getColumn( order[0][0] ); // Get column internal ID
            		
            		_this.getJSWWidget().setSortColumn( colId );
            		_this.getJSWWidget().setSortDirection( order[0][1].toUpperCase() );
            	}
            });
            
            this._renderIsDone();
		},
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Table", {
	create : function() {
		return new renderer.html5.metronic.TableRenderer();
	}
});

