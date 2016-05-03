
jsw.qx.Class.define( "jsw.widgets.base.JSWItem", {

  extend : jsw.widgets.base.Widget,

  construct : function() {
    this.base( arguments );
    this._renderRole  = '';
    this._renderer    = null; 
    this._visible     = true;
	this._enabled     = true;
	this._toolTipText = '';
  },

  destruct : function() {
  },

  members : {
	  setRenderRole : function(role) {
		  if (typeof role === undefined || role === '' ) {
			  role = null;
		  }
		  if(!this._equal(this._renderRole, role) ) {
			  var oldRole = this._renderRole;
			  this._renderRole = role || null; 
			  this._dispatchAsyncChangePropertyEvent("renderRole", oldRole, this._renderRole);
		  }
	  },
	  
	  getRenderRole : function() {
		  return this._renderRole;
	  },
	  
	  setRenderer : function( renderer ) {
		  this._renderer = renderer || null;
	  },
	  
	  getRenderer : function() {
		  return this._renderer;
	  },
	  
	    // VISIBLE
		isVisible : function() {
			if (this._visible === null) {
				return false;
			}
			return this._visible; 
		},

		setVisible : function( value ) {
			if ( !this._equal(this._visible, value) ) {
				var oldValue = this._visible;
				this._visible = value; 
				this._dispatchAsyncChangePropertyEvent( "visible", oldValue, this._visible );
			}
		},

		// ENABLED
		isEnabled : function() {
			if (this._enabled === null) {
				return false;
			}
			return this._enabled; 
		},

		setEnabled : function( value ) {
			if ( !this._equal(this._enabled, value) ) {
				var oldValue = this._enabled;
				this._enabled = value; 
				this._dispatchAsyncChangePropertyEvent( "enabled", oldValue, this._enabled );
			}
		},


		// TOOLTIP
		getToolTipText : function() {
			return this._toolTipText; 
		},

		setToolTipText : function( toolTipText ) {
			if ( !this._equal(this._toolTipText, toolTipText) ) {
				var oldToolTipText = this._toolTipText;
				this._toolTipText = toolTipText; 
				this._dispatchAsyncChangePropertyEvent( "toolTipText", oldToolTipText, this._toolTipText );
			}
		},

		// UTILS
	  _equal : function(oldValue, newValue) {
		  if( (oldValue == null) != (newValue == null)){
			  return false;
		  } else if( oldValue == null && newValue == null){
			  return true;
		  } else if(oldValue == newValue){
			  return true;
		  } else {
			  return false;
		  }
	  },
		
		// EVENTS
	  _handlePropertyModification : function( listenerName, propertyName, propertyValue, suppressSend ) {
		  var connection = jsw.remote.Connection.getInstance();
		  var remoteObject = connection.getRemoteObject( this );

		  remoteObject.set( propertyName, propertyValue );
		  this._notifyModify( listenerName, connection, null, suppressSend );
	  },
		
	  _notifyEvent : function( listenerName, properties ) {
		  var connection = jsw.remote.Connection.getInstance();
		  this._notifyModify( listenerName, connection, properties );
	  },
	  
	  _notifyModify : function( listenerName, connection, properties, suppressSend ) {
		  if ( typeof connection === 'undefined' || connection === null ) {
			  connection = jsw.remote.Connection.getInstance();
		  }
		  if ( connection && connection.getRemoteObject( this ).isListening( listenerName ) ) {
			  if (listenerName === 'Command' && connection.getMessageWriter().hasOperations() > 0) {
				  connection.sendImmediate( true );
			  }
			  this.__listenerName = listenerName;
			  this.__notifyProps  = properties || null;
			  this.__suppressSend = suppressSend || false;
			  connection.onNextSend( this._onSendProperty, this );
			  connection.sendDelayed( 500 );
		  }
	  },
			 
	  _onSendProperty : function() {
		  var result = false;
		  try { 
			  result = jsw.remote.Connection.getInstance().getRemoteObject( this ).notify( this.__listenerName, this.__notifyProps, this.__suppressSend );
			  // Clean listener variables
			  this.__suppressSend = undefined;
			  this.__listenerName = undefined;
			  this.__notifyProps  = undefined;
			  
		  } catch (ex) {
			  //this.removeEventListener( this.__listenerName, func, obj )
		  }
		  return result;
	  }


  }
} );
