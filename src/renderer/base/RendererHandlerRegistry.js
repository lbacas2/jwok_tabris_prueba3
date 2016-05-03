

jsw.qx.Class.define( "renderer.base.RendererHandlerRegistry", {

  extend : jsw.qx.Object,

  construct : function( ) {
    this.base( arguments );
	this._registry = {};
  },

  destruct : function() {
  },

  statics : {
	getInstance : function(){
	  if(renderer.base.RendererHandlerRegistry._instance) {
		  return renderer.base.RendererHandlerRegistry._instance;
	  }
 	  renderer.base.RendererHandlerRegistry._instance = new renderer.base.RendererHandlerRegistry();
	  return renderer.base.RendererHandlerRegistry._instance;
	}  
  },
  
  members : {

    add : function( key, handler ) {
	  this._registry[ key ] = handler;
    },

    remove : function( key ) {
	  delete this._registry[ key ];
	},

	getHandler : function( key ) {
	  var result = this._registry[ key ];
	  if( result === undefined ) {
	    throw new Error( "No Handler for type " + key );
	  }
	  return result;
	},

	hasHandler : function( key ) {
	  return this._registry[ key ] != null;
	}
  }	  
} );


