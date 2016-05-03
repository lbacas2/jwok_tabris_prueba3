jsw.qx.Class.define( "jsw.widgets.Wizard", {

  extend : jsw.widgets.base.Parent,

  construct : function( styles ) {
    this.base( arguments );

	this._currentPage = "";
	this._nextPage    = "";
	
	this._backButtonEnable   = false;
	this._nextButtonEnable   = false;
	this._cancelButtonEnable = false;
	this._finishButtonEnable = false;
	
	this._error   = "";
	this._success = "";
  },

  statics : {},

  destruct : function() {},

  events : {},

  members : {

    destroy : function() {
      this.base( arguments );
    },

    /** To be called after jsw_XXX states are set */
    initialize : function() {
    },
    
  	getCurrentPage : function() {
  		return this._currentPage;
  	},

  	_setCurrentPage : function(value) {
  		if(!this._equal(this._currentPage, value)){
  			var oldValue = this._currentPage;
  			this._currentPage = value;
  			this._dispatchAsyncChangePropertyEvent( "currentPage", oldValue, this._currentPage);
  		}
  	},

  	getNextPage : function() {
  		return this._nextPage;
  	},

  	_setNextPage : function(value) {
  		if(!this._equal(this._nextPage, value)){
  			var oldValue = this._nextPage;
  			this._nextPage = value;
  			this._dispatchAsyncChangePropertyEvent( "nextPage", oldValue, this._nextPage);
  		}
  	},

  	getError : function() {
  		return this._error;
  	},

  	_setError : function(value) {
  		if(!this._equal(this._error, value)){
  			var oldValue = this._error;
  			this._error = value;
  			this._dispatchAsyncChangePropertyEvent( "error", oldValue, this._error);
  		}
  	},

  	getSuccess : function() {
  		return this._success;
  	},

  	_setSuccess : function(value) {
  		if(!this._equal(this._success, value)){
  			var oldValue = this._success;
  			this._success = value;
  			this._dispatchAsyncChangePropertyEvent( "success", oldValue, this._success);
  		}
  	},
        
  	isBackButtonEnable : function() {
  		return this._backButtonEnable;
  	},

  	_setBackButtonEnable : function(value) {
  		if(!this._equal(this._backButtonEnable, value)){
  			var oldValue = this._backButtonEnable;
  			this._backButtonEnable = value;
  			this._dispatchAsyncChangePropertyEvent( "backButtonEnable", oldValue, this._backButtonEnable);
  		}
  	},

  	isNextButtonEnable : function() {
  		return this._nextButtonEnable;
  	},

  	_setNextButtonEnable : function(value) {
  		if(!this._equal(this._nextButtonEnable, value)){
  			var oldValue = this._nextButtonEnable;
  			this._nextButtonEnable = value;
  			this._dispatchAsyncChangePropertyEvent( "nextButtonEnable", oldValue, this._nextButtonEnable);
  		}
  	},

  	isCancelButtonEnable : function() {
  		return this._cancelButtonEnable;
  	},

  	_setCancelButtonEnable : function(value) {
  		if(!this._equal(this._cancelButtonEnable, value)){
  			var oldValue = this._cancelButtonEnable;
  			this._cancelButtonEnable = value;
  			this._dispatchAsyncChangePropertyEvent( "cancelButtonEnable", oldValue, this._cancelButtonEnable);
  		}
  	},

  	isFinishButtonEnable : function() {
  		return this._finishButtonEnable;
  	},

  	_setFinishButtonEnable : function(value) {
  		if(!this._equal(this._finishButtonEnable, value)){
  			var oldValue = this._finishButtonEnable;
  			this._finishButtonEnable = value;
  			this._dispatchAsyncChangePropertyEvent( "finishButtonEnable", oldValue, this._finishButtonEnable);
  		}
  	},
    
    _sendNext : function() {
    	this._notifyEvent("Next");
    },
    _sendPrevious : function() {
    	this._notifyEvent("Previous");
    },
    _sendFinish : function() {
    	this._notifyEvent("Finish");
    },
    _sendCancel : function() {
    	this._notifyEvent("Cancel");
    },
    _sendPageHasChanged : function() {
    	this._notifyEvent("PageChanged");
    }
  }
});
