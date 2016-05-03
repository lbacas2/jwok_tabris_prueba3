
jsw.remote.HandlerRegistry.add( "jsw.widgets.TreeView", {

  factory : function( properties ) {
    var result = new jsw.widgets.TreeView();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
		"multiple",
		"sorted",
		"editable"
  ]),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
  		"multiple" : function( widget, value ) {
		    widget._setMultipleSelection( value );
		},
  		"sorted" : function( widget, value ) {
		    widget._setSorted( value );
		},
  		"editable" : function( widget, value ) {
		    widget._setEditable( value );
		}
  }),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),
  
  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

} );
