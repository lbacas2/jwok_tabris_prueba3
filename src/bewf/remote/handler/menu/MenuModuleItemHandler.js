
jsw.remote.HandlerRegistry.add( "jsw.widgets.menu.MenuModuleItem", {

  factory : function( properties ) {
    var result = new jsw.widgets.menu.MenuModuleItem();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties(
		  	 // Merge mixin with new properties
		     [
		      "selectable",
		      "selected"
		      ].concat(jsw.widgets.mixin.MenuItem.widgetProperties)),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler(
		  	// Merge mixin with new property handlers
		  	jsw.util.Objects.mergeWith({
		  		"selectable" : function( widget, value ) {
				    widget._setSelectable( value );
	  			},
				"selected" : function( widget, value ) {
				    widget._setSelected( value );
				}
	  		}, jsw.widgets.mixin.MenuItem.widgetMethods, false)),

  events : [ "Command" ],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

} );
