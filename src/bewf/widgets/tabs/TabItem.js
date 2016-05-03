jsw.qx.Class.define( "jsw.widgets.tabs.TabItem", {

	extend : jsw.widgets.base.Parent,
	  
	construct : function() {
		this.base( arguments );
		
		this._internalId = "";
		this._text    = "";
		this._tooltip = "";
		this._image   = "";
		
		this._selected = false;
		return;
	},
	
  members: {
	getInternalId : function() {
		return this._internalId;
	},

	_setInternalId : function(id) {
		this._internalId = id;
	},
	
		
	getText : function() {
	    return this._text;
	},
	  
	_setText : function(text) {
		if ( !this._equal(this._text, text) ) {
			var oldValue = this._text;
			this._text = text;
			this._dispatchAsyncChangePropertyEvent( "text", oldValue, this._text );
		}
	},
	    
	
    getImage : function() {
        return this._image;
    },
      
    _setImage : function(image) {
		if ( !this._equal(this._image, image) ) {
			var oldValue = this._image;
			this._image = image; 
			this._dispatchAsyncChangePropertyEvent( "image", oldValue, this._image );
		}
    },
    
    
    getTooltip : function() {
	    return this._tooltip;
	},
	  
	_setTooltip : function(tooltip) {
		if ( !this._equal(this._tooltip, tooltip) ) {
			var oldValue = this._tooltip;
			this._tooltip = tooltip; 
			this._dispatchAsyncChangePropertyEvent( "tooltip", oldValue, this._tooltip );
		}
	},
	
	/*
	isEnabled : function() {
		return this._enabled;
	},
	    
	_setEnabled : function(enabled) {
		if ( !this._equal(this._enabled, enabled) ) {
			var oldValue = this._enabled;
			this._enabled = enabled; 
			this._dispatchAsyncChangePropertyEvent( "enabled", oldValue, this._enabled );
		}
    },
    
    
    isVisible : function() {
		return this._visible;
	},
	    
	_setVisible : function(visible) {
		if ( !this._equal(this._visible, visible) ) {
			var oldValue = this._visible;
			this._visible = visible; 
			this._dispatchAsyncChangePropertyEvent( "visible", oldValue, this._visible );
		}
    },
	*/
	  
	isSelected : function() {
		return this._selected;
	},
	    
	_setSelected : function(selected) {
		if(!this._equal(this._selected, selected)){
			var oldValue = this._selected;
			this._selected = selected; 
			this._dispatchAsyncChangePropertyEvent( "selected", oldValue, this._selected );
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
    
    
    getTab : function() {
    	if (this.getParent() && this.getParent().classname === 'jsw.widgets.Tabs') {
    		return this.getParent();
    	} else {
    		return null;
    	}
    }
    
  }
});