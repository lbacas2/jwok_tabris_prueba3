
jsw.remote.HandlerRegistry.add( "jsw.widgets.treeview.TreeViewItem", {

  factory : function( properties ) {
    var result = new jsw.widgets.treeview.TreeViewItem();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
		"internalId",
		"index",
		"text",
		"image",
		"selected",
		"checked",
		"expanded"
  ]),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
		"internalId" : function( widget, value ) {
		    widget._setInternalId( value );
		},
		"index" : function( widget, value ) {
		    widget._setIndex( value );
		},
		"text" : function( widget, value ) {
		    widget._setText( value );
		},
		"image" : function( widget, value ) {
		    widget._setImage( value );
		},
		"selected" : function( widget, value ) {
		    widget._setSelected( JSON.parse(value) );
		},
		"checked" : function( widget, value ) {
		    widget._setChecked( JSON.parse(value) );
		},
		"expanded" : function( widget, value ) {
		    widget._setExpanded( value );
		},
	  
  }),

  events : [ "Selected", "Checked", "Expanded" ],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),
  
  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

} );
