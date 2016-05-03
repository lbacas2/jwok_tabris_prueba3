
jsw.remote.HandlerRegistry.add( "jsw.widgets.menu.MenuModule", {

  factory : function( properties ) {
    var adapterUtil = jsw.remote.HandlerUtil;
    var result = new jsw.widgets.menu.MenuModule();
    adapterUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( jsw.widgets.mixin.MenuItem.widgetProperties ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( jsw.widgets.mixin.MenuItem.widgetMethods ),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

} );
