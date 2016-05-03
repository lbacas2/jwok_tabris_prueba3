jsw.qx.Class.define( "renderer.html5.metronic.TableRowRenderer", {

	extend : renderer.html5.base.TableRowRenderer,

	construct : function() {
		this.base( arguments );
		
		this._colsEl = [];
	},

	statics : {
		__defaultCellTemplate : function( table, row, column, cellElem, data) {
			if (data.widget !== null && data.widget !== '') {
				cellElem.addClass('has-widget');
				
				// widget asociado
				var widget = jsw.remote.ObjectRegistry.getObject( data.widget );
				renderer.html5.metronic.TableRowRenderer.__defaultCellWidgetTemplate( table, row, column, cellElem, widget );
			} else {
				cellElem.removeClass('has-widget');
				
				// text
				cellElem.html( data.text || '' );
			
				// background
				if (data.background !== null) {
					cellElem.css('background-color', data.background );
				}
				// foreground
				if (data.foreground !== null) {
					cellElem.css('color', data.foreground );
				}
				// image
				if (data.image !== null) {
					var imageKey   = renderer.html5.base.utils.keyFix.getImageKey( row.basename, row.getRenderRole(), data.image, data.text ),
						imageValue = (imageKey) ? renderer.html5.metronic.keyTranslation.getKeyConversion( imageKey ) : data.image || '',
						imageType  = jsw.widgets.util.ImageUtil.getImageType( imageValue ),
						imgElem    = null;
				  
					if ( (imgElem = cellElem.find( imageType.elementType ).first()).length == 0) {
						imgElem = $(document.createElement( imageType.elementType ) ).appendTo( cellElem );
					}
			      
					if (imgElem && imageType !== jsw.widgets.util.ImageUtil.IMAGE.NONE) {
						imgElem.attr(imageType.elementAttr, imageValue );
					}
				}
			}
		},
		
		__defaultCellWidgetTemplate : function( table, row, column, cellEl, widget ) {
			if ( row !== null && widget !== null && cellEl !== null ) {
				var renderRole   = widget.getRenderRole() || '',
					cellEditorEl = null;
				
				if ( renderRole !== '' ) {
					// Comprobamos que no exista ya, en casi contrario lo creamos.
					if ( (cellEditorEl = cellEl.find('[data-render-role="' + renderRole +'"]').first()).length == 0 ) {
						// Vaciamos la celda
						cellEl.empty();
						
						// Creamos la referencia en el DOM sobre la que se enlazará el widget. 
						cellEditorEl = renderer.html5.base.WidgetRenderer.createNewElement( widget.getRenderer() );
						if ( cellEditorEl !== null ) {
							cellEl.append( cellEditorEl );
							// Resaltamos los widgets de edición si es un widget de InputControl
							if ( widget.basename.indexOf('Input') === 0 ) {
								cellEditorEl.addClass('highlight');
							}
						} else {
							// Si no se ha podido colocar el widget en el DOM, eliminamos la estructura generada y lo
							// añadimos en la cola para que se intente más tarde.
							if ( row.getRenderer ) {
								var rRenderer = row.getRenderer();
								renderer.base.Renderer.RendererQueueManager.addToRetryRenderAfterQueue( rRenderer );
								if ( rRenderer.getEl && rRenderer.getEl() ) {
									rRenderer.getEl().remove();
									rRenderer.setEl( null );
								}
							}
						}
					}
				}
			}
			return cellEditorEl;
		}
	},

	members : {
		render : function() {
			var row           = this.getJSWWidget();
			var tableRenderer = this.getParent();
			var table         = this.getParent().getJSWWidget();
			
			if (row && table && this.getParent() !== null) {
				var role          = row.getRenderRole() || '',
					dataTable     = tableRenderer.getDataTable(),
					tableEl       = tableRenderer.getTableEl(),
					tableBodyEl   = ( tableEl ) ? tableEl.find('tbody').first() : null;
					
				if ( tableEl !== null && tableBodyEl ) {
					this.setEl( $(document.createElement('tr')).addClass('hidden').appendTo( tableEl ) );
					
					// Creamos las columnas necesarias
					var cols = table.getColumns() || [];
					for (var c = 0; c < cols.length; c++) {
						this._colsEl[ c ] = $(document.createElement('td')).appendTo( this.getEl() );
					}
					
					this.getEl().attr('data-id', row.getInternalId() );
					this.getEl().attr('data-widget-id', row._jswId );	// TODO Eliminar
					
					this._updateRowValues();
					// Si los widgets de la plantilla no tienen renderer asociados, se 
					// elimina toda la creación del DOM HTML para renderizarlo de nuevo en 
					// una siguiente pasada.
					if ( this.getEl() !== null ) {
						this.getEl().removeClass('hidden');
						
						this._updateSelected();
						this._updateChecked();
						
						if ( dataTable !== null ) {
							dataTable.row.add( this.getEl() );
						} else {
							this.getEl().appendTo( tableBodyEl );
						}
	
						// Notificamos a la tabla que la fila ha sido modificada
						tableRenderer.markAsDirty();
						setTimeout( function() {
							renderer.base.Renderer.RendererQueueManager.addToChildrenChangedQueue( tableRenderer );
						}, 100);
					}

					this.base( arguments );
					this._renderIsDone();
				}
			}
		},
		
		onCreate : function() {
			this.base(arguments);
		},
		
		onDispose : function(evt) {
			if ( this.getEl() !== null ) {
				var row           = this.getJSWWidget(),
					table         = this.getParent().getJSWWidget(),
					dataTable     = this.getParent().getDataTable(),
					tableRenderer = this.getParent();
					
				try {
					if (table !== null && dataTable !== null) {
						dataTable.row( this.getEl() ).remove();
					} else {
						this.getEl().remove();
					}
				} catch( ex ) {
					console.error (ex.stack);
				} finally {
					// Notificamos a la tabla que la fila ha sido modificada
					tableRenderer.markAsDirty();
					renderer.base.Renderer.RendererQueueManager.addToChildrenChangedQueue( tableRenderer );
					
					this.setEl( null );		
				}
			}
			this.base(arguments);
		},
		
		_updateRowValues : function () {
			if (this.getEl() !== null) {
				var row           = this.getJSWWidget(),
					tableRenderer = this.getParent(),
					colRenderers  = tableRenderer.getColumnRenderers(),
					table         = tableRenderer.getJSWWidget(),
					colTemplateFunc,
					cellElem,
					col;

				for (var c = 0; c < this._colsEl.length; c++) {
					if (this.getEl() !== null) {
						data     = row.getCell( c );
						cellElem = this._colsEl[ c ];
						
						// Comprobación por si las mosas, aunque no debería llegar nunca un null
						if ( cellElem !== null ) {
							// Comprobamos si hay plantilla asociada a la columna, 
							// en caso contrario usamos la de por defecto.
							col = ( colRenderers[ c ]) ? colRenderers[c].getJSWWidget() : null;
							if (col && colRenderers[ c ].hasTemplate() ) {
								colTemplateFunc = colRenderers[ c ].getTemplate(); 
							} else {
								colTemplateFunc = renderer.html5.metronic.TableRowRenderer.__defaultCellTemplate;
							}
							// Ejecutamos la plantilla para la celda
							try {
								colTemplateFunc( table, row, col, cellElem, data );
								// Si los widgets de la plantilla no tienen renderer asociados, se 
								// elimina toda la creación del DOM HTML para renderizarlo de nuevo en 
								// una siguiente pasada.
							} catch( err ) {
								console.error( err );
							}
						}
						
					}
				}
			}
		}, 
		
		_updateSelected : function() {
			if (this.getEl() !== null) {
				var tableRenderer = this.getParent(),
					table         = tableRenderer.getJSWWidget(),
					dataTable     = tableRenderer.getDataTable(),
					rowEl         = this.getEl();
				
				if ( rowEl && this.getJSWWidget().isSelected() ) {
					
					if ( !rowEl.hasClass('active') ) {
						// If multiple selection is not supported, unselect all previous selected rows before mark as selected the row. 
			        	if ( tableRenderer.getJSWWidget().isMultipleSelection() !== true ) {
			        		tableRenderer.getTableEl().find( 'tr.active' ).removeClass('active');
							if ( !table.isSelectionColumnVisible() ) {
								tableRenderer.getTableEl().find( 'tr.active' ).removeClass('selected');
								if ( dataTable ) {
									dataTable.rows( 'tr.active' ).deselect();
								}
							}
			        	}
						
						rowEl.addClass('active');
						if ( !table.isSelectionColumnVisible() ) {
							rowEl.addClass('selected');
							if ( dataTable ) {
								dataTable.rows( rowEl ).select();
							}
						}
					}
					
				} else {
					rowEl.removeClass('active');
					if ( !table.isSelectionColumnVisible() ) {
						rowEl.removeClass('selected');
						if ( dataTable ) {
							dataTable.rows( rowEl ).deselect();
						}
					}
				}
			}
		},
		
		_updateChecked : function() {
			if (this.getEl() !== null) {
				var tableRenderer = this.getParent(),
					table = tableRenderer.getJSWWidget(),
					rowEl = this.getEl();
				
				if ( table.isSelectionColumnVisible() ) {
					if ( this.getJSWWidget().isChecked() ) {
						tableRenderer.checkRow( rowEl );
						rowEl.addClass('selected');
			        } else {
			        	tableRenderer.uncheckRow( rowEl );
			        	rowEl.removeClass('selected');
			        }
		        }
			}
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.table.TableRow", {
	create : function() {
		return new renderer.html5.metronic.TableRowRenderer();
	}
});