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

jsw.remote.ObjectRegistry = {

  _map : {},
  _callbacks : {},

  add : function( id, object, handler ) {
    this._map[ id ] = {
      "object" : object,
      "handler" : handler
    };
    object._jswId = id;
    if( typeof object.applyObjectId === "function" ) {
      object.applyObjectId( id );
    }
    if( this._callbacks[ id ] ) {
      for( var i = 0; i < this._callbacks[ id ].length; i++ ) {
        this._callbacks[ id ][ i ]( object );
      }
      delete this._callbacks[ id ];
    }
  },

  remove : function( id ) {
    if( id != null && this._map[ id ] != null) {
      delete this._map[ id ].object._jswId;
      delete this._map[ id ];
    }
  },

  getId : function( object ) {
    var result = null;
    if( object != null && object._jswId != null ) {
      result = object._jswId;
    }
    return result;
  },

  getObject : function( id ) {
    var entry = this.getEntry( id );
    return entry ? entry.object : null;
  },

  containsObject : function( object ) {
    return object ? object._jswId != null : false;
  },

  getEntry : function( id ) {
    var result = this._map[ id ];
    if( result == null && jsw.remote.HandlerRegistry.hasHandler( id ) ) {
      var handler = jsw.remote.HandlerRegistry.getHandler( id );
      if( handler.service === true ) {
        this.add( id, handler.factory(), handler );
        result = this._map[ id ];
      }
    }
    return result;
  },

  addRegistrationCallback : function( id, fun ) {
    if( !this._callbacks[ id ] ) {
      this._callbacks[ id ] = [];
    }
    this._callbacks[ id ].push( fun );
  }

};
