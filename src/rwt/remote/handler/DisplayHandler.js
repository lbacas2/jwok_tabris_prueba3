/*******************************************************************************
 * Copyright (c) 2011, 2013 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

rwt.remote.HandlerRegistry.add( "rwt.widgets.Display", {

  factory : function( properties ) {
	var displayObj = new rwt.widgets.Display( properties );
	jsw.connection.Connection.getMessageConnection()._setRWTDisplay(displayObj);
    return displayObj;
  },

  destructor : null, // destroy is currently not called for display

  properties : [
    "exitConfirmation",
    "mnemonicActivator",
    "focusControl",
    "enableUiTests",
    "activeKeys",
    "cancelKeys"
  ],

  methods : [
    "allowEvent",
    "cancelEvent",
    "beep"
  ],

  propertyHandler : {},

  listeners : []

} );
