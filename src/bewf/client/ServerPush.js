/*******************************************************************************
 * Copyright (c) 2011, 2014 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

var jws = require("../../jws.js");
 
jws.namespace( "jsw.client" );

jsw.client.ServerPush = function() {
  this._retryCount = 0;
  this._active = false;
  this._running = false;
  this._requestTimer = new jsw.client.Timer( 0 );
  this._requestTimer.addEventListener( "interval", this._doSendServerPushRequest, this );
};

jsw.client.ServerPush.getInstance = function() {
  return jsw.runtime.Singletons.get( jsw.client.ServerPush );
};

jsw.client.ServerPush.prototype = {

  setActive : function( active ) {
    this._active = active;
  },

  sendServerPushRequest : function() {
    if( this._active && !this._running ) {
      this._running = true;
      this._requestTimer.start();
    }
  },

  // workaround for bug 353819 - send ServerPushRequest with a timer
  _doSendServerPushRequest : function() {
    this._requestTimer.stop();
    this._createRequest().send();
  },

  _createRequest : function() {
    var connection = jsw.remote.Connection.getInstance();
    var request = new jsw.remote.Request( connection.getUrl(), "GET", "application/javascript" );
    request.setSuccessHandler( this._handleSuccess, this );
    request.setErrorHandler( this._handleError, this );
    request.setData( "servicehandler=org.jwok.eclipse.rap.serverpush&cid=" + connection.getConnectionId() );
    return request;
  },

  _handleSuccess : function( event ) {
    this._running = false;
    this._retryCount = 0;
    this._sendUIRequest();
  },

  _sendUIRequest : function() {
    jsw.remote.Connection.getInstance().sendImmediate( true );
  },

  _handleError : function( event ) {
    this._running = false;
    if( jsw.remote.Connection.getInstance()._isConnectionError( event.status ) ) {
      if( this._retryCount < 3 ) {
        var delay = 1000 * this._retryCount++;
        jsw.client.Timer.once( this.sendServerPushRequest, this, delay );
      } else {
        this._handleConnectionError();
      }
    } else {
      this._handleServerError( event );
    }
  },

  _handleConnectionError : function() {
    jsw.remote.Connection.getInstance().sendImmediate( true );
  },

  _handleServerError : function( event ) {
    var text = event.responseText;
    if( text && text.length > 0 ) {
      jsw.runtime.ErrorHandler.showErrorPage( text );
    } else {
      jsw.runtime.ErrorHandler.showErrorBox( "request failed" );
    }
  }

};
