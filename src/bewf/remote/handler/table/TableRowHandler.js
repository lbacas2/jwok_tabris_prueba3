jsw.remote.HandlerRegistry.add( "jsw.widgets.table.TableRow", {
	
  factory : function( properties ) {
    var result = new jsw.widgets.table.TableRow();
    jsw.remote.HandlerUtil.setParent( result, properties.parentWidget );
    return result;
  },

  destructor : jsw.remote.HandlerUtil.getControlDestructor(),

  getDestroyableChildren : jsw.remote.HandlerUtil.getDestroyableChildrenFinder(),

  properties : jsw.remote.HandlerUtil.extendControlProperties( [
      "internalId",
      "texts",
      "images",
      "backgrounds",
      "foregrounds",
      "widgets",
      "checked",
      "selected"
  ] ),

  propertyHandler : jsw.remote.HandlerUtil.extendControlPropertyHandler( {
	  	"internalId" : function( widget, value ) {
		    widget._setInternalId( value );
		},
		"texts" : function( widget, value ) {
		    widget._setTexts( value );
		},
		"images" : function( widget, value ) {
		    widget._setImages( value );
		},
		"backgrounds" : function( widget, value ) {
		    widget._setBackgrounds( value );
		},
		"foregrounds" : function( widget, value ) {
		    widget._setForegrounds( value );
		},
		"widgets" : function( widget, value ) {
		    widget._setWidgets( value );
		},
		"checked" : function( widget, value ) {
		    widget._setChecked( JSON.parse(value) );
		},
		"selected" : function( widget, value ) {
		    widget._setSelected( JSON.parse(value) );
		},
  } ),
  
  events : [ "Selected", "Checked", "ExecHyperlink", "ShowDetails" ],
  
  listeners : jsw.remote.HandlerUtil.extendControlListeners( [] ),

  listenerHandler : jsw.remote.HandlerUtil.extendControlListenerHandler( {} ),

  methods: [],

  methodHandler : jsw.remote.HandlerUtil.extendListenerMethodHandler( {} )

});
