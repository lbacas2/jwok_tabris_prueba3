
jsw.remote.HandlerRegistry.add( "jsw.widgets.FileUpload", {

  factory : function( properties ) {
    var result = new jsw.widgets.FileUpload();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
		    "label",
		    "link",
		    "maxSize",
		    "uploadUrl",
		    "supportedExts",
		    "files"
		].concat(jsw.widgets.mixin.InputControl.widgetProperties)
  ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler(
		// Merge mixin with new property handlers
		jsw.util.Objects.mergeWith({
			"label" : function( widget, value ) {
				widget._setLabel( value );
			},
			"link" : function( widget, value ) {
				widget._setLink( value );
			},
			"maxSize" : function( widget, value ) {
				widget._setMaxSize( value );
			},
			"uploadUrl" : function( widget, value ) {
				widget._setUploadUrl( value );
			},
			"supportedExts" : function( widget, value ) {
				widget._setSupportedExts( value );
			},
			"files" : function( widget, value ) {
				widget._setFiles( value );
			}
		}, jsw.widgets.mixin.InputControl.widgetMethods, false)
  ),
  
  events : ["Files"].concat( jsw.widgets.mixin.InputControl.events ),

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

});


