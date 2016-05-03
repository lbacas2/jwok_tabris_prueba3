
jsw.remote.HandlerRegistry.add( "jsw.widgets.sidebar.SideBarGroup", {

  factory : function( properties ) {
    var result = new jsw.widgets.sidebar.SideBarGroup();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( jsw.widgets.mixin.SideBarItem.widgetProperties ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( jsw.widgets.mixin.SideBarItem.widgetMethods ),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

});
