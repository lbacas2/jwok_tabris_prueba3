jsw.qx.Class.define( "jsw.widgets.inputcombo.InputComboOption", {

	extend : jsw.widgets.base.Parent,
	  
	include: jsw.widgets.mixin.InputComboItem,
	
	construct : function() {
		this.base( arguments );
		
		this._image = "";
		this._additionalText = "";
		this._selected = false;
		this._disabled = false;
	},
	
  members: {
    getImage : function() {
        return this._image;
    },
      
    _setImage : function(image) {
		if(!this._equal(this._image, image)){
			var oldValue = this._image;
			this._image = image; 
			this._dispatchAsyncChangePropertyEvent( "image", oldValue, this._image);
		}
    },
    
    getAdditionalText : function() {
	    return this._additionalText;
	},
	  
	_setAdditionalText : function(text) {
		if(!this._equal(this._additionalText, text)){
			var oldValue = this._additionalText;
			this._additionalText = text; 
			this._dispatchAsyncChangePropertyEvent( "additionalText", oldValue, this._additionalText);
		}
	},
	  
	isSelected : function() {
		return this._selected;
	},
	    
	_setSelected : function(selected) {
		if(!this._equal(this._selected, selected)){
			var oldValue = this._selected;
			this._selected = selected; 
			this._dispatchAsyncChangePropertyEvent( "selected", oldValue, this._selected);
		}
    },
    
    setSelected : function(selected) {
		if(!this._equal(this._selected, selected)){
			var oldValue = this._selected;
			this._selected = selected; 
			this._dispatchAsyncChangePropertyEvent( "selected", oldValue, this._selected);
			this._handlePropertyModification( "Selected", "selected", this.isSelected() );
		}
    },
    
    isDisabled : function() {
		return this._disabled;
	},
	    
	_setDisabled : function(disabled) {
		if(!this._equal(this._disabled, disabled)){
			var oldValue = this._disabled;
			this._disabled = disabled; 
			this._dispatchAsyncChangePropertyEvent( "disabled", oldValue, this._disabled);
		}
    }
  }
});