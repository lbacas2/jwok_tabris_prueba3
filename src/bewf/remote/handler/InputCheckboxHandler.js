
jsw.remote.HandlerRegistry.add( "jsw.widgets.InputCheckbox", {

  factory : function( properties ) {
    var result = new jsw.widgets.InputCheckbox();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
        "label",
        "checked"
      ].concat(jsw.widgets.mixin.InputControl.widgetProperties)
  ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler(
		  // Merge mixin with new property handlers
		  jsw.util.Objects.mergeWith({
				"label" : function( widget, value ) {
				    var EncodingUtil = jsw.util.Encoding;
				    var text = EncodingUtil.truncateAtZero( value );
				    text = EncodingUtil.replaceNewLines( text, " " );
				    widget._setLabel( text );
				},
				
				"checked" : function( widget, value ) {
				    widget._setChecked( value );
				}
		  }, jsw.widgets.mixin.InputControl.widgetMethods, false)
  ),

  events : jsw.widgets.mixin.InputControl.events,

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

} );


