

jsw.qx.Class.define( "jsw.connection.Connection", {

	extend : jsw.qx.Target,

	construct : function() {
		this.base( arguments );
		this._url = null;
		this._connected = false;
		this._tryingToConnect = false;
		// Por el momento la conexión del mensaje se considera la única que debe existir
		jsw.connection.Connection._messageConnection = this;
	},

	destruct : function() {
	},

	statics : {
		/**
		 * Debe retornar la conexión a la que pertenece el mensaje en proceso.
		 */
		getMessageConnection : function() {
			if( jsw.connection.Connection._messageConnection ) {
				return jsw.connection.Connection._messageConnection;
			} else {
				return null;
			}
		}
	},

	members : {

		setUrl : function( url ) {
			this._url = url; 
		},

		getUrl : function( ) {
			return this._url; 
		},

		isConnected : function() {
			return this.__connected; 
		},

		connect : function() {
			if (this.isConnected()) {
				return;
			}
			if (this._tryingToConnect) {
				return;
			}
			this._tryingToConnect = true;
			this._tryConnect();
			return;
		},


		disconnect : function() {
			if (!this.isConnected()) {
				return;
			}
			
			// TODO: Cambiar a un Display propio (no el de RAP)
			jsw.widgets.JSWDisplay._sendShutdown();
			this._tryingToConnect = false;
			this.__connected = false;
			jsw.runtime.System.getInstance().removeEventListener( "unload", this._onUnload, this );
			return;
		},

		getJSWDisplay : function(){
			return this._jswDisplay;
		},

		_setJSWDisplay : function(jswDisplay){
			this._jswDisplay = new jsw.widgets.JSWDisplay();
			//this._jswDisplay._setJSWDisplay(jswDisplay);
			if(this._connected) {
				this._dispatchAsyncDisplayCreatedEvent();
			}
		},

		///////////////////////// Miembros privados //////////////////////////////////////

		_tryConnect : function(){
			this._initBewF();
			this._loadMainRWT();
			return;
		},

		_initBewF : function(){

			// Engañar a jsw para que en el evento de carga de la ventana no realice ninguna acción
			var systemInstance = jsw.runtime.System.getInstance();
			systemInstance._onloadDone = true; 

			// Se reemplaza la funcion jsw.event.EventHandler.attachEvents para evitar dependencias con los eventos del DOM
			jsw.event.EventHandler.attachEvents = function() {
				return;
			};

			return;
		},

		_loadMainRWT : function(){
			// Se realiza la llamada inicial. La respuesta se procesa en asincrono mediante la función onMainRWTLoad
			this._xmlhttp=new XMLHttpRequest();
			var thisObj = this;
			this._xmlhttp.onreadystatechange=function(){
				thisObj._onMainRWTLoad();
			}
			this._xmlhttp.open("GET",this._url,true);
			this._xmlhttp.send();
		},

		_onMainRWTLoad : function(){
			if (this._xmlhttp.readyState==4 && this._xmlhttp.status==200) {
				var obj = eval("(" + this._xmlhttp.responseText  + ')');		
				jsw.remote.MessageProcessor.processMessage( obj );
				var systemInstance = jsw.runtime.System.getInstance();
				systemInstance._onloadDone = false;
				systemInstance._onload();
				delete this._xmlhttp;
				this._connected = true;
				this._tryingToConnect = false;
				jsw.runtime.System.getInstance().addEventListener( "unload", this._onUnload, this );
				this._dispatchAsyncConnectEvent( );
			}
		},

		_onUnload : function( evt ){
			this.disconnect();
			return;
		},

		/**
		 * Dispatch an event in async Mode
		 *
		 * @param evt {jsw.event.Event} event to dispatch
		 * @param dispose {Boolean} whether the event object should be disposed after all event handlers run.
		 * @return {Boolean} whether the event default was prevented or not. Returns true, when the event was NOT prevented.
		 */
		_dispatchAsyncConnectEvent : function( evt ) {
			var evt = new jsw.connection.ConnectionEvent( jsw.connection.ConnectionEvent.ConnectionEventType_CONNECT, this );
			this._dispatchAsyncEvent( jsw.qx.Target.CONNECT_QUEUE, evt);

			this._dispatchAsyncDisplayCreatedEvent();
		},

		_dispatchAsyncDisplayCreatedEvent : function( evt ) {
			if(this._jswDisplay){
				var evt = new jsw.connection.ConnectionEvent( jsw.connection.ConnectionEvent.ConnectionEventType_DISPLAY_CREATED, this );
				this._dispatchAsyncEvent( jsw.qx.Target.CONNECT_QUEUE, evt);
			}
		}

	}
});

