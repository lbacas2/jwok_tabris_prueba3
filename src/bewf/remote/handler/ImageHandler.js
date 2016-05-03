
jsw.remote.HandlerRegistry.add( "jsw.widgets.Image", {

  factory : function( properties ) {
    var result = new jsw.widgets.Image();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
		"alternativeText",
		"source"
  ] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
	  "alternativeText" : function( widget, value ) {
		  widget._setAlternativeText( value );
	  },
	  "source" : function( widget, value ) {
		  widget._setSource( value );
	  }
  } ),

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

} );


