/*global jsw:false */
jsw.remote.HandlerRegistry.add( "jsw.widgets.calendar.CalendarEvent", {

  factory : function( properties ) {
    var result = new jsw.widgets.calendar.CalendarEvent();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
      "title",
      "start",
      "end",
      "url"
  ] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
	  "title" : function( widget, value ) {
		  	widget._setTitle( value );
	  },
	  "start" : function( widget, value ) {
		  	widget._setStart( value );
	  },
	  "end" : function( widget, value ) {
		  	widget._setEnd( value );
	  },
	  "url" : function( widget, value ) {
		    widget._setUrl( value );
	  },
  } ),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

} );
