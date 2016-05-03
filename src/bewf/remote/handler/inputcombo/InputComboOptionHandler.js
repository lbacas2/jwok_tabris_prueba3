
jsw.remote.HandlerRegistry.add( "jsw.widgets.inputcombo.InputComboOption", {

  factory : function( properties ) {
    var adapterUtil = jsw.remote.HandlerUtil;
    var result = new jsw.widgets.inputcombo.InputComboOption();
    adapterUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( 
		// Merge mixin with new properties
		[
		 	"value",
			"image",
			"additionalText",
			"selected",
			"disabled"
		].concat(jsw.widgets.mixin.InputComboItem.widgetProperties)
  ),
  
  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( 
		// Merge mixin with new property handlers
		jsw.util.Objects.mergeWith({
			"value" : function( widget, value ) {
			    widget._setValue( value );
			},
	  		"image" : function( widget, value ) {
			    widget._setImage( value );
			},
			"additionalText" : function( widget, value ) {
			    widget._setAdditionalText( value );
			},
			"selected" : function( widget, value ) {
			    widget._setSelected( value );
			},
	  		"disabled" : function( widget, value ) {
			    widget._setDisabled( value );
	  		}
		}, jsw.widgets.mixin.InputComboItem.widgetMethods, false)
  ),

  events : [ "Selected" ],

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} )

} );
