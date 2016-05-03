
jsw.qx.Class.define( "jsw.widgets.FileUpload", {

	extend : jsw.widgets.base.JSWItem,
	
	include: jsw.widgets.mixin.InputControl,
	
	members : {
		// Declare and initialize attributes
		_link : null,
		_label : null,
		_maxSize : 0,
		_uploadUrl : null,
		_supportedExts : [],	// deprecated
		_files : [],
		
		
		// Declare methods
		getLink : function() {
			return this._link; 
		},
    
	    _setLink : function( link ) {
			if ( !this._equal(this._link, link) ) {
				var oldValue = this._link;
				this._link = link; 
				this._dispatchAsyncChangePropertyEvent( "link", oldValue, this._link );
			}
	    },
	
	    getLabel : function() {
	    	return this._label; 
	    },
	
	    _setLabel : function( label ) {
			if ( !this._equal(this._label, label) ) {
				var oldValue = this._label;
				this._label = label; 
				this._dispatchAsyncChangePropertyEvent( "label", oldValue, this._label );
			}
	    },
	    
	    getMaxSize : function() {
	    	return this._maxSize; 
	    },
	
	    _setMaxSize : function( bytes ) {
			if ( !this._equal(this._maxSize, bytes) ) {
				var oldValue = this._maxSize;
				this._maxSize = bytes;
				this._dispatchAsyncChangePropertyEvent( "maxSize", oldValue, this._maxSize );
			}
	    },
	    
	    getUploadUrl : function() {
	    	return this._uploadUrl; 
	    },
	
	    _setUploadUrl : function( url ) {
			if ( !this._equal(this._uploadUrl, url) ) {
				var oldValue = this._uploadUrl;
				this._uploadUrl = url; 
				this._dispatchAsyncChangePropertyEvent( "uploadUrl", oldValue, this._uploadUrl );
			}
	    },
	    
	    getSupportedExts : function() {
	    	return this._supportedExts; 
	    },
	
	    _setSupportedExts : function( exts ) {
			if ( !this._equal(this._supportedExts, exts) ) {
				var oldValue = this._supportedExts;
				this._supportedExts = exts; 
				this._dispatchAsyncChangePropertyEvent( "supportedExts", oldValue, this._supportedExts );
			}
	    },
	    
	    getFiles : function() {
	    	return this._files;
	    },
	    
	    _setFiles : function( files ) {
	    	if ( !this._equal(this._files, files) ) {
				var oldValue = this._files;
				this._files = files; 
				this._dispatchAsyncChangePropertyEvent( "files", oldValue, this._files );
			}
	    },
	    
	    setFiles : function( files ) {
	    	if ( !this._equal(this._files, files) ) {
				var oldValue = this._files;
				this._files = files; 
				this._dispatchAsyncChangePropertyEvent( "files", oldValue, this._files );
				this._handlePropertyModification( "Files", "files", this.getFiles(), true ); // supressSend = true
			}
	    }
	}
});
