jsw.qx.Class.define( "jsw.widgets.wizard.WizardPage", {

	extend : jsw.widgets.base.Parent,
	  
	construct : function() {
		this.base( arguments );
		
		this._title   = "";
		this._image   = "";
		
		return;
	},
	 	
  members: {
	  
	getTitle : function() {
	    return this._title;
	},
	  
	_setTitle : function(title) {
		if(!this._equal(this._title, title)){
			var oldValue = this._title;
			this._title = title;
			this._dispatchAsyncChangePropertyEvent( "title", oldValue, this._title );
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
    }
  }
});