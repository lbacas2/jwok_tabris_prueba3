
jsw.remote.HandlerRegistry.add( "jsw.widgets.SideBar", {

  factory : function( properties ) {
    var result = new jsw.widgets.SideBar();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( ["selectedItem"] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
	  "selectedItem" : function( widget, value ) {
		  widget._setSelectedItem( value );
	  }
	  
  } ),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

});
