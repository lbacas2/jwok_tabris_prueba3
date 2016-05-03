
jsw.remote.HandlerRegistry.add( "jsw.widgets.ActiveLink", {

  factory : function( properties ) {
    var result = new jsw.widgets.ActiveLink();
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
    "source",
    "target"
  ] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
	  "text" : function( widget, value ) {
		  widget._setText( value );
	  },
	  "source" : function( widget, value ) {
		  widget._setSource( value );
	  },
	  "target" : function( widget, value ) {
		  widget._setTarget( value );
	  }
  } ),

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

} );


