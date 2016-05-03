jsw.remote.HandlerRegistry.add( "jsw.widgets.table.TableColumn", {
	
  factory : function( properties ) {
    var result = new jsw.widgets.table.TableColumn();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
      "internalId",
      "text",
      "image",
      "visible",
      "sortable"
  ] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
	  "internalId" : function( widget, value ) {
		  widget._setInternalId( value );
	  },
	  "text" : function( widget, value ) {
		  widget._setText( value );
	  },
	  "image" : function( widget, value ) {
		  widget._setImage( value );
	  },
	  "visible" : function( widget, value ) {
		  widget._setVisible( value );
	  },
	  "sortable" : function( widget, value ) {
		  widget._setSortable( value );
	  }
	  
  } ),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )
});
