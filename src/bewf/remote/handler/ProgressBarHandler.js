
jsw.remote.HandlerRegistry.add( "jsw.widgets.ProgressBar", {

  factory : function( properties ) {
    var result = new jsw.widgets.ProgressBar();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
    "value",
    "minValue",
    "maxValue"
  ] ),

  	propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
  		"value" : function( widget, value ) {
		    widget._setValue( value );
		},
		"maxValue" : function( widget, value ) {
		    widget._setMaxValue( value );
		},
		"minValue" : function( widget, value ) {
		    widget._setMinValue( value );
		}
  } ),

  events : [ "Value" ],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

} );


