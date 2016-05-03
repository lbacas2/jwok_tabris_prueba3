
jsw.remote.HandlerRegistry.add( "jsw.widgets.InputTextArea", {

  factory : function( properties ) {
    var result = new jsw.widgets.InputTextArea();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties(
		  	 // Merge mixin with new properties
		     ["richText"].concat(jsw.widgets.mixin.InputControl.widgetProperties)
  ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler(
		  	// Merge mixin with new property handlers
		  	jsw.util.Objects.mergeWith({
		  		"richText" : function( widget, value ) {
		  			widget._setRichText( value );
				}
	  		}, jsw.widgets.mixin.InputControl.widgetMethods, false)
  ),

  events : jsw.widgets.mixin.InputControl.events,

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

} );


