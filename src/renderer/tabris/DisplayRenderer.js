
jsw.qx.Class.define( "renderer.DisplayRenderer", {

	extend : renderer.base.Renderer,
	
	statics : {
		blockUI : function() {
		},

		unblockUI : function() {
		}
	},

	construct : function() {
		this.base( arguments );
		this._display = null;
	},

	destruct : function() {
		delete this._display.__renderer;
	},

	members : {
		setJSWDisplay : function( display ) {
 			this._display = display;
 			this._initialize();
			return; 
		},

		getJWSDisplay : function() {
			return this._display;
		},

		onCreated : function() {
			// A partir de ahora pongo al display renderer a escuchar los eventos de nuevos hijos
			this._display.addEventListener( jsw.widgets.base.WidgetEvent.WidgetEventType_CHILD_CREATE, this._onChildWidgetCreated, this );
			this._display.addEventListener( jsw.widgets.base.WidgetEvent.WidgetEventtype_CHILD_DISPOSE, this._onChildWidgetDisposed, this );
			return;
		},

////////////////////////////////////////////////////////////////////////////////////////
// Metodos privados
////////////////////////////////////////////////////////////////////////////////////////
		_initialize : function() {
			// Se ejecuta el proceso especifico del renderer del display
			this.onCreated();
			this.setRendered( true );
			// Se crean los hijos. Lo normal es que en este estado aun no existan shells que renderizar
			this._createShellRenderersInternal();
			return;
		},

		_createShellRenderersInternal : function() {
			var allShells = this.getJWSDisplay().getJSWShells();
			var arrayLength = allShells.length;
			for (var i = 0; i < arrayLength; i++) {
				__onChildShellCreatedInternal(allShells[i]);
			}
			return;
		},

		__onChildShellCreatedInternal : function(shell) {
			var role = shell.getRenderRole();
			var shellRenderer = null;
			if(role) {
				if(renderer.base.RendererHandlerRegistry.getInstance().hasHandler("jsw.widgets.JSWShell:" + role)){
					shellRenderer = renderer.base.RendererHandlerRegistry.getInstance().getHandler("jsw.widgets.JSWShell:" + role).create();
				}
			}
		    if( shellRenderer == null ){
				shellRenderer = renderer.base.RendererHandlerRegistry.getInstance().getHandler("jsw.widgets.JSWShell").create();
			}
			shellRenderer.setParent(this);
			shellRenderer.setJSWWidget(shell);
			return;
		},
		
		_onChildWidgetCreated : function( evt ) {
			this.__registerEvent(evt);
			var shell = evt.getData().newWidget;
			this.__onChildShellCreatedInternal(shell);
			return;
		},
		
		_onChildWidgetDisposed : function(evt){
			return;
		}
	}

});


renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.JSWDisplay", {
	create : function() {
		return new renderer.DisplayRenderer();
	}
});
