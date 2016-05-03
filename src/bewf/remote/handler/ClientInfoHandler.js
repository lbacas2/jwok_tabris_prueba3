/*******************************************************************************
 * Copyright (c) 2012 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

jsw.remote.HandlerRegistry.add( "jsw.client.ClientInfo", {

  factory : function( properties ) {
    return jsw.client.Client;
  },

  service : true

} );
