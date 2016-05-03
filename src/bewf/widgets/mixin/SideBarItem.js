jsw.qx.Mixin.define("jsw.widgets.mixin.SideBarItem", {

	construct : function(){
		this._internalId = "";
		this._text       = "";
		this._image      = "";
		this._tooltip    = "";
		this._additionalText    = "";
		this._additionalTooltip = "";
	},

	statics : {
		widgetProperties : [
		    "internalId",
			"text",
			"tooltip",
			"image",
			"additionalText",
			"additionalTooltip"
		],

		widgetMethods : {
	  		"internalId" : function( widget, value ) {
			    widget._setInternalId( value );
			},
	  		"text" : function( widget, value ) {
			    widget._setText( value );
			},
	  		"image" : function( widget, value ) {
			    widget._setImage( value );
			},
			"tooltip" : function( widget, value ) {
			    widget._setTooltip( value );
			},
			"additionalText" : function( widget, value ) {
			    widget._setAdditionalText( value );
			},
	  		"additionalTooltip" : function( widget, value ) {
			    widget._setAdditionalTooltip( value );
	  		}
		}
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

    _setText : function( text ) {
		if ( !this._equal(this._text, text) ) {
			var oldText = this._text;
			this._text = text; 
			this._dispatchAsyncChangePropertyEvent( "text", oldText, this._text );
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

    
    getImage : function() {
        return this._image;
    },

    _setImage : function(image) {
		if(!this._equal(this._image, image)){
			var oldValue = this._image;
			this._image = image;
			this._dispatchAsyncChangePropertyEvent( "image", oldValue, this._image );
		}
    },

    
    getAdditionalText : function() {
	    return this._additionalText;
	},

	_setAdditionalText : function(text) {
		if(!this._equal(this._additionalText, text)){
			var oldValue = this._additionalText;
			this._additionalText = text;
			this._dispatchAsyncChangePropertyEvent( "additionalText", oldValue, this._additionalText );
		}
	},

	
	getAdditionalTooltip : function() {
		return this._additionalTooltip;
	},

	_setAdditionalTooltip : function(tooltip) {
		if(!this._equal(this._additionalTooltip, tooltip)){
			var oldValue = this._additionalTooltip;
			this._additionalTooltip = tooltip;
			this._dispatchAsyncChangePropertyEvent( "additionalTooltip", oldValue, this._additionalTooltip );
		}
    },

    
    getSideBar : function(){
    	if ( this.getParent() === null ) {
			return null;
		}
    	
    	if ( this.getParent().classname === 'jsw.widgets.SideBar' ) {
    		return this.getParent();
    	} else {
    		return this.getParent().getSideBar();
    	}
    },
    
	
	// TODO: Similar en Menu, TreeView y SideBar
	getSideBarItemById : function(id){
		if(this.getInternalId() == id ){
			return this;
		}
		if(this.getChildren === undefined || this.getChildren() === null){
			return null;
		}

		for(var i=0 ; i<this.getChildren().length ; i++){
			var result = this.getChildren()[i].getSideBarItemById(id);
			if(result != null){
				return result;
			}
		}
		return null;
	}

  }
});
