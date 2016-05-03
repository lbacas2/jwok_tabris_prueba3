
jsw.qx.Class.define( "jsw.widgets.JSWDisplay", {
	extend : jsw.qx.Target,

	statics : {
		getCurrent : function() {
			return jsw.runtime.Singletons.get( jsw.widgets.JSWDisplay );
		}
	},
	
	construct : function() {
		this.base( arguments );
		
		this._shellManager      = new jsw.widgets.util.JSWShellManager();
		this._server            = jsw.remote.Connection.getInstance();
		this._jswConnection     = null;
		this._exitConfirmation  = null;
		this._hasResizeListener = false;
		this._initialized       = false; 
	},

	members : {
		/*
		 _onAppearFocus = function( evt ) {
		  var widget = this;
		  widget.focus();
		  widget.removeEventListener( "appear", jsw.widgets.JSWDisplay._onAppearFocus, widget );
		};
		 */
		
		applyObjectId : function() {
			if( !this._initialized ) {
				this.init();
			}
		},

		init : function() {
		    this._server.getMessageWriter().appendHead( "rwt_initialize", true );
		    this._appendQueryString();
		    this._appendInitialHistoryEvent();
		    this._appendTimezoneOffset();
		    this._attachListener();
		    this._server.send();
		    this._initialized = true;
		},
		
		_setJSWConnection : function(pjswConnection) {
		    this._jswConnection = pjswConnection;
		},
		  
		getJSWConnection : function() {
			var jswDisplay = this.getJSWDisplay();
		    if(jswDisplay){
		    	return jswDisplay.getJSWConnection();
		    }
		    return null;
		},
		
		allowEvent : function() {
		    // NOTE : in the future might need a parameter if there are multiple types of cancelable events
		    jsw.remote.KeyEventSupport.getInstance().allowEvent();
		},

		cancelEvent : function() {
			jsw.remote.KeyEventSupport.getInstance().cancelEvent();
		},

		beep : function() {
		    // do nothing for now, used by native clients
		},
		
		/**
		 * An exit confirmation dialog will be displayed if the given message is not
		 * null. If the message is empty, the dialog will be displayed but without a
		 * message.
		 */
		setExitConfirmation : function( message ) {
			this._exitConfirmation = message;
		},

		setFocusControl : function( widgetId ) {
		/*
			var widget = jsw.remote.ObjectRegistry.getObject( widgetId );
			if ( widget.isSeeable() ) {
				widget.focus();
			} else {
				widget.addEventListener( "appear", jsw.widgets.JSWDisplay._onAppearFocus, widget );
			}
		*/
		},
		
		/*
		setMnemonicActivator : function( value ) {
			jsw.widgets.util.MnemonicHandler.getInstance().setActivator( value );
		},

		setEnableUiTests : function( value ) {
			jsw.widgets.base.Widget._renderHtmlIds = value;
		},
		*/
		
		setHasResizeListener : function( value ) {
		    this._hasResizeListener = value;
		},

		////////////////////////
		// Global Event handling

		_attachListener : function() {
		    this._server.addEventListener( "send", this._onSend, this );
		    //jsw.remote.KeyEventSupport.getInstance(); // adds global KeyListener
		    jsw.runtime.System.getInstance().addEventListener( "beforeunload", this._onBeforeUnload, this );
		    jsw.runtime.System.getInstance().addEventListener( "unload", this._onUnload, this );
		},
		
		_onSend : function( evt ) {
			// jsw.remote.Connection.getInstance().getRemoteObject( this ).set( "cursorLocation", location );
		},

		_onBeforeUnload : function( event ) {
			if( this._exitConfirmation !== null && this._exitConfirmation !== "" ) {
				event.getDomEvent().returnValue = this._exitConfirmation;
				event.setUserData( "returnValue", this._exitConfirmation );
		    }
		},

		_onUnload : function() {
		    this._server.removeEventListener( "send", this._onSend, this ); 
		    this._sendShutdown();
		},
		
		///////////////////
		// client to server

		_sendShutdown : function() {
		    var server = jsw.remote.Connection.getInstance();
		    server.getMessageWriter().appendHead( "shutdown", true );
		    server.sendImmediate( false );
		},
		
		_appendInitialHistoryEvent : function() {
			var state = window.location.hash;
			if( state !== "" ) {
				var type = "jsw.client.BrowserNavigation";
				var history = jsw.client.BrowserNavigation.getInstance();
				var handler = jsw.remote.HandlerRegistry.getHandler( type );
				// TODO: Temporary workaround for 388835
				jsw.remote.ObjectRegistry.add( type, history, handler );
				jsw.remote.Connection.getInstance().getRemoteObject( history ).notify( "Navigation", {
						"state" : decodeURIComponent( state.substr( 1 ) )
			    } );
			}
		},
			
		_appendTimezoneOffset : function() {
			// NOTE : using ObjectRegistry implicitly registers the ClientInfo service
			var clientObject = jsw.remote.ObjectRegistry.getObject( "jsw.client.ClientInfo" );
			var remoteObject = jsw.remote.Connection.getInstance().getRemoteObject( clientObject );
			remoteObject.set( "timezoneOffset", clientObject.getTimezoneOffset() );
		},
		
		_appendQueryString : function() {
			var queryString = window.location.search;
		    if( queryString !== "" ) {
		    	this._server.getMessageWriter().appendHead( "queryString", queryString.substr( 1 ) );
		    }
		},
		
		///////////////////
		// Shells management 
		
		addJSWShell : function( jswshell ) {
			this._shellManager.add(jswshell);
			jswshell._setJSWDisplay(this);
			var eventData = {};
			eventData.newWidget = jswshell;
			var event = new jsw.widgets.base.WidgetEvent(jsw.widgets.base.WidgetEvent.WidgetEventType_CHILD_CREATE, this, eventData);
			this._dispatchAsyncEvent( jsw.qx.Target.CREATE_QUEUE, event);
			return;
		},

		removeJSWShell : function( jswshell ) {
			this._shellManager.remove(jswshell);
			var eventData = {};
			eventData.removeWidget = jswshell;
			var event = new jsw.widgets.base.WidgetEvent(jsw.widgets.base.WidgetEvent.WidgetEventtype_CHILD_DISPOSE, this, eventData);
			this._dispatchAsyncEvent( jsw.qx.Target.REMOVE_QUEUE, event);
			return;
		},

		getJSWShells : function( jswshell ) {
			return this._shellManager.getAll();
		},

	}
} );

