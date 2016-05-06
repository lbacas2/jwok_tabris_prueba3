
jsw.qx.Class.define( "renderer.tabris.InputControlRenderer", {

	extend : renderer.tabris.WidgetRenderer,

	members : {
		
		init : function() {
			this._updateValue();
			this._updatePlaceholder();
			this._updateReadOnly();
		},
		
		addInputControlListeners : function () {
			if ( this.getEl() !== null ) {
				this.getEl().on( 'accept', this._updateWidgetValue, this );
				this.getEl().on( 'input',  this._updateWidgetValue, this );	// Mismo evento que 'change:text'
			}
		},
		
		removeInputControlListeners : function () {
			if ( this.getEl() !== null ) {
				this.getEl().off( 'accept', this._updateWidgetValue, this );
				this.getEl().off( 'input',  this._updateWidgetValue, this );	// Mismo evento que 'change:text'
			}
		},
		
		_onPropertyChangeEvent : function( event ) {
			this.base( arguments, event );
			
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

		_updateWidgetValue : function( widget, text ) {
	    	this.getJSWWidget().setValue( text );
	    }
	}
});