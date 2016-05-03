
jsw.remote.HandlerRegistry.add( "jsw.widgets.InputDateRange", {

  factory : function( properties ) {
    var result = new jsw.widgets.InputDateRange();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
		"minDate",
		"maxDate",
		"showMonthYearSelector",
		"showPredefinedRanges",
		"isLinkedCalendars"
		].concat(jsw.widgets.mixin.InputControl.widgetProperties)
  ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( 
		// Merge mixin with new property handlers
		jsw.util.Objects.mergeWith({
			"minDate" : function( widget, value ) {
				widget._setMinDate( value );
			},
			"maxDate" : function( widget, value ) {
				widget._setMaxDate( value );
			},
			"showMonthYearSelector" : function( widget, value ) {
				widget._setShowMonthYearSelector( value );
			},
			"showPredefinedRanges" : function( widget, value ) {
				widget._setShowPredefinedRanges( value );
			},
			"isLinkedCalendars" : function( widget, value ) {
				widget._setLinkedCalendars( value );
			}
		}, jsw.widgets.mixin.InputControl.widgetMethods, false)
  ),

  events : jsw.widgets.mixin.InputControl.events,

  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

} );


