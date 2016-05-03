
jsw.remote.HandlerRegistry.add( "jsw.widgets.InputInteger", {

  factory : function( properties ) {
    var result = new jsw.widgets.InputInteger();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),
  
  properties : jsw.remote.HandlerUtil.extendControlProperties( [
		"minValue",
		"maxValue"
		].concat(jsw.widgets.mixin.InputControl.widgetProperties)
  ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( 
		// Merge mixin with new property handlers
		jsw.util.Objects.mergeWith({
			  "minValue" : function( widget, value ) {
				  widget._setMinValue( value );
			  },
			  "maxValue" : function( widget, value ) {
				  widget._setMaxValue( value );
			  }
		}, jsw.widgets.mixin.InputControl.widgetMethods, false)
  ),

  events : jsw.widgets.mixin.InputControl.events,

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

} );


