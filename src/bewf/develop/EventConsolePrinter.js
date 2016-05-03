

jsw.qx.Class.define("jsw.develop.EventConsolePrinter", {

	statics : {
        printQueueEvent : function(queue, evt){
        	if( jsw.develop.DevelopMode.isSendEventsToConsoleMode() ){
        		var str = "QUEUE: " + queue + " EVT: " +  evt.toString();
        		console.log(str);
        	}
        },
        
        printNotifyQueueEvent : function(queue, contextEvent){
        	if( jsw.develop.DevelopMode.isSendEventsToConsoleMode() ){
        		var str = "NOTIFY: " + queue + " EVT: ";
        		console.log(str);
        	}
        }
    }
		
});


