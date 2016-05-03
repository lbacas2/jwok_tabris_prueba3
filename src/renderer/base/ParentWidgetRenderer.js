jsw.qx.Class.define( "renderer.base.ParentWidgetRenderer", {

	extend : renderer.base.WidgetRenderer,
	
	include : renderer.base.mixin.ParentWidgetRenderer,
	
	members : {
		setJSWWidget : function(jswWidget) {
			this.base( arguments, jswWidget );
			
			this.getJSWWidget().addEventListener( jsw.widgets.base.WidgetEvent.WidgetEventType_CHILD_CREATE, this.__onChildCreate, this );
			this.getJSWWidget().addEventListener( jsw.widgets.base.WidgetEvent.WidgetEventtype_CHILD_DISPOSE, this.__onChildDispose, this );
			return;
		},
	
		onCreate : function() {
			this.base(arguments);
			
			this.__createChildWidgets();
		}
	}
	
});
