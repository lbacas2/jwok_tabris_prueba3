

jsw.qx.Class.define( "renderer.base.ConnectionRenderer", {

	extend : renderer.base.Renderer,

	construct : function( ) {
		this.base( arguments );
	},

	destruct : function() {
		delete this._connection.__renderer;
	},

	members : {

		getConnection : function(){
			return this._connection;
		},

		setConnection : function(connection){
			this._connection = connection;
			this._connection.__renderer = this;
			this._connection.addEventListener( jsw.connection.ConnectionEvent.ConnectionEventType_CONNECT, this._onConnectionEvent, this );
			this._connection.addEventListener( jsw.connection.ConnectionEvent.ConnectionEventType_DISPLAY_CREATED, this._onDisplayCreatedEvent, this );
			this._connection.addEventListener( jsw.connection.ConnectionEvent.ConnectionEventtype_DISCONNECT, this._onDesconnectionEvent, this );
		},

		getDisplayRenderer : function(){
			return this._displayRenderer;  
		},

		_setDisplayRenderer : function( renderer){
			this._displayRenderer = renderer;  
		},

		getConnectionRenderer : function(){
			return this;
		},

		_onConnectionEvent : function( evt ){
			this.__registerEvent(evt);
			this.onConnectEvent( evt );
			return;
		}, 

		_onDisplayCreatedEvent : function( evt ){
			this.__registerEvent(evt);
			// Se crea el renderer para el display
			this._displayRenderer = renderer.base.RendererHandlerRegistry.getInstance().getHandler("jsw.widgets.JSWDisplay").create();
			this._displayRenderer.setParent(this);
			this._displayRenderer.setJSWDisplay(this.getConnection().getJSWDisplay());
			this.onDisplayCreatedEvent(evt);
			//this._displayRenderer._initialize();
			return;
		}, 

		_onDesconnectionEvent : function( evt ){
			this.__registerEvent(evt);
			this.onDisconnectEvent( evt );
			return;
		}, 

		onConnectEvent : function( evt ){
			return;
		},

		onDisplayCreatedEvent : function( evt ){
			return;
		},

		onDisconnectEvent : function( evt ){
			return;
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.connection.Connection", { 
	create : function() {
		return new renderer.base.ConnectionRenderer();
	}
});
