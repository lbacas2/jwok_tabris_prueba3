jsw.remote.HandlerRegistry.add( "jsw.widgets.tabs.TabItem", {

  factory : function( properties ) {
    var adapterUtil = jsw.remote.HandlerUtil;
    var result = new jsw.widgets.tabs.TabItem();
    adapterUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
        "internalId",
		"text",
		"image",
		"selected",
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
		"selected" : function( widget, value ) {
		    widget._setSelected( value );
		},
  } ),

  events : [ "Selected" ],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

});
