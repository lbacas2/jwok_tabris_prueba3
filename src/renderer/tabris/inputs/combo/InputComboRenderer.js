
jsw.qx.Class.define( "renderer.tabris.InputComboRenderer", {
	
	construct : function() {
		this.base( arguments );
		
		this.__options = [];
	},
	
	extend : renderer.tabris.ParentWidgetRenderer,

	members : {
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var elem = new tabris.Picker({
						id : this.getJSWWidget().getRenderRole(),
						itemText: function( option ) {
							return ( option.text );
						}
				}).appendTo( parentElem );
				
				this.setEl( elem );
				this.base( arguments );
				
				this._updateValue();
				this._updatePlaceholder();
				this._updateReadOnly();
				
				this.getEl().on( 'change:selection', this.__updateSelectedOptions, this );
				
				//this.redraw();
			}
			
			this._renderIsDone();
		},
		
		addOption : function( data ) {
			if ( data && typeof data.id !== 'undefined' && typeof data.text !== 'undefined' ) {
				this.__options.push ( data );
				this.redraw();
			}
		},
		
		removeOption : function( data ) {
			if ( data && typeof data.id !== 'undefined' && typeof data.text !== 'undefined' ) {
				var index = this.__options.indexOf( data );
				if (index != -1 ) {
					this.__options.splice( index, 1 );
					this.redraw();
				}
			}
		},
		
		redraw : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'items', this.__options );
			}
		},
		
		_onPropertyChangeEvent : function( event ) {
			this.base( arguments, event );
			
			// multipleSelection property is not supported by Tabris.js
			switch ( event.property ) {
				case 'value':
					this._updateValue();
					break;
				case 'readOnly':
					this._updateReadOnly();
					break;
				case 'placeholder':
					this._updatePlaceholder();
					break;
				case 'searchEnabled':
					break;
				default:
			}
		},
				
		_updateValue : function () {
			if ( this.getEl() !== null ) {
				var oldValue = this.getEl().get( 'text' );
				var newValue = this.getJSWWidget().getValue()
				
				if ( oldValue != newValue ) {
					this.getEl().set( 'text', newValue );
				}
			}
		},
		
		_updatePlaceholder : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'message', this.getJSWWidget().getPlaceHolder() );
			}
		},
		
		_updateReadOnly : function () {
			if ( this.getEl() !== null ) {
				var readOnly = this.getJSWWidget().isReadOnly() || false;
				//this.getEl().set( 'background', (readOnly) ? '#ccc' : '#fff' );
				this.getEl().set( 'editable', !readOnly );
				
			}
		},
		
		__updateSelectedOptions : function( picker, selOption ) {
			var _this = this;
			this.__options.forEach( function( option ) {
				_this.getJSWWidget().getComboItemById( option.id ).setSelected( (option === selOption) );
			});
		},
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.InputCombo",  {
	create : function() {
		return new renderer.tabris.InputComboRenderer();
	}
});
