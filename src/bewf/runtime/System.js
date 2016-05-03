/*******************************************************************************
 * Copyright (c) 2004, 2014 1&1 Internet AG, Germany, http://www.1und1.de,
 *                          EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    1&1 Internet AG and others - original API and implementation
 *    EclipseSource - adaptation for the Eclipse Remote Application Platform
 ******************************************************************************/

jsw.qx.Class.define( "jsw.runtime.System", {

  extend : jsw.qx.Target,

  statics : {

    getInstance : function() {
      return jsw.runtime.Singletons.get( jsw.runtime.System );
    }

  },

  construct : function() {
    if( this.isSupported() ) {
      this.base( arguments );
      this._startupTime = new Date().getTime();
      // Attach load/unload events
      this._onloadWrapped = jsw.util.Functions.bind( this._onload, this );
      this._onbeforeunloadWrapped = jsw.util.Functions.bind( this._onbeforeunload, this );
      this._onunloadWrapped = jsw.util.Functions.bind( this._onunload, this );
      jsw.html.EventRegistration.addEventListener( window, "load", this._onloadWrapped );
      jsw.html.EventRegistration.addEventListener( window, "beforeunload", this._onbeforeunloadWrapped );
      jsw.html.EventRegistration.addEventListener( window, "unload", this._onunloadWrapped );
      //jsw.graphics.GraphicsUtil.init();
      //this._applyPatches();
      //jsw.event.EventHandler.setAllowContextMenu( jsw.widgets.Menu.getAllowContextMenu );
      //jsw.event.EventHandler.setMenuManager( jsw.widgets.util.MenuManager.getInstance() );
    }
  },

  events : {
    "beforeunload" : "jsw.event.DomEvent",
    "unload" : "jsw.event.Event",
    "uiready" : "jsw.event.Event"
  },

  members : {

    _autoDispose : false,
    _onloadDone : false,
    _uiReady : false,

    setUiReady : function( value ) {
      this._uiReady = value;
      if( value ) {
        this.createDispatchEvent( "uiready" );
      }
    },

    getUiReady : function() {
      return this._uiReady;
    },

    isSupported : function() {
      return this._isBrowserSupported() && this._isModeSupported() && this._isXHRSupported();
    },

/*
    _applyPatches : function() {
      if( jsw.graphics.GraphicsUtil.isSupported() ) {
        if( !jsw.client.Client.supportsCss3() ) {
          jsw.qx.Class.patch( jsw.widgets.base.Parent, jsw.widgets.util.GraphicsMixin );
          jsw.qx.Class.patch( jsw.widgets.base.BasicText, jsw.widgets.util.GraphicsMixin );
          jsw.qx.Class.patch( jsw.widgets.base.GridRow, jsw.widgets.util.GraphicsMixin );
          jsw.qx.Class.patch( jsw.widgets.base.MultiCellWidget, jsw.widgets.util.GraphicsMixin );
        } else {
          jsw.qx.Class.patch( jsw.widgets.ProgressBar, jsw.widgets.util.GraphicsMixin );
        }
      }
    },
*/
    
    getStartupTime : function() {
      return this._startupTime;
    },

    _onload : function( event ) {
      try {
        if( !this._onloadDone ) {
          this._onloadDone = true;
          //jsw.widgets.base.ClientDocument.getInstance();
          //jsw.runtime.MobileWebkitSupport.init();
          jsw.client.Timer.once( this._preload, this, 0 );
        }
      } catch( ex ) {
        jsw.runtime.ErrorHandler.processJavaScriptError( ex );
      }
    },

    _preload : function() {
      var visibleImages = jsw.html.ImageManager.getInstance().getVisibleImages();
      this.__preloader = new jsw.html.ImagePreloaderSystem( visibleImages, this._preloaderDone, this );
      this.__preloader.start();
    },

    _preloaderDone : function() {
      this.__preloader.dispose();
      this.__preloader = null;
      jsw.event.EventHandler.init();
      jsw.event.EventHandler.attachEvents();
      this.setUiReady( true );
      jsw.widgets.base.Widget.flushGlobalQueues();
      jsw.client.Timer.once( this._postload, this, 100 );
    },

    _postload : function() {
      var hiddenImages = jsw.html.ImageManager.getInstance().getHiddenImages();
      this.__postloader = new jsw.html.ImagePreloaderSystem( hiddenImages, this._postloaderDone, this );
      this.__postloader.start();
    },

    _postloaderDone : function() {
      this.__postloader.dispose();
      this.__postloader = null;
    },

    _onbeforeunload : function( event ) {
      try {
        var domEvent = new jsw.event.DomEvent( "beforeunload", event, window, this );
        this.dispatchEvent( domEvent, false );
        var msg = domEvent.getUserData( "returnValue" );
        domEvent.dispose();
        return msg !== null ? msg : undefined;
      } catch( ex ) {
        jsw.runtime.ErrorHandler.processJavaScriptError( ex );
      }
    },

    _onunload : function( event ) {
      try {
        this.createDispatchEvent( "unload" );
        jsw.event.EventHandler.detachEvents();
        jsw.event.EventHandler.cleanUp();
        jsw.qx.Object.dispose( true );
      } catch( ex ) {
        jsw.runtime.ErrorHandler.processJavaScriptError( ex );
      }
    },

    _isBrowserSupported : function() {
      var result = true;
      var engine = jsw.client.Client.getEngine();
      var version = jsw.client.Client.getMajor();
      if( engine === "mshtml" && version < 7 ) {
        result = false;
      }
      return result;
    },

    _isModeSupported : function() {
      var result = true;
      var engine = jsw.client.Client.getEngine();
      if( engine === "newmshtml" && document.documentMode < 9 ) {
        result = false;
      }
      return result;
    },

    _isXHRSupported : function() {
      return typeof window.XMLHttpRequest !== "undefined";
    }

  },

  destruct : function() {
    jsw.html.EventRegistration.removeEventListener( window, "load", this._onloadWrapped );
    jsw.html.EventRegistration.removeEventListener( window, "beforeunload", this._onbeforeunloadWrapped );
    jsw.html.EventRegistration.removeEventListener( window, "unload", this._onunloadWrapped );
  },

  defer : function( statics, proto, properties )  {
    // Force direct creation
    statics.getInstance();
  }

} );
