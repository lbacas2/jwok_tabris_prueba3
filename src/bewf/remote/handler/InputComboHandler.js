
jsw.remote.HandlerRegistry.add( "jsw.widgets.InputCombo", {

  factory : function( properties ) {
    var adapterUtil = jsw.remote.HandlerUtil;
    var result = new jsw.widgets.InputCombo();
    adapterUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
		"multipleSelection",
		"searchEnabled"
		].concat(jsw.widgets.mixin.InputControl.widgetProperties)
  ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( 
		// Merge mixin with new property handlers
		jsw.util.Objects.mergeWith({
	  		"multipleSelection" : function( widget, value ) {
			    widget._setMultipleSelection( value );
			},	
	  		"searchEnabled" : function( widget, value ) {
			    widget._setSearchEnabled( value );
			}
		}, jsw.widgets.mixin.InputControl.widgetMethods, false)
  ),

  events : [].concat( jsw.widgets.mixin.InputControl.events ),

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

} );
