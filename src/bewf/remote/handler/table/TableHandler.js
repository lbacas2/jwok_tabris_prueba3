jsw.remote.HandlerRegistry.add( "jsw.widgets.Table", {
	
  factory : function( properties ) {
    var result = new jsw.widgets.Table();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
        "multipleSelection",
        "selectionColumnVisible",
        "deselectRowAllowed",
        "fixedColumns",
        "sortColumn",
        "sortDirection"
  ] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
	  	"multipleSelection" : function( widget, value ) {
		    widget._setMultipleSelection( JSON.parse(value) );
		},
		"deselectRowAllowed" : function( widget, value ) {
		    widget._setDeselectRowAllowed( JSON.parse(value) );
		},
		"selectionColumnVisible" : function( widget, value ) {
		    widget._setSelectionColumnVisible( JSON.parse(value) );
		},
		"fixedColumns" : function( widget, value ) {
		    widget._setFixedColumns( JSON.parse(value) );
		},
		"sortColumn" : function( widget, value ) {
		    widget._setSortColumn( JSON.parse(value) );
		},
		"sortDirection" : function( widget, value ) {
		    widget._setSortDirection( value.toUpperCase() );
		},
  } ),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )
});
