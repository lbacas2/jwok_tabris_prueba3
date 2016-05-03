jsw.qx.Class.define( "renderer.html5.metronic.TableColumnRenderer", {

	extend : renderer.html5.base.TableColumnRenderer,

	construct : function() {
		this.base( arguments );
		
		this._template = null;
	},

	members : {
		render : function() {
			var col           = this.getJSWWidget();
			var tableRenderer = this.getParent();
			
			if (col && tableRenderer) {
				var role      = col.getRenderRole() || '';
				var tableEl   = tableRenderer.getTableEl();
				var dataTable = tableRenderer.getDataTable();
				var elem;
				
				if (role != '' && tableEl !== null ) {
					var elem = this.__locateInTemplate( '[data-render-role="' + role +'"]', tableEl );
					if ( elem !== null ) {
						this.setEl( elem );
						tableRenderer.setColumnRenderer( this.getEl().index(), this );
						
						
						if ( (this._textEl = this.getEl().find('.title').first() ).length == 0) {
							this._textEl = $(document.createElement('span')).addClass('title').appendTo( this.getEl() );
						}
						
						this.__setTemplate( this.getEl().attr('data-template') || null );
						
						this.base(arguments);
						this._updateText();
						this._updateImage();
					}
					
				}
			}
		},
		
		show : function() {
			var tableRenderer = this.getParent(),
				dataTable     = tableRenderer.getDataTable(),
				index         = this.getEl().index() || null;
			
			if ( dataTable && index ) {
				dataTable.column( index ).visible( true, false );
				
				// Notificamos a la tabla que se repinte
				tableRenderer.markAsDirty();
				renderer.base.Renderer.RendererQueueManager.addToChildrenChangedQueue( tableRenderer );				
			}
			
			this.base(arguments);
		}, 
		
		hide : function() {
			var tableRenderer = this.getParent(),
				dataTable     = tableRenderer.getDataTable(),
				index         = this.getEl().index() || null;
			
			if ( dataTable && index ) {
				dataTable.column( index ).visible( false, false );
				
				// Notificamos a la tabla que se repinte
				tableRenderer.markAsDirty();
				renderer.base.Renderer.RendererQueueManager.addToChildrenChangedQueue( tableRenderer );
				
			}
			
			this.base(arguments);
		},
		
		getTemplate : function() {
			return this._template || null;
		},
		
		hasTemplate : function() {
			return this.getTemplate() !== null;
		},
		
		__setTemplate : function( fnName ) {
			if ( fnName && fnName !== '' && window[fnName] ) {
				this._template = window[fnName];		
			} else {
				this._template = null;
			}
		},
		
		
		_updateText : function () {
			if (this._textEl !== null) {
				this._textEl.html( this.getJSWWidget().getText() );
			}
		},
		
		_updateImage : function() {
			if ( ! this.getEl().attr('data-image') ) {
				this._imgEl = renderer.html5.metronic.keyTranslation.setWidgetImage( this.getJSWWidget(), this.getEl() );
			}
		},

	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.table.TableColumn", {
	create : function() {
		return new renderer.html5.metronic.TableColumnRenderer();
	}
});