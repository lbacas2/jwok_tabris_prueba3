
jsw.qx.Mixin.define( "renderer.base.mixin.ParentWidgetRenderer", {

	construct : function() {
		this.$containerEl = null;
	},
	
	members : {
		__createChildWidgets : function() {
			var childrenAux = this.getJSWWidget().getChildren();
			var arrayLength = childrenAux.length;
			for (var i = 0; i < arrayLength; i++) {
				this.__createChildWidget(childrenAux[i]);
			}
			return;
		},

		__createChildWidget : function(widget) {
			var widgetRenderer = null;
			var role = widget.getRenderRole();
			if(role && renderer.base.RendererHandlerRegistry.getInstance().hasHandler(widget.classname +":" + role) ) {
				widgetRenderer = renderer.base.RendererHandlerRegistry.getInstance().getHandler(widget.classname +":" + role).create();
			}
			if(widgetRenderer == null) {
				widgetRenderer = renderer.base.RendererHandlerRegistry.getInstance().getHandler(widget.classname).create();
			}
			
			if(widgetRenderer != null) {
				widgetRenderer.setParent(this);
				widgetRenderer.setJSWWidget(widget);
			}
			return;
		},
		
		__onChildCreate : function(evt) {
			this.__registerEvent(evt);
			this.__createChildWidget(evt.getData().newWidget);
			return;
		},

		__onChildDispose : function(evt) {
			this.__registerEvent(evt);
			this.onChildDispose(evt);
		},

		onChildDispose : function(evt) {
		},
		
		getChildren : function(){
			return this._children;
		},
		
		getContainerEl : function() {
			return ( this.$containerEl !== null ) ? this.$containerEl : this.getEl();
		},
		setContainerEl : function( el ) {
			this.$containerEl = el || null; // Evitamos que pueda ser undefined
		}
	}
});