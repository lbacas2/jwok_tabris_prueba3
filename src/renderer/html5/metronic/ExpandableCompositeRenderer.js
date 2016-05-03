
jsw.qx.Class.define( "renderer.html5.metronic.ExpandableCompositeRenderer", {

	extend : renderer.html5.base.ExpandableCompositeRenderer,

	members : {
		_bodyEl   : null,
		_headerEl : null,
		_headerCaptionEl : null,
		_headerTitleEl   : null,
		_headerToolsEl   : null,
		_colapseToolEl   : null,
		
		
		render : function() {
			this.base(arguments); // Llamada al renderer de Composite que nos devuelve el elemento del DOM en caso de existir

			if ( this.getEl() !== null ) {
				// User-configurable color and icon
				var userClass     = this.getEl().attr('data-class') || 'box grey-cascade';
				var userIconClass = this.getEl().attr('data-icon-class') || 'fa fa-fw';
				
				// Add styles and remove user-configurable attributes
				this.getEl().addClass('portlet').addClass(userClass);
				this.getEl().removeAttr('data-class').removeAttr('data-icon-class');
				
				// Wrapping div
				this.getEl().wrapInner('<div class="portlet-body"><div class="row"></div></div>');
				this._bodyEl = this.getEl().find('.portlet-body');
			
				// HEADER AND TOOLS
				this._headerEl = $(document.createElement('div')).addClass('portlet-title').prependTo( this.getEl() );
				this._headerCaptionEl = $(document.createElement('div')).addClass('caption').appendTo( this._headerEl );
				this._headerTitleEl   = $(document.createElement('span')).addClass('title').appendTo( this._headerCaptionEl );
				$(document.createElement('i')).addClass( userIconClass ).prependTo( this._headerCaptionEl );
				
				this._headerToolsEl = $(document.createElement('div')).addClass('tools').appendTo( this._headerEl );
				this._colapseToolEl = $(document.createElement('a')).addClass('collapse').appendTo( this._headerToolsEl );
				
				var _this = this;
				
				// Manage if starts collapsed or expanded (expanded by default if not present)
				var startExpanded = $.parseJSON( this.getEl().attr('data-expanded') );
				if ( startExpanded === false ) {
					this._colapseToolEl.trigger( 'click' );
				}
				this.getEl().removeAttr('data-expanded');
				
				this._updateTitle();
				this._updateExpandable();
				
				this._renderIsDone();
			}
		},
		
		_updateTitle : function() {
			if (this._headerTitleEl !== null) {
				this._headerTitleEl.html( this.getJSWWidget().getTitle() );
			}
		},
		
		_updateExpanded : function() {
			console.error('_updateExpanded not implemented in Metronic!!!');
			// No implementado. El expandir o contraer el composite se trata en el cliente.
		},
		
		_updateExpandable : function() {
			// Expandable
			if ( this._colapseToolEl !== null ) {
				if ( this.getJSWWidget().isExpandable() ) {
					this._colapseToolEl.show();
				} else {
					this._colapseToolEl.hide();
				}
			}
		}
		
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.ExpandableComposite",  {
	create : function() {
		return new renderer.html5.metronic.ExpandableCompositeRenderer();
	}
});

