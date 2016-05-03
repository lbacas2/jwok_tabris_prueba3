
jsw.remote.HandlerRegistry.add( "jsw.widgets.ChartBar", {

  factory : function( properties ) {
    var adapterUtil = jsw.remote.HandlerUtil;
    var result = new jsw.widgets.ChartBar();
    adapterUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( 
      // Merge mixin with new properties
	  jsw.widgets.mixin.AbstractChartXY.widgetProperties.concat( jsw.widgets.mixin.AbstractChart.widgetProperties )
  ),
  
  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( 
      // Merge mixin with new property handlers
	  jsw.util.Objects.mergeWith(jsw.widgets.mixin.AbstractChartXY.widgetMethods, jsw.widgets.mixin.AbstractChart.widgetMethods, false)
  ),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

} );
