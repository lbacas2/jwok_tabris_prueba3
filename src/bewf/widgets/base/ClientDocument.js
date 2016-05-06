/*******************************************************************************
 * Copyright (c) 2004, 2014 1&1 Internet AG, Germany, http://www.1und1.de,
 *                          EclipseSource, and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    1&1 Internet AG and others - original API and implementation
 *    EclipseSource - adaptation for the Eclipse Remote Application Platform
 ******************************************************************************/


/**
 * This is the basic widget of all qooxdoo applications.
 *
 * jsw.widgets.base.ClientDocument is the parent of all children inside your application. It
 * also handles their resizing and focus navigation.
 *
 * @appearance client-document
 */
jsw.qx.Class.define( "jsw.widgets.base.ClientDocument", {

  extend : jsw.widgets.base.Parent,

  statics : {

    getInstance : function() {
      return jsw.runtime.Singletons.get( jsw.widgets.base.ClientDocument );
    }

  },

  construct : function() {
    this.base( arguments );
    this._window = window;
    this._document = window.document;
	
	if ( !jsw.client.Client.isTabris() && typeof this._document.body !== 'undefined' && this._document.body !== null ) {
		// init element
		this.setElement( this._document.body );
		this.getElement().setAttribute( "spellcheck", "false" );
		// reset absolute position
		this._document.body.style.position = "";
		// cache current size
		this._cachedInnerWidth = this._document.body.offsetWidth;
		this._cachedInnerHeight = this._document.body.offsetHeight;
	}
    // add resize handler
    this.addEventListener( "windowresize", this._onwindowresize );
    // dialog support
    this._modalWidgets = [];
    // enable as focus root behavior
    this.activateFocusRoot();
    // initialize properties
    this.initHideFocus();
    this.initSelectable();
    // register as current focus root
    jsw.event.EventHandler.setFocusRoot( this );
    // Gecko-specific settings
    if( jsw.client.Client.isGecko() ) {
      // Fix for bug 193703:
//      this.getElement().style.position = "absolute";
      this.setSelectable( true );
    }
  },

  events: {
    /** (Fired by {@link jsw.event.EventHandler}) */
    "focus" : "jsw.event.Event",

    /** Fired when the window looses the focus (Fired by {@link jsw.event.EventHandler}) */
    "windowblur" : "jsw.event.Event",

    /** Fired when the window gets the focus (Fired by {@link jsw.event.EventHandler}) */
    "windowfocus" : "jsw.event.Event",

    /** Fired when the window has been resized (Fired by {@link jsw.event.EventHandler}) */
    "windowresize" : "jsw.event.Event"
  },

  properties : {

    appearance : {
      refine : true,
      init : "client-document"
    },

    enableElementFocus : {
      refine : true,
      init : false
    },

    enabled : {
      refine : true,
      init : true
    },

    selectable : {
      refine : true,
      init : false
    },

    hideFocus : {
      refine : true,
      init : true
    },

    /**
     * Sets the global cursor style
     *
     * The name of the cursor to show when the mouse pointer is over the widget.
     * This is any valid CSS2 cursor name defined by W3C.
     *
     * The following values are possible:
     * - default
     * - crosshair
     * - pointer (hand is the ie name and will mapped to pointer in non-ie)
     * - move
     * - n-resize
     * - ne-resize
     * - e-resize
     * - se-resize
     * - s-resize
     * - sw-resize
     * - w-resize
     * - nw-resize
     * - text
     * - wait
     * - help
     * - url([file]) = self defined cursor, file should be an ANI- or CUR-type
     */
    globalCursor : {
      check : "String",
      nullable : true,
      themeable : true,
      apply : "_applyGlobalCursor",
      event : "changeGlobalCursor"
    }
  },

  members : {

    // ------------------------------------------------------------------------
    // OVERWRITE WIDGET FUNCTIONS/PROPERTIES
    // ------------------------------------------------------------------------

    _applyParent : jsw.util.Functions.returnTrue,

    getTopLevelWidget : jsw.util.Functions.returnThis,

    getWindowElement : function() {
      return this._window;
    },

    getDocumentElement : function() {
      return this._document;
    },

    getParent : jsw.util.Functions.returnNull,

    getToolTip : jsw.util.Functions.returnNull,

    isSeeable : jsw.util.Functions.returnTrue,

    _isDisplayable : true,

    _hasParent : false,

    _initialLayoutDone : true,

    _isInDom : true,

    // ------------------------------------------------------------------------
    // BLOCKER AND DIALOG SUPPORT
    // ------------------------------------------------------------------------

    /**
     * Returns the blocker widget if already created; otherwise create it first
     *
     * @return {ClientDocumentBlocker} the blocker widget.
     */
    _getBlocker : function() {
      if( !this._blocker ) {
        // Create blocker instance
        this._blocker = new jsw.widgets.base.ClientDocumentBlocker();
        // Add blocker to client document
        this.add( this._blocker );
      }
      return this._blocker;
    },

    block : function( vActiveChild ) {
      this._getBlocker().show();
      if( jsw.qx.Class.isDefined( "jsw.widgets.base.Window" )
          && vActiveChild instanceof jsw.widgets.base.Window )
      {
        this._modalWidgets.push( vActiveChild );
        var vOrigIndex = vActiveChild.getZIndex();
        this._getBlocker().setZIndex( vOrigIndex );
        vActiveChild.setZIndex( vOrigIndex + 1 );
      }
    },

    release : function( vActiveChild ) {
      if( vActiveChild ) {
        jsw.util.Arrays.remove( this._modalWidgets, vActiveChild );
      }
      var l = this._modalWidgets.length;
      if( l === 0 ) {
        this._getBlocker().hide();
      } else {
        var oldActiveChild = this._modalWidgets[ l - 1 ];
        var old = oldActiveChild.getZIndex();
        this._getBlocker().setZIndex( old );
        oldActiveChild.setZIndex( old + 1 );
      }
    },

    // CSS API

    createStyleElement : function( vCssText ) {
      //return jsw.html.StyleSheet.createElement( vCssText );
    },

    addCssRule : function( vSheet, vSelector, vStyle ) {
      //return jsw.html.StyleSheet.addRule( vSheet, vSelector, vStyle );
    },

    removeCssRule : function( vSheet, vSelector ) {
      //return jsw.html.StyleSheet.removeRule( vSheet, vSelector );
    },

    removeAllCssRules : function( vSheet ) {
      //return jsw.html.StyleSheet.removeAllRules( vSheet );
    },

    // ------------------------------------------------------------------------
    // GLOBAL CURSOR SUPPORT
    // ------------------------------------------------------------------------

    _applyGlobalCursor : jsw.util.Variant.select( "qx.client", {
      // MSHTML uses special code here. The default code works, too in MSHTML
      // but is really really slow. To change style sheets or class names
      // in documents with a deep structure is nearly impossible in MSHTML. It
      // runs multiple seconds to minutes just for adding a new rule to a global
      // style sheet. For the highly interactive use cases of this method, this
      // is not practicable. The alternative implementation directly patches
      // all DOM elements with a manual cursor setting (to work-around the
      // inheritance blocking nature of these local values). This solution does
      // not work as perfect as the style sheet modification in other browsers.
      // While a global cursor is applied the normal cursor property would overwrite
      // the forced global cursor value. This site effect was decided to be less
      // important than the expensive performance issue of the better working code.
      // See also bug: http://bugzilla.qooxdoo.org/show_bug.cgi?id=487
      "mshtml" : function( value, old ) {
        if( value == "pointer" ) {
          value = "hand";
        }
        if( old == "pointer" ) {
          old = "hand";
        }
        var elem, current;
        var list = this._cursorElements;
        if( list ) {
          for( var i = 0, l = list.length; i < l; i++ ) {
            elem = list[ i ];
            if( elem.style.cursor == old ) {
              elem.style.cursor = elem._oldCursor;
              elem._oldCursor = null;
            }
          }
        }
        var all = document.all;
        var list = this._cursorElements = [];
        if( value != null && value !== "" && value !== "auto" ) {
          for( var i = 0, l = all.length; i < l; i++ ) {
            elem = all[ i ];
            current = elem.style.cursor;
            if( current != null && current !== "" && current !== "auto" ) {
              elem._oldCursor = current;
              elem.style.cursor = value;
              list.push( elem );
            }
          }
          // Also apply to body element
          document.body.style.cursor = value;
        } else {
          // Reset from body element
          document.body.style.cursor = "";
        }
      },

      "default" : function( value ) {
        if( !this._globalCursorStyleSheet ) {
          this._globalCursorStyleSheet = this.createStyleElement();
        }
        this.removeCssRule( this._globalCursorStyleSheet, "*" );
        if( value ) {
          this.addCssRule( this._globalCursorStyleSheet, "*", "cursor:" + value + " !important" );
        }
      }
    } ),

    // ------------------------------------------------------------------------
    // WINDOW RESIZE HANDLING
    // ------------------------------------------------------------------------

    _onwindowresize : function() {
      jsw.widgets.util.PopupManager.getInstance().update();
      this._recomputeInnerWidth();
      this._recomputeInnerHeight();
      jsw.widgets.base.Widget.flushGlobalQueues();
    },

    _computeInnerWidth : function() {
      return this._document.body.offsetWidth;
    },

    _computeInnerHeight : function() {
      return this._document.body.offsetHeight;
    }

  },

  defer : function() {
	//  JSW: JSW no interacciona con el dom 
    // CSS fix
	  /*
    var boxSizingAttr = jsw.client.Client.getEngineBoxSizingAttributes();
    var borderBoxCss = boxSizingAttr.join( ":border-box;" ) + ":border-box;";
    var contentBoxCss = boxSizingAttr.join( ":content-box;" ) + ":content-box;";
    jsw.html.StyleSheet.createElement(
      "html,body { margin:0;border:0;padding:0; } " +
      "html { border:0 none; } " +
      "*{" + borderBoxCss +"} " +
      "img{" + contentBoxCss + "}"
    );
    jsw.html.StyleSheet.createElement( "html,body{width:100%;height:100%;overflow:hidden;}" );
    jsw.widgets.base.ClientDocument.BOXSIZING = "border-box";
    */
  },

  destruct : function() {
    this._disposeObjects( "_blocker" );
    this._disposeFields( "_window", "_document", "_modalWidgets", "_globalCursorStyleSheet" );
  }

} );
