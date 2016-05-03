
jsw.remote.HandlerRegistry.add( "jsw.widgets.StackComposite", {

  factory : function( properties ) {
    var result = new jsw.widgets.StackComposite();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
        "topControl"
  ]),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
	  	"topControl" : function( widget, title ) {
		    widget._setTopControl( title );
		},
  }),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

});
