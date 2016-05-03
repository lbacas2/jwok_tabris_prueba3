
jsw.qx.Class.define( "jsw.widgets.table.TableColumn", {

  extend : jsw.widgets.base.Parent,
  
  construct : function( styles ) {
    this.base( arguments );
    
    this._internalId  = '';
	this._text        = '';
	this._image       = '';
	this._visible     = true;  
	this._sortable    = false;
    //this._resizable   = true;
    //this._moveable    = true;
	return;
  },

  members : {  
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
    
  	isVisible : function() {
  		return this._visible;
  	},

  	_setVisible : function( visible ) {
  		if ( !this._equal(this._visible, visible) ) {
  			var oldValue = this._visible;

  			this._visible = visible;
  			this._dispatchAsyncChangePropertyEvent( "visible", oldValue, this._visible);
  		}
  	},
  	
  	isSortable : function() {
  		return this._sortable;
  	},

  	_setSortable : function( sortable ) {
  		if ( !this._equal(this._sortable, sortable) ) {
  			var oldValue = this._sortable;

  			this._sortable = sortable;
  			this._dispatchAsyncChangePropertyEvent( "sortable", oldValue, this._sortable);
  		}
  	},
  	
  	getTable : function() {
    	if (this.getParent() && this.getParent().classname === 'jsw.widgets.Table') {
    		return this.getParent();
    	} else {
    		return null;
    	}
    },

  }
});
