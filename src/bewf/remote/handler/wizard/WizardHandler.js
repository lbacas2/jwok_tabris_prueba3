jsw.remote.HandlerRegistry.add( "jsw.widgets.Wizard", {

  factory : function( properties ) {
    var adapterUtil = jsw.remote.HandlerUtil;
    var result = new jsw.widgets.Wizard();
    adapterUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
		"currentPage",
		"nextPage",
		"backButtonEnable",
		"nextButtonEnable",
		"cancelButtonEnable",
		"finishButtonEnable",
		"error",
		"success"
  ] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
		"backButtonEnable" : function( widget, value ) {
		    widget._setBackButtonEnable( value );
		},
		"nextButtonEnable" : function( widget, value ) {
		    widget._setNextButtonEnable( value );
		},
		"cancelButtonEnable" : function( widget, value ) {
		    widget._setCancelButtonEnable( value );
		},
		"finishButtonEnable" : function( widget, value ) {
		    widget._setFinishButtonEnable( value );
		}
  } ),

  events : ["Next", "Previous", "Finish", "Cancel", "PageChanged"],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

});
