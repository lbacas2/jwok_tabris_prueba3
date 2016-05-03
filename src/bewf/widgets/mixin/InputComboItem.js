jsw.qx.Mixin.define("jsw.widgets.mixin.InputComboItem", {

	construct : function(){
		this._internalId = "";
		this._text = "";
	},

	statics : {
		widgetProperties : [
		    "internalId",
			"text"
		],

		widgetMethods : {
	  		"internalId" : function( widget, value ) {
			    widget._setInternalId( value );
			},
	  		"text" : function( widget, value ) {
			    widget._setText( value );
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

    _setText : function(text) {
		if(!this._equal(this._text, text)){
			var oldText = this._text;
			this._text = text;
			this._dispatchAsyncChangePropertyEvent("text", oldText, this._text);
		}
    },


	getComboItemById : function(id) {
		if(this.getInternalId() == id ){
			return this;
		}
		if(this.getChildren === undefined || this.getChildren() === null){
			return null;
		}

		for(var i=0 ; i<this.getChildren().length ; i++){
			var result = this.getChildren()[i].getComboItemById(id);
			if(result != null){
				return result;
			}
		}
		return null;
	},

    getCombo : function(){
    	if (this.getParent().classname === 'jsw.widgets.InputCombo'){
    		return this.getParent();
    	} else {
    		return this.getParent().getCombo();
    	}
    }
  }
});
