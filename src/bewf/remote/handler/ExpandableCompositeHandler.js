
jsw.remote.HandlerRegistry.add( "jsw.widgets.ExpandableComposite", {

  factory : function( properties ) {
    var adapterUtil = jsw.remote.HandlerUtil;
    var result = new jsw.widgets.ExpandableComposite();
    adapterUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
        "title",
        "expandable",
        "expanded"
  ] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
	  	"title" : function( widget, title ) {
		    widget._setTitle( title );
		},
		"expandable" : function( widget, expandable ) {
		    widget._setExpandable( expandable );
		},
		"expanded" : function( widget, expanded ) {
		    widget._setExpanded( expanded );
		},
  }),

  events : [],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

});
