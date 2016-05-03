/*******************************************************************************
 * Copyright (c) 2004, 2013 1&1 Internet AG, Germany, http://www.1und1.de,
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

/** Event object for property changes. */
jsw.qx.Class.define("jsw.connection.ConnectionEvent",
		{
	extend : jsw.event.Event,




	/*
	 *****************************************************************************
     CONSTRUCTOR
	 *****************************************************************************
	 */

	/**
	 * @param type {String} the type name of the event
	 * @param value {var} additional value which should be passed to the event listener
	 * @param old {var} additional old value which should be passed to the event listener
	 */
	construct : function(type, connection)
	{
		this.base(arguments, type);
		this._connection = connection;
	},

	statics : {
		ConnectionEventType_CONNECT : "connect",
		ConnectionEventType_DISPLAY_CREATED : "displayCreated",
		ConnectionEventtype_DISCONNECT : "disconnect",
	},

	/*
	 *****************************************************************************
     MEMBERS
	 *****************************************************************************
	 */

	members :
	{

		/**
		 * Returns the event data
		 *
		 * @deprecated use {@link #getValue} instead
		 */
		getConnection : function() {
			return this._connection;
		},
		
		toString : function(){
			var str = "Class[" + this.classname + "] Type[" + this.getType() + "]"; 
			return str;
		}
	},

	/*
	 *****************************************************************************
     DESTRUCTOR
	 *****************************************************************************
	 */

	destruct : function() {
		return;
	}
		
});
