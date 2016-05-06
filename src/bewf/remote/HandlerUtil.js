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
 
jws.namespace( "jsw.remote" );

jsw.remote.HandlerUtil = {

  SERVER_DATA : "org.jwok.eclipse.swt.widgets.Widget#data",

  _controlDestructor : function( widget ) {
    jsw.remote.HandlerUtil._widgetDestructor( widget );
  },

  _childrenFinder : function( widget ) {
    return jsw.remote.HandlerUtil.getDestroyableChildren( widget );
  },

  _widgetDestructor : function( widget ) {
    var parent = widget.getUserData( "protocolParent" );
    if( parent ) {
      jsw.remote.HandlerUtil.removeDestroyableChild( parent, widget );
    }
    widget.setToolTipText( null );
    widget.destroy();
  },

  _controlProperties : [
    /**
     * @name setRenderRole
     * @methodOf Item#
     * @description Sets the receiver's role id to the argument, which
     * may be null indicating that no role id should be set.
     * @param {string|null} renderRole the new role id (or null)
     */
    "renderRole",
    "children",
    "tabIndex",
    "toolTipMarkupEnabled",
    /**
     * @name setToolTipText
     * @methodOf Control#
     * @description Sets the receiver's tool tip text to the argument, which
     * may be null indicating that no tool tip text should be shown.
     * @param {string|null} toolTipText the new tool tip text (or null)
     */
    "toolTip",
    "toolTipText",
    /**
     * @name setVisible
     * @methodOf Control#
     * @description Marks the receiver as visible if the argument is <code>true</code>,
     * and marks it invisible otherwise.
     * <p>
     * If one of the receiver's ancestors is not visible or some
     * other condition makes the receiver not visible, marking
     * it visible may not actually cause it to be displayed.
     * </p>
     * <p>
     * <b>NOTE:</b> If there is a <code>Show</code> or <code>Hide</code> Java listener attached
     * to this widget, it may be notified at a later point in time. <code>ClientListener</code>
     * are notified right away.
     * </p>
     * @param {boolean} visible the new visibility state
     */
    "visible",
    /**
     * @name setEnabled
     * @methodOf Control#
     * @description Enables the receiver if the argument is <code>true</code>,
     * and disables it otherwise. A disabled control is typically
     * not selectable from the user interface and draws with an
     * inactive or "grayed" look.
     *
     * @param {boolean} enabled the new enabled state
     */
    "enabled",
    "activeKeys",
    "cancelKeys"
  ],

  _controlPropertyHandler : {
    "data" : function( target, value ) {
      var map = jsw.remote.HandlerUtil.getServerData( target );
      jsw.util.Objects.mergeWith( map, value );
      target.dispatchSimpleEvent( "dataChanged" );
    },
    "children" : function( widget, value ) {
      if( value !== null ) {
        var childrenCount = value.length;
        var applyZIndex = function( child ) {
          var index = value.indexOf( jsw.remote.ObjectRegistry.getId( child ) );
          child.setZIndex( childrenCount - index );
        };
        for( var i = 0; i < childrenCount; i++ ) {
          jsw.remote.HandlerUtil.callWithTarget( value[ i ], applyZIndex );
        }
      }
      widget.setUserData( "jsw_Children", value );
    },
    "toolTipText" : function( widget, value ) {
      widget.setToolTipText( value );
    },
    "renderRole" : function( widget, value ) {
        widget.setRenderRole(value);
    },
    "visible" : function( widget, value ) {
        widget.setVisible(value);
    },
    "enabled" : function( widget, value ) {
	    widget.setEnabled(value);
	},
    "activeKeys" : function( widget, value ) {
      var map = jsw.util.Objects.fromArray( value );
      widget.setUserData( "activeKeys", map );
    },
    "cancelKeys" : function( widget, value ) {
      var map = jsw.util.Objects.fromArray( value );
      widget.setUserData( "cancelKeys", map );
    }
  },

  _controlListeners : [
    "FocusIn",
    "FocusOut",
    "MouseDoubleClick",
    "Help"
  ],

  _controlListenerHandler : {
    "FocusIn" : function( widget, value ) {
      var context = jsw.remote.EventUtil;
      var focusGained = jsw.remote.EventUtil.focusGained;
      if( value ) {
        widget.addEventListener( "focusin", focusGained, context );
      } else {
        widget.removeEventListener( "focusin", focusGained, context );
      }
    },
    "FocusOut" : function( widget, value ) {
      var context = jsw.remote.EventUtil;
      var focusLost = jsw.remote.EventUtil.focusLost;
      if( value ) {
        widget.addEventListener( "focusout", focusLost, context );
      } else {
        widget.removeEventListener( "focusout", focusLost, context );
      }
    },
    "MouseDoubleClick" : function( widget, value ) {
      var context;
      var mouseDoubleClick = jsw.remote.EventUtil.mouseDoubleClick;
      var mouseUpCounter = jsw.remote.EventUtil.mouseUpCounter;
      if( value ) {
        widget.addEventListener( "mousedown", mouseDoubleClick, context );
        widget.addEventListener( "mouseup", mouseUpCounter, context );
      } else {
        widget.removeEventListener( "mousedown", mouseDoubleClick, context );
        widget.removeEventListener( "mouseup", mouseUpCounter, context );
      }
    },
    "Help" : function( widget, value ) {
      var context;
      var helpRequested = jsw.remote.EventUtil.helpRequested;
      if( value ) {
        widget.addEventListener( "keydown", helpRequested, context );
      } else {
        widget.removeEventListener( "keydown", helpRequested, context );
      }
    }
  },

  _specialHandler : {},

  _listenerMethodHandler : {
    "addListener": function( widget, properties ) {
      jsw.remote.HandlerUtil.callWithTarget( properties.listenerId, function( targetFunction ) {
        jsw.scripting.EventBinding.addListener( widget, properties.eventType, targetFunction );
      } );
    },
    "removeListener": function( widget, properties ) {
      jsw.remote.HandlerUtil.callWithTarget( properties.listenerId, function( targetFunction ) {
        jsw.scripting.EventBinding.removeListener( widget, properties.eventType, targetFunction );
      } );
    }
  },

  /**
   * @private
   * @class jsw Scripting analog to org.jwok.eclipse.swt.widgets.Control. All controls given by
   * {@link rap.getObject} are instances of this type, even if their specific subtype is not
   * documented.
   * @name Control
   * @extends Widget
   * @description The constructor is not public.
   * @since 2.2
   */
  _controlScriptingMethods : /** @lends Control.prototype */ {

    /**
     * @name addListener
     * @methodOf Control#
     * @description Register the function as a listener of the given type
     * @param {string} type The type of the event (e.g. SWT.Resize).
     * @param {Function} listener The callback function. It is executed in global context.
     */
    addListener : function( type, listener ) {
      jsw.scripting.EventBinding.addListener( this, type, listener );
    },

    /**
     * @name removeListener
     * @methodOf Control#
     * @description De-register the function as a listener of the given type
     * @param {string} type The type of the event (e.g. SWT.Resize).
     * @param {Function} listener The callback function
     */
    removeListener : function( type, listener ) {
      jsw.scripting.EventBinding.removeListener( this, type, listener );
    },

    /**
     * @description Sets the application defined property of the receiver
     * with the specified name to the given value.
     * <p>
     *   The java widget is not affected by this method, but can itself set this object's
     *   properties if the name was registered with WidgetUtil.registerDataKeys.
     * </p>
     * @param {string} property the name of the property
     * @param {*} value the new value for the property
     * @see Control#getData
     */
    setData : function( property, value ) {
      if( arguments.length !== 2 ) {
        var msg =  "Wrong number of arguments in setData: Expected 2, found " + arguments.length;
        throw new Error( msg );
      }
      var data = jsw.remote.HandlerUtil.getServerData( this );
      data[ property ] = value;
      this.dispatchSimpleEvent( "dataChanged" );
    },

    /**
     * @description  Returns the application defined property of the receiver
     * with the specified name, or null if it has not been set.
     * <p>
     *   The java widget properties can be accessed if the
     *   property name was registered with WidgetUtil.registerDataKeys.
     * </p>
     * @param {string} property the name of the property
     * @return {*} the value
     * @see Control#setData
     */
    getData : function( property ) {
      if( arguments.length !== 1 ) {
        var msg =  "Wrong number of arguments in getData: Expected 1, found " + arguments.length;
        throw new Error( msg );
      }
      var result = null;
      var data = jsw.remote.HandlerUtil.getServerData( this );
      if( typeof data[ property ] !== "undefined" ) {
        result = data[ property ];
      }
      return result;
    },
    /**
     * @description  Forces the receiver to have the <em>keyboard focus</em>, causing
     * all keyboard events to be delivered to it.
     * @return {boolean} <code>true</code> if the control got focus, and <code>false</code> if it was unable to.
     */
    forceFocus : function() {
      var result = false;
      if( this.getEnabled() && jsw.widgets.util.WidgetUtil.isVisible( this ) ) {
        var id = jsw.remote.ObjectRegistry.getId( this );
        jsw.widgets.JSWDisplay.getCurrent().setFocusControl( id );
        result = true;
      }
      return result;
    },
     /**
      * @description Returns the receiver's tool tip text, or null if it has
      * not been set.
      * @return {string|null} the receiver's tool tip text
      */
     getToolTipText : function() {
       return this.getToolTipText();
     },
     /**
      * @description Returns <code>true</code> if the receiver is visible, and
      * <code>false</code> otherwise.
      * <p>
      * If one of the receiver's ancestors is not visible or some
      * other condition makes the receiver not visible, this method
      * may still indicate that it is considered visible even though
      * it may not actually be showing.
      * </p>
      * @return {boolean} the receiver's visibility state
      */
     getVisibility : function() {
    	 return this.isVisible();
     },
     /**
      * @description Returns <code>true</code> if the receiver is enabled, and
      * <code>false</code> otherwise. A disabled control is typically
      * not selectable from the user interface and draws with an
      * inactive or "grayed" look.
      * @return {boolean} the receiver's enabled state
      */
     getEnabled : function() {
       return this.isEnabled();
     },
     /**
      * @description Returns the receiver's cursor, or null if it has not been set.
      * <p>
      * When the mouse pointer passes over a control its appearance
      * is changed to match the control's cursor.
      * </p>
      * <p>
      * All possible values are available as constants on the {@link SWT} object.
      * </p>
      * @return {string|null} the receiver's cursor or <code>null</code>
      */
      getCursor : function() {
        return this.__user$cursor || null;
      }
  },

  ////////////////////
  // lists and handler

  getWidgetDestructor : function() {
    return this._widgetDestructor;
  },

  getControlDestructor : function() {
    return this._controlDestructor;
  },

  getDestroyableChildrenFinder : function( widget ) {
    return this._childrenFinder;
  },

  extendControlProperties : function( list ) {
    return list.concat( this._controlProperties );
  },

  extendControlPropertyHandler : function( handler ) {
    return jsw.util.Objects.mergeWith( handler, this._controlPropertyHandler, false );
  },

  extendListenerMethodHandler : function( handler ) {
    return jsw.util.Objects.mergeWith( handler, this._listenerMethodHandler, false );
  },

  extendControlListeners : function( list ) {
    return list.concat( this._controlListeners );
  },

  extendControlListenerHandler : function( handler ) {
    return jsw.util.Objects.mergeWith( handler, this._controlListenerHandler, false );
  },

  extendControlScriptingMethods : function( methods ) {
    return jsw.util.Objects.mergeWith( methods, this._controlScriptingMethods, false );
  },

  getControlPropertyHandler : function( property ) {
    return this._controlPropertyHandler[ property ];
  },

  getControlListenerHandler : function( handler ) {
    return this._controlListenerHandler[ handler ];
  },

  /////////////////////
  // Helper for handler

  addStatesForStyles : function( targetObject, styleArray ) {
    for( var i = 0; i < styleArray.length; i++ ) {
      targetObject.addState( "jsw_" + styleArray[ i ] );
    }
    targetObject._renderAppearance();
    delete targetObject._isInGlobalStateQueue;
  },

  createStyleMap : function( styleArray ) {
    var result = {};
    for( var i = 0; i < styleArray.length; i++ ) {
      result[ styleArray[ i ] ] = true;
    }
    return result;
  },

  setParent : function( widget, parentId ) {
    var impl = this._setParentImplementation;
    this.callWithTarget( parentId, function( parent ) {
      impl( widget, parent );
    } );
  },

  _setParentImplementation : function( widget, parent ) {
    //if( parent instanceof jsw.widgets.ExpandBar ) {
    //  parent.addWidget( widget );
    //} else {
      widget.setParent( parent );
    //}
    jsw.remote.HandlerUtil.addDestroyableChild( parent, widget );
    widget.setUserData( "protocolParent", parent );
    // Emisión de eventos
	var eventData = {};
	eventData.newWidget = widget;
    var event = new jsw.widgets.base.WidgetEvent(jsw.widgets.base.WidgetEvent.WidgetEventType_CHILD_CREATE, parent, eventData);
    parent._dispatchAsyncEvent( jsw.qx.Target.CREATE_QUEUE, event );

  },

  callWithTarget : function( id, fun ) {
    if( id == null ) {
      fun( null );
    } else {
      var target = jsw.remote.ObjectRegistry.getObject( id );
      if( target ) {
        fun( target );
      } else {
        jsw.remote.ObjectRegistry.addRegistrationCallback( id, fun );
      }
    }
  },

  filterUnregisteredObjects : function( list ) {
    var ObjectRegistry = jsw.remote.ObjectRegistry;
    var result = [];
    for( var i = 0; i < list.length; i++ ) {
      if( ObjectRegistry.getId( list[ i ] ) ) {
        result.push( list[ i ] );
      }
    }
    return result;
  },

  // TODO : Can we use "children" property in most cases instead??
  addDestroyableChild : function( parent, child ) {
    var list = parent.getUserData( "destroyableChildren" );
    if( list == null ) {
      list = {};
      parent.setUserData( "destroyableChildren", list );
    }
    list[ jsw.qx.Object.toHashCode( child ) ] = child;
  },

  removeDestroyableChild : function( parent, child ) {
    var list = parent.getUserData( "destroyableChildren" );
    if( list != null ) {
      delete list[ jsw.qx.Object.toHashCode( child ) ];
    }
  },

  getDestroyableChildren : function( parent ) {
    var list = parent.getUserData( "destroyableChildren" );
    if( list == null ) {
      list = {};
    }
    var result = [];
    for( var key in list ) {
      result.push( list[ key ] );
    }
    return result;
  },

  getServerData : function( target ) {
    var result = target.getUserData( jsw.remote.HandlerUtil.SERVER_DATA );
    if( result == null ) {
      result = {};
      target.setUserData( jsw.remote.HandlerUtil.SERVER_DATA, result );
    }
    return result;
  }

};
