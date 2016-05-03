/*global jsw:false */
jsw.remote.HandlerRegistry.add( "jsw.widgets.Calendar", {

  factory : function( properties ) {
    var result = new jsw.widgets.Calendar();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
      "selectedDate",
      "editable"
  ] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
	  "selectedDate" : function( widget, value ) {
		  	widget._setSelectedDate( value );
	  },
	  "editable" : function( widget, value ) {
		    widget._setEditable( JSON.parse(value) );
	  },
  } ),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

} );
