/*******************************************************************************
 * Copyright (c) 2002, 2014 Innoopract Informationssysteme GmbH and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Innoopract Informationssysteme GmbH - initial API and implementation
 *    EclipseSource - ongoing development
 ******************************************************************************/

(function() {

var Client = jsw.client.Client;
var Timer = jsw.client.Timer;
var Processor = jsw.remote.MessageProcessor;
var ErrorHandler = jsw.runtime.ErrorHandler;
var EventUtil = jsw.remote.EventUtil;
var ServerPush = jsw.client.ServerPush;
var ClientDocument = jsw.widgets.base.ClientDocument;
var Widget = jsw.widgets.base.Widget;

jsw.qx.Class.define( "jsw.remote.Connection", {

  extend : jsw.qx.Target,

  statics : {

    getInstance : function() {
      return jsw.runtime.Singletons.get( jsw.remote.Connection );
    }

  },

  construct : function() {
    this.base( arguments );
    this._url = "";
    this._writer = null;
    this._event = null;
    this._requestCounter = null;
    this._requestPending = false;
    this._connectionId = this._generateConnectionId();
    this._sendTimer = new Timer( 60 );
    this._sendTimer.addEventListener( "interval", function() {
      this.sendImmediate( true );
     }, this );
    this._delayTimer = new Timer();
    this._delayTimer.addEventListener( "interval", function() {
      this._delayTimer.stop();
      this.send();
    }, this );
    this._waitHintTimer = new Timer( 1000 );
    this._waitHintTimer.addEventListener( "interval", this._showWaitHint, this );
    this._retryHandler = null;
    this._sendListeners = [];
  },

  destruct : function() {
    this._retryHandler = null;
    this._sendTimer.dispose();
    this._sendTimer = null;
    this._waitHintTimer.dispose();
    this._waitHintTimer = null;
  },

  members : {

    //////
    // API

    setUrl : function( url ) {
      this._url = url;
    },

    getUrl : function() {
      return this._url;
    },

    setRequestCounter : function( requestCounter ) {
      this._requestCounter = requestCounter;
    },

    getRequestCounter : function() {
      return this._requestCounter;
    },

    getConnectionId : function() {
      return this._connectionId;
    },

    _generateConnectionId : function() {
      return Math.floor( Math.random() * 0xffffffff ).toString( 16 );
    },

    _flushEvent : function() {
      if( this._event ) {
        var writer = this.getMessageWriter();
        this._event[ 1 ] = this._event[ 1 ].split( "." ).pop();
        writer.appendNotify.apply( writer, this._event );
        this._event = null;
      }
    },

    sendDelayed : function( time ) {
      this._delayTimer.setInterval( time );
      this._delayTimer.start();
    },

    /**
     * Sends an asynchronous request within 60 milliseconds
     */
    send : function() {
      this._sendTimer.start();
    },

    /**
     * Sends an synchronous or asynchronous request immediately. All parameters that were added
     * since the last request will be sent.
     */
    sendImmediate : function( async ) {
      this._delayTimer.stop();
      if( this._requestPending && async ) {
        this._sendTimer.stop();
        this.send();
      } else {
        this._flushEvent();
        this.dispatchSimpleEvent( "send" );
        bewf._.notify( "send" );
        this._flushEvent();
        this._sendTimer.stop();
        if( this._requestCounter != null ) {
          this.getMessageWriter().appendHead( "requestCounter", this._requestCounter );
        }
        this._requestPending = true;
        this._startWaitHintTimer();
        var request = this._createRequest();
        request.setAsynchronous( async );
        request.setData( this.getMessageWriter().createMessage() );
        this._writer.dispose();
        this._writer = null;
        request.send();
        this._removeSendListeners();
      }
    },

    getMessageWriter : function() {
      if( this._writer === null ) {
        this._writer = new jsw.remote.MessageWriter();
      }
      return this._writer;
    },

    getRemoteObject : function( target ) {
      return jsw.remote.RemoteObjectFactory.getRemoteObject( target );
    },

    onNextSend : function( func, context ) {
      this._sendListeners.push( [ func, context ] );
      this.addEventListener( "send", func, context );
    },

    getWaitHintTimer : function() {
      return this._waitHintTimer;
    },

    _startWaitHintTimer : function() {
      if( !this.getMessageWriter().getHead( "rwt_initialize" ) ) {
        this._waitHintTimer.start();
      }
    },

    _removeSendListeners : function() {
      for( var i = 0; i < this._sendListeners.length; i++ ) {
        var item = this._sendListeners[ i ];
        this.removeEventListener( "send", item[ 0 ], item[ 1 ] );
      }
      this._sendListeners = [];
    },

    ////////////
    // Internals

    _createRequest : function() {
      var parameters = "cid=" + this._connectionId;
      var url = this._url + ( this._url.indexOf( "?" ) >= 0 ? "&" : "?" ) + parameters;
      var result = new jsw.remote.Request( url, "POST", "application/json" );
      result.setSuccessHandler( this._handleSuccess, this );
      result.setErrorHandler( this._handleError, this );
      return result;
    },

    ////////////////////////
    // Handle request events

    _handleError : function( event ) {
      this._hideWaitHint();
      if( this._isConnectionError( event.status ) ) {
        this._handleConnectionError( event );
      } else {
        var text = event.responseText;
        if( text && text.length > 0 ) {
          if( this._isJsonResponse( event ) ) {
            var messageObject = JSON.parse( text );
            ErrorHandler.showErrorBox( messageObject.head.error, true );
          } else {
            ErrorHandler.showErrorPage( text );
          }
        } else {
          ErrorHandler.showErrorBox( "request failed" );
        }
      }
    },

    _handleSuccess : function( event ) {
      try {
        var messageObject = JSON.parse( event.responseText );
        jsw.remote.EventUtil.setSuspended( true );
        var that = this;
        Processor.processMessage( messageObject, function() {
          that._requestPending = false;
          Widget.flushGlobalQueues();
          bewf._.notify( "render" );
          jsw.remote.EventUtil.setSuspended( false );
          ServerPush.getInstance().sendServerPushRequest();
          that.dispatchSimpleEvent( "received" );
          that._hideWaitHint();
        } );
      } catch( ex ) {
        ErrorHandler.processJavaScriptErrorInResponse( event.responseText, ex, event.target );
        this._hideWaitHint();
      }
    },

    ///////////////////////////////
    // Handling connection problems

    _handleConnectionError : function( event ) {
      ClientDocument.getInstance().setGlobalCursor( null );
      jsw.runtime.ErrorHandler.showErrorBox( "connection error", false );
      this._retryHandler = function() {
        var request = this._createRequest();
        var failedRequest = event.target;
        request.setAsynchronous( failedRequest.getAsynchronous() );
        request.setData( failedRequest.getData() );
        request.send();
      };
    },

    _retry : function() {
      try {
        ErrorHandler.hideErrorBox();
        this._showWaitHint();
        this._retryHandler();
      } catch( ex ) {
        jsw.runtime.ErrorHandler.processJavaScriptError( ex );
      }
    },

    _isConnectionError : jsw.util.Variant.select( "qx.client", {
      "mshtml|newmshtml" : function( statusCode ) {
        // for a description of the IE status codes, see
        // http://support.microsoft.com/kb/193625
        var result = (    statusCode === 12007    // ERROR_INTERNET_NAME_NOT_RESOLVED
                       || statusCode === 12029    // ERROR_INTERNET_CANNOT_CONNECT
                       || statusCode === 12030    // ERROR_INTERNET_CONNECTION_ABORTED
                       || statusCode === 12031    // ERROR_INTERNET_CONNECTION_RESET
                       || statusCode === 12152    // ERROR_HTTP_INVALID_SERVER_RESPONSE
                       || statusCode === 0 );     // Some modern IEs use standard, but not all
        return result;
      },
      "gecko" : function( statusCode ) {
        // Firefox 3 reports other statusCode than oder versions (bug #249814)
        var result;
        // Check if Gecko > 1.9 is running (used in FF 3)
        // Gecko/app integration overview: http://developer.mozilla.org/en/Gecko
        if( Client.getMajor() * 10 + Client.getMinor() >= 19 ) {
          result = ( statusCode === 0 );
        } else {
          result = ( statusCode === -1 );
        }
        return result;
      },
      "default" : function( statusCode ) {
        return statusCode === 0;
      }
    } ),

    _isJsonResponse : function( event ) {
      var contentType = event.responseHeaders[ "Content-Type" ];
      return contentType.indexOf( "application/json" ) !== -1;
    },

    ///////////////////////////////////////////////////
    // Wait hint - UI feedback while request is running

    _showWaitHint : function() {
      this._waitHintTimer.stop();
      ClientDocument.getInstance().setGlobalCursor( "progress" );
      ErrorHandler.showWaitHint();
    },

    _hideWaitHint : function() {
      this._waitHintTimer.stop();
      ErrorHandler.hideErrorBox();
      // TODO: Explota al instanciar ClientDocument
      //ClientDocument.getInstance().setGlobalCursor( null );
    }

  }
} );

}());

/**
 * Path that points to the "resources/resource" path in the bundle. Files
 * must be registered in ClientResources.java.
 */
jsw.remote.Connection.RESOURCE_PATH = "./jsw-resources/resource/";
