
jsw.remote.HandlerRegistry.add( "jsw.widgets.Label", {

  factory : function( properties ) {
    var result = new jsw.widgets.Label();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
    /**
     * @name setText
     * @methodOf Label#
     * @description Sets the receivers text to the given string.
     * @param {string} text the new text
     */
    "text",
    "richText",
    "image"
  ] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
	  "text" : function( widget, value ) {
		  widget._setText( value );
	  },
	  "richText" : function( widget, value ) {
		  widget._setRichText( value );
	  },
	  "image" : function( widget, value ) {
		  widget._setImage( value );
	  }
  } ),

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

} );


