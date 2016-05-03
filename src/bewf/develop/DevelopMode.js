

jsw.qx.Class.define("jsw.develop.DevelopMode", {

	statics : {
		_developMode : true,
		_sendEventsToConsoleMode : false,

		isDevelopMode : function(){
			return jsw.develop.DevelopMode._developMode;
		},

		setDevelopMode : function(developMode){
			jsw.develop.DevelopMode._developMode = developMode;
		},

		isSendEventsToConsoleMode : function(){
			if( !jsw.develop.DevelopMode.isDevelopMode() ){
				return false;
			}
			return jsw.develop.DevelopMode._sendEventsToConsoleMode;
		},

		setSendEventsToConsoleMode : function(sendEventsToConsoleMode){
			jsw.develop.DevelopMode._sendEventsToConsoleMode = sendEventsToConsoleMode;
		}

    }
		
});


