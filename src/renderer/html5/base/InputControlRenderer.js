
jsw.qx.Class.define( "renderer.html5.base.InputControlRenderer", {

	extend : renderer.html5.base.WidgetRenderer,

	members : {
		
		init : function() {
			this._updateValue();
			this._updatePlaceholder();
			this._updateReadOnly();
		},
		
		addInputControlListeners : function () {
			if ( this.getEl() !== null ) {
				this.getEl().on( 'change blur', { renderer: this }, this._updateWidgetValue );
				this.getEl().on( 'click', this.__stopPropagation );
				this.getEl().on( 'keydown', this.__preventEnterKey );
			}
		},
		
		removeInputControlListeners : function () {
			if ( this.getEl() !== null ) {
				this.getEl().off( 'change blur', this._updateWidgetValue );
				this.getEl().off( 'click', this.__stopPropagation );
				this.getEl().off( 'keydown', this.__preventEnterKey );
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
			if (this.getEl() !== null) {
				this.getEl().val( this.getJSWWidget().getValue() );
			}
		},
		
		_updatePlaceholder : function () {
			if (this.getEl() !== null) {
				this.getEl().attr( 'placeholder', this.getJSWWidget().getPlaceHolder() );
			}
		},
		
		_updateReadOnly : function () {
			if (this.getEl() !== null) {
				this.getEl().prop( 'readonly', this.getJSWWidget().isReadOnly() );
			}
		},
		
		__stopPropagation : function ( event ) {
			event.stopPropagation(); 
	    }, 
	    
	    __preventEnterKey : function ( event ) {
	    	if ( event.keyCode == 13 ) {
		        event.preventDefault();
		        return false;
		    }
	    },
	    
	    _updateWidgetValue : function( event ) {
	    	var _this = event.data.renderer;
	    	_this.getJSWWidget().setValue( _this.getEl().val() );
		}	    
	}
});