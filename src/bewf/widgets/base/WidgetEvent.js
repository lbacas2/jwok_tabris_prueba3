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
jsw.qx.Class.define("jsw.widgets.base.WidgetEvent",
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
	construct : function(type, widget, data)
	{
		this.base(arguments, type);
		this._widget = widget;
		this._data = data;
	},

	statics : {
		WidgetEventType_CHILD_CREATE : "childcreate", // Notificado por un composite o display cuando se le incorporan nuevos hijos
		WidgetEventType_PROPERTY : "property",
		WidgetEventtype_DISPOSE : "dispose",  // Notificado por el propio widget que se elimina, cuando el widget padre aun permanece
		WidgetEventtype_PARENT_DISPOSE : "parentdispose", // Notificado por un widget que es eliminado debido a que su padre es eliminado
		WidgetEventtype_CHILD_DISPOSE : "childdispose",	}, // Notificado por el widget padre que un hijo ha sido eliminado. El widget padre no ha sido eliminado.

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
		getWidget : function() {
			return this._widget;
		},
	
		/**
		 * Returns the event data
		 *
		 * @deprecated use {@link #getValue} instead
		 */
		getData : function() {
			return this._data;
		},
		
		toString : function(){
			var wId = "";
			if( this.getWidget()._rwtId ){
				wId = this.getWidget()._rwtId;
		    }
			var stype =  this.getType();
			if(this.getType() == "property"){
				stype = stype + "," + this.property + "," + this.newValue;
			}
			var str = "Class[" + this.classname + "] Type[" + stype + "] Widget[" +this.getWidget().classname + "," + wId + "]"; 
			if(this.getType() == "childcreate"){
				str = str + " CreatedWidget["+this.getData().newWidget.classname+",";
				if( this.getData().newWidget._rwtId ){
					str = str + this.getData().newWidget._rwtId
			    }
				str = str + "]"
			}
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
