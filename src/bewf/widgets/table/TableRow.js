jsw.qx.Class.define( "jsw.widgets.table.TableRow", {
  extend : jsw.widgets.base.Parent,
  
  construct : function( styles ) {
    this.base( arguments );
    
    this._internalId  = "";
    this._checked     = false;
    this._selected    = false;
    this._texts       = [""];
    this._images      = [null];
    this._backgrounds = [null];
    this._foregrounds = [null];
    this._widgets     = [null];
	return;
  },

  members : {
	getInternalId : function() {
		return this._internalId;
	},

	_setInternalId : function(id) {
		this._internalId = id;
	},
	
    
    getTexts : function() {
	    return this._texts;
	},
	  
	_setTexts : function(texts) {
		if (!this._equal(this._texts, texts)) {
			var oldValue = this._texts;
			this._texts = texts;
			this._dispatchAsyncChangePropertyEvent( "texts", oldValue, this._texts );
		}
	},
	
	
	getImages : function() {
	    return this._images;
	},
	  
	_setImages : function(images) {
		if (!this._equal(this._images, images)) {
			var oldValue = this._images;
			this._images = images;
			this._dispatchAsyncChangePropertyEvent( "images", oldValue, this._images );
		}
	},
	
	
	getBackgrounds : function() {
	    return this._backgrounds;
	},
	  
	_setBackgrounds : function(backgrounds) {
		if (!this._equal(this._backgrounds, backgrounds)) {
			var oldValue = this._backgrounds;
			this._backgrounds = backgrounds;
			this._dispatchAsyncChangePropertyEvent( "backgrounds", oldValue, this._backgrounds );
		}
	},
	
	
	getForegrounds : function() {
	    return this._foregrounds;
	},
	  
	_setForegrounds : function(foregrounds) {
		if (!this._equal(this._foregrounds, foregrounds)) {
			var oldValue = this._foregrounds;
			this._foregrounds = foregrounds;
			this._dispatchAsyncChangePropertyEvent( "foregrounds", oldValue, this._foregrounds );
		}
	},
	
	
	getWidgets : function() {
	    return this._widgets;
	},
	  
	_setWidgets : function(widgets) {
		if (!this._equal(this._widgets, widgets)) {
			var oldValue = this._widgets;
			this._widgets = widgets;
			this._dispatchAsyncChangePropertyEvent( "widgets", oldValue, this._widgets );
		}
	},
	
	isChecked : function() {
	    return this._checked;
	},
	  
	_setChecked : function( checked ) {
		if (!this._equal(this._checked, checked)) {
			var oldValue = this._checked;
			this._checked = checked;
			this._dispatchAsyncChangePropertyEvent( "checked", oldValue, this._checked );
		}
	},
	
	setChecked : function( checked ) {
		if (!this._equal(this._checked, checked)) {
			var oldValue = this._checked;
			this._checked = checked;
			this._dispatchAsyncChangePropertyEvent( "checked", oldValue, this._checked );
			this._handlePropertyModification( "Checked", "checked", this._checked );
		}
	},
	
	
	isSelected : function() {
	    return this._selected;
	},
	  
	_setSelected : function( selected ) {
		if (!this._equal(this._selected, selected)) {
			var oldValue = this._selected;
			this._selected = selected;
			this._dispatchAsyncChangePropertyEvent( "selected", oldValue, this._selected );
		}
	},
	
	setSelected : function( selected ) {
		if (!this._equal(this._selected, selected)) {
			var oldValue = this._selected;
			this._selected = selected;
			this._dispatchAsyncChangePropertyEvent( "selected", oldValue, this._selected );
			this._handlePropertyModification( "Selected", "selected", this._selected );
		}
	},
	
	getCell : function (index) {
		var res = {};
		
		if (index >= 0 && index < this._texts.length) {
			try {
				res = {
				    text :       this._texts[ index ] || '',
				    image :      this._images[ index ] || null,
				    background:  this._backgrounds[ index ] || null,
				    foreground : this._foregrounds[ index ] || null,
				    widget :     this._widgets[ index ] || null,
				};
			} catch (e) {
			}
		}
		
		return res;
	},
	
    getTable : function() {
    	if (this.getParent() && this.getParent().classname === 'jsw.widgets.Table') {
    		return this.getParent();
    	} else {
    		return null;
    	}
    },
    
  	execHyperlink : function( linkCommand ) {
    	this._notifyEvent( "ExecHyperlink", {'hyperlinkRef' : linkCommand} );
    	return;
    },
    
    showDetails : function() {
    	this._notifyEvent( "ShowDetails" );
    	return;
    }
	
  }
});
