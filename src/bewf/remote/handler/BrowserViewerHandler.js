
jsw.remote.HandlerRegistry.add( "jsw.widgets.BrowserViewer", {

  factory : function( properties ) {
    var result = new jsw.widgets.BrowserViewer();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
    "source"
  ] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {} ),

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

});


