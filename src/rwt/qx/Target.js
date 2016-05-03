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
 * This is the main constructor for all objects that need to be connected to rwt.event.Event objects.
 *
 * In objects created with this constructor, you find functions to addEventListener or
 * removeEventListener to or from the created object. Each event to connect to has a type in
 * form of an identification string. This type could be the name of a regular dom event like "click"
 * or something self-defined like "ready".
 */
rwt.qx.Class.define( "rwt.qx.Target", {

  extend : rwt.qx.Object,

  construct : function() {
    this.base( arguments );
  },

  statics : {
	CONNECT_QUEUE : "connect",  
	REMOVE_QUEUE : "remove",  
	CREATE_QUEUE : "create",  
	SET_QUEUE : "set",  
	DISCONNET_QUEUE : "disconnect",  
	  
    _pendingEventsConnectQueue : [],
    _pendingEventsSetQueue : [],
    _pendingEventsRemoveQueue : [],
    _pendingEventsCreateQueue : [],
    _pendingEventsDisconnectQueue : [],

    _addToPendingEventsQueue : function( eventContext, queue ) {
      if (rwt.qx.Target._autoFlushTimeout == null) {
    	rwt.qx.Target._initAutoFlush();
      }
      
      if( queue == rwt.qx.Target.REMOVE_QUEUE){
          rwt.qx.Target._pendingEventsRemoveQueue.push( eventContext);
      } else if( queue == rwt.qx.Target.SET_QUEUE){
          rwt.qx.Target._pendingEventsSetQueue.push( eventContext);
      } else if( queue == rwt.qx.Target.CONNECT_QUEUE){
          rwt.qx.Target._pendingEventsConnectQueue.push( eventContext);
      } else if( queue == rwt.qx.Target.DISCONNET_QUEUE){
          rwt.qx.Target._pendingEventsDisconnectQueue.push( eventContext);
      } else if( queue == rwt.qx.Target.CREATE_QUEUE){
          rwt.qx.Target._pendingEventsCreateQueue.push( eventContext);
      } else {
    	  // unknown queue 
      }
    },
    
    _initAutoFlush : function(  ) {
      if( rwt.qx.Target._autoFlushTimeout == null ) {
    	  rwt.qx.Target._autoFlushTimeout
              = window.setTimeout( rwt.qx.Target._autoFlushHelper, 0 );
      }
    },
    
    _autoFlushHelper : function() {
      try {
    	rwt.qx.Target._autoFlushTimeout = null;
        if( !rwt.qx.Object.inGlobalDispose() ) {
        	rwt.qx.Target._flushPendingEventsQueues();
        }
      }catch( ex ) {
        rwt.runtime.ErrorHandler.processJavaScriptError( ex );
      }
    },

    _flushPendingEventsQueues : function() {
      if( rwt.qx.Target._autoFlushTimeout != null ) {
    	  rwt.qx.Target._removeAutoFlush();
      }
      if( rwt.qx.Target._inFlushPendingEventsQueues ) {
        return;
      }
      rwt.qx.Target._inFlushPendingEventsQueues = true;
      rwt.qx.Target._flushPendingEventsQueue(rwt.qx.Target.CONNECT_QUEUE);
      rwt.qx.Target._flushPendingEventsQueue(rwt.qx.Target.REMOVE_QUEUE);
      rwt.qx.Target._flushPendingEventsQueue(rwt.qx.Target.CREATE_QUEUE);
      rwt.qx.Target._flushPendingEventsQueue(rwt.qx.Target.SET_QUEUE);
      rwt.qx.Target._flushPendingEventsQueue(rwt.qx.Target.DISCONNET_QUEUE);
      delete rwt.qx.Target._inFlushPendingEventsQueues;
    },
  
    _removeAutoFlush : function() {
      if( rwt.qx.Target._autoFlushTimeout != null ) {
        window.clearTimeout( rwt.qx.Target._autoFlushTimeout );
        rwt.qx.Target._autoFlushTimeout = null;
      }
    },
      
    _flushPendingEventsQueue : function( queue ) {
      var vLength, vContextEvent;
      var vQueue = null;

      if( queue == rwt.qx.Target.REMOVE_QUEUE){
    	  vQueue = rwt.qx.Target._pendingEventsRemoveQueue;
      } else if( queue == rwt.qx.Target.SET_QUEUE){
    	  vQueue = rwt.qx.Target._pendingEventsSetQueue;
      } else if( queue == rwt.qx.Target.CONNECT_QUEUE){
    	  vQueue = rwt.qx.Target._pendingEventsConnectQueue;
      } else if( queue == rwt.qx.Target.DISCONNET_QUEUE){
    	  vQueue = rwt.qx.Target._pendingEventsDisconnectQueue;
      } else if( queue == rwt.qx.Target.CREATE_QUEUE){
    	  vQueue = rwt.qx.Target._pendingEventsCreateQueue;
      } else {
    	  // unknown queue 
      }
      
      while ((vLength = vQueue.length) > 0) {
        for (var i=0; i<vLength; i++) {
          vContextEvent = vQueue[i];
          jsw.develop.EventConsolePrinter.printNotifyQueueEvent(queue, vContextEvent);
          rwt.qx.Target._callFunction(vContextEvent.func, vContextEvent.obj, vContextEvent.evt);
        }
        vQueue.splice(0, vLength);
      }
      
      if( queue == rwt.qx.Target.REMOVE_QUEUE){
    	  rwt.qx.Target._pendingEventsRemoveQueue = [];
      } else if( queue == rwt.qx.Target.SET_QUEUE){
    	  rwt.qx.Target._pendingEventsSetQueue = [];
      } else if( queue == rwt.qx.Target.CONNECT_QUEUE){
    	  rwt.qx.Target._pendingEventsConnectQueue = [];
      } else if( queue == rwt.qx.Target.DISCONNET_QUEUE){
    	  rwt.qx.Target._pendingEventsDisconnectQueue = [];
      } else if( queue == rwt.qx.Target.CREATE_QUEUE){
    	  rwt.qx.Target._pendingEventsCreateQueue = [];
      } else {
    	  // unknown queue 
      }
    },
    
    _callFunction : function(func, obj, evt){
      func.call( obj, evt );
    } 
  },
  
  members : {

    /**
     * Add event listener to an object.
     *
     * @param type {String} name of the event type
     * @param func {Function} event callback function
     * @param obj {Object ? window} reference to the 'this' variable inside the callback
     */
    addEventListener : function( type, func, obj ) {
      if( this.getDisposed() ) {
        return;
      }

      // If this is the first event of given type, we need to create a subobject
      // that contains all the actions that will be assigned to this type
      if( this.__listeners === undefined ) {
        this.__listeners = {};
      }

      if( this.__listeners[ type ] === undefined ) {
        this.__listeners[ type ] = {};
      }

      // Create a special key string to allow identification of each bound action
      var key = "event" + rwt.qx.Object.toHashCode( func ) +
        ( obj ? "$" + rwt.qx.Object.toHashCode( obj ) : "" );

      // Finally set up the listeners object
      this.__listeners[ type ][ key ] = {
        handler : func,
        object  : obj
      };
    },

    /**
     * Remove event listener from object
     *
     * @param type {String} name of the event type
     * @param func {Function} event callback function
     * @param obj {Object ? window} reference to the 'this' variable inside the callback
     */
    removeEventListener : function( type, func, obj ) {
      if( this.getDisposed() ) {
        return;
      }

      var listeners = this.__listeners;

      if( !listeners || listeners[ type ] === undefined ) {
        return;
      }

      if( typeof func !== "function" ) {
        throw new Error( "rwt.qx.Target: removeEventListener(" + type + "): '" + func
                         + "' is not a function!" );
      }

      // Create a special key string to allow identification of each bound action
      var key = "event" + rwt.qx.Object.toHashCode( func ) +
        ( obj ? "$" + rwt.qx.Object.toHashCode( obj ) : "" );

      // Delete object entry for this action
      delete this.__listeners[ type ][ key ];
    },

    // ------------------------------------------------------------------------
    // EVENT CONNECTION UTILITIES
    // ------------------------------------------------------------------------

    /**
     * Check if there are one or more listeners for an event type.
     *
     * @param type {String} name of the event type
     */
    hasEventListeners : function( type ) {
      return this.__listeners &&
        this.__listeners[ type ] !== undefined &&
        !rwt.util.Objects.isEmpty( this.__listeners[ type ] );
    },


    /**
     * Checks if the event is registered. If so it creates an event object and dispatches it.
     *
     * @param type {String} name of the event type
     */
    createDispatchEvent : function( type ) {
      if( this.hasEventListeners( type ) ) {
        this.dispatchEvent( new rwt.event.Event( type ), true );
      }
    },

    /**
     * Checks if the event is registered. If so it creates an event object and dispatches it.
     *
     * @param type {String} name of the event type
     * @param data {Object} user defined data attached to the event object
     */
    createDispatchDataEvent : function( type, data ) {
      if( this.hasEventListeners( type ) ) {
        this.dispatchEvent( new rwt.event.DataEvent( type, data ), true );
      }
    },

    /**
     * Checks if the event is registered. If so it creates an event object and dispatches it.
     *
     * @param type {String} name of the event type
     * @param value {Object} property value attached to the event object
     * @param old {Object} old property value attached to the event object
     */
    createDispatchChangeEvent : function( type, value, old ) {
      if( this.hasEventListeners( type ) ) {
        this.dispatchEvent( new rwt.event.ChangeEvent( type, value, old ), true );
      }
    },

    // ------------------------------------------------------------------------
    // EVENT DISPATCH
    // ------------------------------------------------------------------------

    /**
     * Dispatch an event
     *
     * @param evt {rwt.event.Event} event to dispatch
     * @param dispose {Boolean} whether the event object should be disposed after all event handlers run.
     * @return {Boolean} whether the event default was prevented or not. Returns true, when the event was NOT prevented.
     */
    dispatchEvent : function( evt, dispose ) {
      // Ignore event if eventTarget is disposed
      if( this.getDisposed() ) {
        return;
      }
      if( evt.getTarget() == null ) {
        evt.setTarget(this);
      }
      if( evt.getCurrentTarget() == null ) {
        evt.setCurrentTarget( this );
      }
      // Dispatch Event
      this._dispatchEvent( evt, dispose );
      // Read default prevented
      var defaultPrevented = evt.getDefaultPrevented();
      // enable dispose for event?
      if( dispose ) {
        evt.dispose();
      }
      return !defaultPrevented;
    },

    dispatchSimpleEvent : function( type, data, bubbles ) {
      var listeners = this.__listeners;
      var propagate = bubbles === true;
      var result = true;
      if( listeners ) {
        var typeListeners = listeners[ type ];
        if( typeListeners ) {
          var func;
          var obj;
          for( var hashCode in typeListeners ) {
            // Shortcuts for handler and object
            func = typeListeners[ hashCode ].handler;
            obj = typeListeners[ hashCode ].object || this;
            result = func.call( obj, data ) && result !== false;
            if( result === false ) {
              propagate = false;
            }
          }
        }
      }
      if( propagate && typeof( this.getParent ) === "function" ) {
        var parent = this.getParent();
        if( parent && !parent.getDisposed() && parent.getEnabled() ) {
          parent.dispatchSimpleEvent( type, data, bubbles );
        }
      }
      return result !== false;
    },

    /**
     * Internal event dispatch method
     *
     * @param evt {rwt.event.Event} event to dispatch
     */
    _dispatchEvent : function( evt ) {
      this._dispatchEventInternal( evt, false, null );
    },

    
    /**
     * Internal event dispatch method
     *
     * @param evt {rwt.event.Event} event to dispatch
     */
    _dispatchEventInternal : function( evt, async, queue ) {
      var listeners = this.__listeners;
      if( listeners && this._allowDispatch( evt ) ) {
        // Setup current target
        evt.setCurrentTarget( this );
        // Shortcut for listener data
        var typeListeners = listeners[ evt.getType() ];
        if( typeListeners ) {
          var func, obj;
          // Handle all events for the specified type
          for( var vHashCode in typeListeners ) {
            // Shortcuts for handler and object
            func = typeListeners[ vHashCode ].handler;
            obj = typeListeners[ vHashCode ].object || this;
            // Call object function
            this._callFunction(func, obj, evt, async, queue );
          }
        }
      }

      
      // Bubble event to parents
      // TODO: Move this to Parent or Widget?
      if( evt.getBubbles() && !evt.getPropagationStopped() && typeof( this.getParent ) == "function" )
      {
        var parent = this.getParent();
        if( parent && !parent.getDisposed() ) {
          parent._dispatchEvent( evt );
        }
      }
    },

    _callFunction : function(func, obj, evt, async, queue ){
      if( !async ){
        func.call( obj, evt );
      } else{
        var eventContext = {};
        eventContext.func = func;
        eventContext.obj = obj;
        eventContext.evt = evt;
        rwt.qx.Target._addToPendingEventsQueue(eventContext, queue);
      }
  	  return;
    }, 
    
    _allowDispatch : function( event ) {
      var result = true;
      if( this.getEnabled && event instanceof rwt.event.DomEvent ) {
        result = this.getEnabled();
      }
      return result;
    },

    /**
     * Dispatch an event in async Mode
     *
     * @param evt {rwt.event.Event} event to dispatch
     * @param dispose {Boolean} whether the event object should be disposed after all event handlers run.
     * @return {Boolean} whether the event default was prevented or not. Returns true, when the event was NOT prevented.
     */
    _dispatchAsyncEvent : function( queue, evt ) {
      jsw.develop.EventConsolePrinter.printQueueEvent(queue, evt);
      this._dispatchEventInternal( evt, true, queue );
    }

    
  },

  destruct : function() {
    this._disposeObjectDeep( "__listeners", 2 );
  }

} );
