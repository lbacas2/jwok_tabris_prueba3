
jsw.remote.HandlerRegistry.add( "jsw.widgets.inputcombo.InputComboGroup", {

  factory : function( properties ) {
    var adapterUtil = jsw.remote.HandlerUtil;
    var result = new jsw.widgets.inputcombo.InputComboGroup();
    adapterUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( jsw.widgets.mixin.InputComboItem.widgetProperties ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( jsw.widgets.mixin.InputComboItem.widgetMethods ),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

} );
