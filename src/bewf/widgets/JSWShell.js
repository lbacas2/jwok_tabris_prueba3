/*******************************************************************************
 * Copyright (c) 2002, 2014 Innoopract Informationssysteme GmbH and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Innoopract Informationssysteme GmbH - initial API and implementation
 *    EclipseSource - ongoing development
 ******************************************************************************/

jsw.qx.Class.define( "jsw.widgets.JSWShell", {

	extend : jsw.widgets.base.Parent,

	construct : function( styles ) {
		this.base( arguments );
		
		this._jswDisplay = null;
		this._title = '';
	},

	members : {
		destroy : function() {
			var parent = this.getParent();
			this.base( arguments );
			if (parent != null && parent.classname === 'jsw.widgets.JSWShell') {
				// Se envia el evento desde display porque en la gestión de eventos de widget base el shell no encuentra padre
				var event = new jsw.widgets.base.WidgetEvent(jsw.widgets.base.WidgetEvent.WidgetEventtype_CHILD_DISPOSE, parent, this);
				parent._dispatchAsyncEvent(jsw.qx.Target.REMOVE_QUEUE, event);
			} else {
				if(this.getJSWDisplay()) {
					this.getJSWDisplay().removeJSWShell(this);
					// Se envia el evento desde display porque en la gestión de eventos de widget base el shell no encuentra padre
					var event = new jsw.widgets.base.WidgetEvent(jsw.widgets.base.WidgetEvent.WidgetEventtype_CHILD_DISPOSE, this.getJSWDisplay(), this);
					this.getJSWDisplay()._dispatchAsyncEvent(jsw.qx.Target.REMOVE_QUEUE, event);
				}
			}
		},

		// Se redefine la función para obtener el diaply porque los shells pueden contener directamente el display
		getJSWDisplay : function(){
			if(this._jswDisplay != null){
				return this._jswDisplay;
			}
			var parent = this.getParent();
			if(parent){
				return this.getParent().getJSWDisplay();
			}
			return null;
		},

		/** To be called after jsw_XXX states are set */
		initialize : function() {
		},

		_setJSWDisplay : function( display ) {
			this._jswDisplay = display;
		},

		getTitle : function() {
			return this._title;
		},
		
		_setTitle : function( title ) {
			this._title = title;
		},
		
		close : function() {
	    	this._notifyModify( "Close" );
	    }

	}
} );
