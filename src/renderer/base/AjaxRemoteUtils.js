
jsw.qx.Class.define( "renderer.base.AjaxRemoteUtils", {

	extend : jsw.qx.Object,

	construct : function() {
		this.base( arguments );
	},

	destruct : function() {
	},

	statics : {
		doPost : function(target, purl, pDataType, psuccess, pfail) {
		
			if ( jsw.client.Client.isTabris() ) {
				var request = new jsw.remote.Request( purl, "GET", pDataType || "text/html" );
				
				request.setSuccessHandler( function( jqXHR ) {
					var msg = jqXHR.responseText;
					psuccess.call( target, msg );
				});
				request.setErrorHandler( function( jqXHR ) {
					pfail.call( target, jqXHR, jqXHR.status );
				});
				request.send();
				
			} else if ( typeof $ !== 'undefined' && typeof $.ajax === 'function' ) {
				var obj = {};

				obj.url = purl;
				obj.type = "GET";
				obj.dataType = pDataType || "html";
				obj.cache = false;
				
				var request = $.ajax(obj);
				request.done( function(msg) {
					psuccess.call(target, msg);
				});
				request.fail( function(jqXHR, textStatus) {
					pfail.call(target, jqXHR, textStatus);
				});
				
			} else {
				pfail.call(target, null, 'Not exists Ajax implementation.');
			}
			return;
		}
		
	},
	
	members : {
	}

} );

