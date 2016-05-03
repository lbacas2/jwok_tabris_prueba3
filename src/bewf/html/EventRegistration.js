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

jsw.qx.Class.define("jsw.html.EventRegistration",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Assign a function to an event.
     *
     * @type function
     * @param vElement {Element} DOM Element
     * @param vType {String} Name of the event
     * @param vFunction {Function} The pointer to the function to assign
     * @return {void}
     * @signature function(vElement, vType, vFunction)
     */
    addEventListener : jsw.util.Variant.select("qx.client",
    {
      "mshtml" : function(vElement, vType, vFunction) {
        vElement.attachEvent("on" + vType, vFunction);
      },

      "default" : function(vElement, vType, vFunction) {
        vElement.addEventListener(vType, vFunction, false);
      }
    }),


    /**
     * Unassign a function from an event.
     *
     * @type function
     * @param vElement {Element} DOM Element
     * @param vType {String} Name of the event
     * @param vFunction {Function} The pointer to the function to assign
     * @signature function(vElement, vType, vFunction)
     */
    removeEventListener : jsw.util.Variant.select("qx.client",
    {
      "mshtml" : function(vElement, vType, vFunction) {
        vElement.detachEvent("on" + vType, vFunction);
      },

      "default" :  function(vElement, vType, vFunction) {
        vElement.removeEventListener(vType, vFunction, false);
      }
    })
  }
});
