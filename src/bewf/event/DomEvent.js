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

jsw.qx.Class.define( "jsw.event.DomEvent", {

  extend : jsw.event.Event,

  construct : function( vType, vDomEvent, vDomTarget, vTarget, vOriginalTarget ) {
    this.base( arguments, vType );

    this.setDomEvent( vDomEvent );
    this.setDomTarget( vDomTarget );

    this.setTarget( vTarget );
    this.setOriginalTarget( vOriginalTarget );
  },

  statics : {

    /** {int} The modifier mask for the shift key. */
    SHIFT_MASK : 1,

    /** {int} The modifier mask for the control key. */
    CTRL_MASK  : 2,

    /** {int} The modifier mask for the alt key. */
    ALT_MASK   : 4,

    /** {int} The modifier mask for the meta key (e.g. apple key on Macs). */
    META_MASK  : 8

  },

  properties : {

    bubbles : {
      _fast        : true,
      defaultValue : true,
      noCompute    : true
    },

    propagationStopped : {
      _fast        : true,
      defaultValue : false,
      noCompute    : true
    },

    domEvent : {
      _fast       : true,
      setOnlyOnce : true,
      noCompute   : true
    },

    domTarget : {
      _fast       : true,
      setOnlyOnce : true,
      noCompute   : true
    },

    /**
     * The modifiers. A mask of the pressed modifier keys. This is an OR-combination of
     * {@link #SHIFT_MASK}, {@link #CTRL_MASK}, {@link #ALT_MASK} and {@link #META_MASK}.
     */
    modifiers : {
      _cached      : true,
      defaultValue : null
    }

  },

  members : {

    setDomEvent : function( domEvent ) {
      this.base( arguments, domEvent );
      jsw.remote.EventUtil._shiftKey = domEvent.shiftKey;
      jsw.remote.EventUtil._ctrlKey = domEvent.ctrlKey;
      jsw.remote.EventUtil._altKey = domEvent.altKey;
      jsw.remote.EventUtil._metaKey = domEvent.metaKey;
      //jsw.remote.EventUtil._button = jsw.event.MouseEvent.C_BUTTON_NONE;
    },

    /**
     * property computer
     *
     * @type member
     * @return {var} TODOC
     */
    _computeModifiers : function() {
      var mask = 0;
      var evt = this.getDomEvent();
      if( evt.shiftKey ) {
        mask |= jsw.event.DomEvent.SHIFT_MASK;
      }
      if( evt.ctrlKey ) {
        mask |= jsw.event.DomEvent.CTRL_MASK;
      }
      if( evt.altKey ) {
        mask |= jsw.event.DomEvent.ALT_MASK;
      }
      if( evt.metaKey ) {
        mask |= jsw.event.DomEvent.META_MASK;
      }
      return mask;
    },

    /**
     * Returns whether the the ctrl key is pressed.
     *
     * @type member
     * @return {Boolean} whether the the ctrl key is pressed.
     */
    isCtrlPressed : function() {
      return this.getDomEvent().ctrlKey;
    },

    /**
     * Returns whether the the shift key is pressed.
     *
     * @type member
     * @return {Boolean} whether the the shift key is pressed.
     */
    isShiftPressed : function() {
      return this.getDomEvent().shiftKey;
    },

    /**
     * Returns whether the the alt key is pressed.
     *
     * @type member
     * @return {Boolean} whether the the alt key is pressed.
     */
    isAltPressed : function() {
      return this.getDomEvent().altKey;
    },

    /**
     * Returns whether the the meta key is pressed.
     *
     * @type member
     * @return {Boolean} whether the the meta key is pressed.
     */
    isMetaPressed : function() {
      return this.getDomEvent().metaKey;
    },

    /**
     * Returns whether the ctrl key or (on the Mac) the command key is pressed.
     *
     * @type member
     * @return {Boolean} <code>true</code> if the command key is pressed on the Mac
     *           or the ctrl key is pressed on another system.
     */
    isCtrlOrCommandPressed : function() {
      if( jsw.client.Client.getPlatform() === "mac" ) {
        return this.getDomEvent().metaKey;
      } else {
        return this.getDomEvent().ctrlKey;
      }
    },

    /**
     * TODOC
     *
     * @type member
     * @param vValue {var} TODOC
     * @return {var} TODOC
     * @signature function(vValue)
     */
    setDefaultPrevented : function( vValue ) {
      if( !vValue ) {
        throw new Error( "It is not possible to set preventDefault to false if it was true before!" );
      }
      jsw.event.EventHandlerUtil.stopDomEvent( this.getDomEvent() );
      this.base( arguments, vValue );
    }

  },

  destruct : function() {
    this._disposeFields( "_valueDomEvent", "_valueDomTarget" );
  }

} );
