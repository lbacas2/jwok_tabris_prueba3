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

/*global rwt:true, namespace:true*/

jws = {};

var namespace = function( name ) {
  var splits = name.split( "." );
  var parent = window;
  var part = splits[ 0 ];
  for( var i = 0, len = splits.length - 1; i < len; i++, part = splits[ i ] ) {
    if( !parent[ part ] ) {
      parent = parent[ part ] = {};
    } else {
      parent = parent[ part ];
    }
  }
  if( !( part in parent ) ) {
    parent[ part ] = {};
  }
  return part;
};

var createConnection = function(connPath) {
	// Se crea la conexión
	connection = new jsw.connection.Connection();

	// Se crea el renderer de la conexión
	var connectionRenderer = renderer.base.RendererHandlerRegistry.getInstance().getHandler("jsw.connection.Connection").create();
	connectionRenderer.setConnection(connection);
	
	// Se pasan parametros a la conexión
	connection.setUrl( connPath );
	
	// Se intenta conectar
	connection.connect();
	
	// Se retorna la conexión
	return connection;
}

var getServerUrl = function( pServerUrl, pServerPath ) {
	pServerUrl  = pServerUrl  || ( typeof serverUrl  !== 'undefined' ? serverUrl  : (window.location.pathname || '').replace(/\/[^\/]+$/,"") );
	pServerPath = pServerPath || ( typeof serverPath !== 'undefined' ? serverPath : '/bewf' );
	
	return pServerUrl + pServerPath;
}


exports.namespace = namespace;
exports.createConnection = createConnection;
exports.getServerUrl = getServerUrl;
