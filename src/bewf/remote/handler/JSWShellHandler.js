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

jsw.remote.HandlerRegistry.add( "jsw.widgets.JSWShell", {

  factory : function( properties ) {
    var adapterUtil = jsw.remote.HandlerUtil;
    var result = new jsw.widgets.JSWShell( );
    if(properties.parentShell) {
    	adapterUtil.setParent( result, properties.parentWidget );
    } else {
    	adapterUtil.callWithTarget( properties.parentShell, function( parentShell ) {
    		if( parentShell ) {
    			result.setParentShell( parentShell );
    		} else {
    			// Sino tiene shell padre se incorpora en el Display
    			var connection = jsw.connection.Connection.getMessageConnection();
    			if(connection != null){
    				connection.getJSWDisplay().addJSWShell(result);
    			}
    		}
    		result.initialize();
    	} );
    }
    return result;
  },

  
  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
      "title",
  ]),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
	  "title" : function( widget, value ) {
		  widget._setTitle( value );
	  },
  }),

  events : [ "Close" ],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

} );
