
jsw.remote.HandlerRegistry.add( "jsw.widgets.Link", {

  factory : function( properties ) {
    var result = new jsw.widgets.Link();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
    /**
     * @name setText
     * @methodOf Link#
     * @description Sets the receivers text to the given string.
     * @param {string} text the new text
     */
    "text"
  ] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
  		"text" : function( widget, value ) {
		    widget._setText( value );
		}
  } ),

  events : [ "Command" ],
  
  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

} );


