jsw.qx.Class.define( "renderer.html5.metronic.AccordionRenderer", {

	extend : renderer.html5.metronic.TabsRenderer,

	construct : function() {
		this.base( arguments );
		
		this.$nav     = null;
		this.$content = null;
	},

	members : {
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null && elem.attr('data-template') === 'accordion' ) {
				// workaround
				this.__proto__.classname = 'renderer.html5.metronic.AccordionRenderer';
				
				this.setEl( elem );
				this.base( arguments );
				
				this.getEl().addClass('accordion');

				var _this = this;
				// Listener to change panel events
				this.getEl().on('show.bs.collapse hide.bs.collapse click', 'a[data-toggle="collapse"]', function (e) {
					var itemWidget = _this.getJSWWidget().getTabItemById( $(this).attr('data-id') ),
						oldValue   = itemWidget.isSelected(),
						newValue;
					
					switch(e.type) {
					  case 'show.bs.collapse':
						newValue = true;
						break;
					  case 'show.bs.collapse':
						newValue = false;
						break;
					  case 'click':
					  default:
						newValue = !oldValue; 
					}

					itemWidget.setSelected( newValue );
					// Check is change active panel is done on server side.
					if ( itemWidget.isSelected() !== newValue ) {
						return false;
					}
				});
				
				// Add accordion panels
				this._createPanels( this.getJSWWidget(), this.getEl() );
				
				this._renderIsDone();
				
			} else {
				// Por la forma particular por como están extendidos los renderer de Acordeon y de Tabs del mismo
				// widget hay que lanzar este mecanismo junto con el workaround de la clase.
				this.base( arguments );
			}
		},
		
		
		// TODO: No se puede llamar el metodo _createChilds como el del TabsRenderer ya que al no haber comprobación del 
		// data-template, coge este método tanto para renderizar Pestañas como Acordeones
		_createPanels : function( widget, domElem ) {
			var parentRole = widget.getRenderRole(),
				children   = widget.getChildren(),
				accPanel, 
				accHeader, 
				accHeaderTitle, 
				accBody,
				accBodyContent,
				i;
			
			for (i = 0; i < children.length; i++) {
				// Create div panel for the tabItem
				accPanel  = $(document.createElement('div')).addClass('panel panel-default').appendTo( this.$el );
				
				// Create header for accordion panel
				accHeader = $(document.createElement('div')).addClass('panel-heading').appendTo( accPanel );
				accHeaderTitle = $(document.createElement('h4')).addClass('panel-title').appendTo( accHeader );
				$(document.createElement('a'))
						.html( children[i].getText() )
						.attr({
							'href':        '#' + parentRole + '_' + children[i].getInternalId(),
							'class':       'accordion-toggle',
							'data-toggle': 'collapse',
							'data-parent': '#' + parentRole,
							'data-id':     children[i].getInternalId()
						})
						.appendTo( accHeaderTitle );
				
				// Create body for accordion panel
				accBodyContent = this.$el.find('#' + parentRole + '_' + children[i].getInternalId() ).first();
				accBodyContent
						.removeAttr('id')			// Remove id
						.addClass('panel-body');  	// Add class
				
				accBody = $(document.createElement('div'))
						.attr({
							'id':    parentRole + '_' + children[i].getInternalId(),
							'class': 'panel-collapse collapse'
						})
						.append( accBodyContent )
						.appendTo( accPanel );
				
				accHeaderTitle.find('a[data-toggle="collapse"]').collapse( children[i].isSelected() ? 'show': 'hide' );
			}
			
		},
		
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Tabs", {
	create : function() {
		return new renderer.html5.metronic.AccordionRenderer();
	}
});