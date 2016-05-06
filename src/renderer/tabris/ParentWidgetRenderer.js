
jsw.qx.Class.define( "renderer.tabris.ParentWidgetRenderer", {

	extend : renderer.tabris.WidgetRenderer,
	
	include : renderer.base.mixin.ParentWidgetRenderer,
	
	members : {
		setJSWWidget : function( jswWidget ) {
			this.base( arguments, jswWidget );
			
			this.getJSWWidget().addEventListener( jsw.widgets.base.WidgetEvent.WidgetEventType_CHILD_CREATE, this.__onChildCreate, this );
			this.getJSWWidget().addEventListener( jsw.widgets.base.WidgetEvent.WidgetEventtype_CHILD_DISPOSE, this.__onChildDispose, this );
		},
	
		onCreate : function() {
			this.base(arguments);
			
			this.__createChildWidgets();
		}
	}
	
});

