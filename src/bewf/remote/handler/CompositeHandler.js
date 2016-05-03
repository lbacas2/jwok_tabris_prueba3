
jsw.remote.HandlerRegistry.add( "jsw.widgets.Composite", {

  factory : function( properties ) {
    var result = new jsw.widgets.Composite();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {} ),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

});
