
jsw.qx.Class.define( "renderer.base.AjaxRemoteUtils", {

	extend : jsw.qx.Object,

	construct : function() {
		this.base( arguments );
	},

	destruct : function() {
	},

	statics : {
		doPost : function(target, purl, psuccess, pfail) {
			var obj = {};

			obj.url = purl;
			obj.type = "GET";
			obj.dataType = "html";
			obj.cache = false;
				  
			var request = $.ajax(obj);
			
			request.done(function(msg){
				psuccess.call(target, msg);
			});
			request.fail(function(jqXHR, textStatus) {
				pfail.call(target, jqXHR, textStatus);
			});
			return;
		}
		
	},
	
	members : {
	}

} );

