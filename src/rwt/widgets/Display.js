/*******************************************************************************
 * Copyright (c) 2011, 2013 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

namespace( "rwt.widgets" );

rwt.widgets.Display = function( properties ) {
  if( rwt.widgets.Display._current !== undefined ) {
    throw new Error( "Display can not be created twice" );
  }
  rwt.widgets.Display._current = this;
  this._server = rwt.remote.Connection.getInstance();
  this._exitConfirmation = null;
  this._hasResizeListener = false;
  this._initialized = false;
};

rwt.widgets.Display.getCurrent = function() {
  return rwt.widgets.Display._current;
};



rwt.widgets.Display._onAppearFocus = function( evt ) {
  var widget = this;
  widget.focus();
  widget.removeEventListener( "appear", rwt.widgets.Display._onAppearFocus, widget );
};

rwt.widgets.Display.prototype = {

  applyObjectId : function() {
    if( !this._initialized ) {
      this.init();
    }
  },

  init : function() {
    this._server.getMessageWriter().appendHead( "rwt_initialize", true );
    this._appendQueryString();
    //this._appendWindowSize();
    //this._appendSystemDPI();
    //this._appendColorDepth();
    this._appendInitialHistoryEvent();
    this._appendTimezoneOffset();
    this._attachListener();
    this._server.send();
    this._initialized = true;
  },

  
  _setJSWConnection : function(pjswConnection){
    this._jswConnection = pjswConnection;
  },
  
  getJSWConnection : function(){
    var jswDisplay = this.getJSWDisplay();
    if(jswDisplay){
      return jswDisplay.getJSWConnection();
    }
    return null;
  },
	
  
  allowEvent : function() {
    // NOTE : in the future might need a parameter if there are multiple types of cancelable events
    rwt.remote.KeyEventSupport.getInstance().allowEvent();
  },

  cancelEvent : function() {
    rwt.remote.KeyEventSupport.getInstance().cancelEvent();
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
    var widget = rwt.remote.ObjectRegistry.getObject( widgetId );
    if( widget.isSeeable() ) {
      widget.focus();
    } else {
      widget.addEventListener( "appear", rwt.widgets.Display._onAppearFocus, widget );
    }
  },

  setMnemonicActivator : function( value ) {
    rwt.widgets.util.MnemonicHandler.getInstance().setActivator( value );
  },

  setEnableUiTests : function( value ) {
    rwt.widgets.base.Widget._renderHtmlIds = value;
  },

  /*
  getDPI : function() {
    var result = [ 0, 0 ];
    if( typeof screen.systemXDPI == "number" ) {
      result[ 0 ] = parseInt( screen.systemXDPI, 10 );
      result[ 1 ] = parseInt( screen.systemYDPI, 10 );
    } else {
      var testElement = document.createElement( "div" );
      testElement.style.width = "1in";
      testElement.style.height = "1in";
      testElement.style.padding = 0;
      document.body.appendChild( testElement );
      result[ 0 ] = parseInt( testElement.offsetWidth, 10 );
      result[ 1 ] = parseInt( testElement.offsetHeight, 10 );
      document.body.removeChild( testElement );
    }
    return result;
  },
  */

  setHasResizeListener : function( value ) {
    this._hasResizeListener = value;
  },

  ////////////////////////
  // Global Event handling

  _attachListener : function() {
    //this._document.addEventListener( "windowresize", this._onResize, this );
    //this._document.addEventListener( "keypress", this._onKeyPress, this );
    this._server.addEventListener( "send", this._onSend, this );
    rwt.remote.KeyEventSupport.getInstance(); // adds global KeyListener
    rwt.runtime.System.getInstance().addEventListener( "beforeunload", this._onBeforeUnload, this );
    rwt.runtime.System.getInstance().addEventListener( "unload", this._onUnload, this );
  },

  /*
  _onResize : function( evt ) {
    this._appendWindowSize();
    if( this._hasResizeListener ) {
      rwt.remote.Connection.getInstance().getRemoteObject( this ).notify( "Resize", null, 500 );
    }
  },

  _onKeyPress : function( evt ) {
    if( evt.getKeyIdentifier() == "Escape" ) {
      evt.preventDefault();
    }
  },
  */
  
  _onSend : function( evt ) {
	  // rwt.remote.Connection.getInstance().getRemoteObject( this ).set( "cursorLocation", location );
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
    var server = rwt.remote.Connection.getInstance();
    server.getMessageWriter().appendHead( "shutdown", true );
    server.sendImmediate( false );
  },

  _appendWindowSize : function() {
    var width = rwt.html.Window.getInnerWidth( window );
    var height = rwt.html.Window.getInnerHeight( window );
    var bounds = [ 0, 0, width, height ];
    rwt.remote.Connection.getInstance().getRemoteObject( this ).set( "bounds", bounds );
  },

  _appendSystemDPI : function() {
    //var dpi = this.getDPI();
    //rwt.remote.Connection.getInstance().getRemoteObject( this ).set( "dpi", dpi );
  },

  _appendColorDepth : function() {
    var depth = 16;
    if( typeof screen.colorDepth == "number" ) {
      depth = parseInt( screen.colorDepth, 10 );
    }
    if( rwt.client.Client.isGecko() ) {
      // Firefox detects 24bit and 32bit as 24bit, but 32bit is more likely
      depth = depth == 24 ? 32 : depth;
    }
    rwt.remote.Connection.getInstance().getRemoteObject( this ).set( "colorDepth", depth );
  },

  _appendInitialHistoryEvent : function() {
    var state = window.location.hash;
    if( state !== "" ) {
      var type = "rwt.client.BrowserNavigation";
      var history = rwt.client.BrowserNavigation.getInstance();
      var handler = rwt.remote.HandlerRegistry.getHandler( type );
      // TODO: Temporary workaround for 388835
      rwt.remote.ObjectRegistry.add( type, history, handler );
      rwt.remote.Connection.getInstance().getRemoteObject( history ).notify( "Navigation", {
        "state" : decodeURIComponent( state.substr( 1 ) )
      } );
    }
  },

  _appendTimezoneOffset : function() {
    // NOTE : using ObjectRegistry implicitly registers the ClientInfo service
    var clientObject = rwt.remote.ObjectRegistry.getObject( "rwt.client.ClientInfo" );
    var remoteObject = rwt.remote.Connection.getInstance().getRemoteObject( clientObject );
    remoteObject.set( "timezoneOffset", clientObject.getTimezoneOffset() );
  },

  _appendQueryString : function() {
    var queryString = window.location.search;
    if( queryString !== "" ) {
      this._server.getMessageWriter().appendHead( "queryString", queryString.substr( 1 ) );
    }
  }

};
