
jsw.remote.HandlerRegistry.add( "jsw.widgets.ChartGauge", {

  factory : function( properties ) {
    var adapterUtil = jsw.remote.HandlerUtil;
    var result = new jsw.widgets.ChartGauge();
    adapterUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( 
		// Merge mixin with new properties
		[
		 	"serie",
			"serieName",
			"minValue",
			"maxValue",
			"value"
		].concat(jsw.widgets.mixin.AbstractChart.widgetProperties)
  ),
  
  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( 
		// Merge mixin with new property handlers
		jsw.util.Objects.mergeWith({
			"serie" : function( widget, value ) {
			    widget._setSerie( value );
			},
	  		"serieName" : function( widget, value ) {
			    widget._setSerieName( value );
	  		},
	  		"minValue" : function( widget, value ) {
			    widget._setMinValue( value );
	  		},
	  		"maxValue" : function( widget, value ) {
			    widget._setMaxValue( value );
	  		},
	  		"value" : function( widget, value ) {
			    widget._setValue( value );
	  		}
		}, jsw.widgets.mixin.AbstractChart.widgetMethods, false)
  ),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

} );
