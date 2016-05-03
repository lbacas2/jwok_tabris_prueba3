
jsw.qx.Class.define( "renderer.html5.base.ShellRenderer", {

  extend : renderer.html5.base.ParentWidgetRenderer,

  construct : function() {
	  this.base( arguments );
  },

  members : {
	  onCreate : function() {
		  bewf.on( "render", this.__afterRenderers );
		  this.base( arguments );
	  },
	  
	  onDispose : function(evt) {
		  bewf.off( "render", this.__afterRenderers );
		  this.base( arguments );
	  },
	  
	  render : function() {
		  this.setEl( $('body') );
		  this.base( arguments );
	  },
	  
	  _onPropertyChangeEvent : function( evt ) {
		  this.base(arguments, evt);
	  },
	  
	  // TODO: Mover a Metronic
	  __afterRenderers : function() {
		// Se coloca un temporizador para minimizar que se desbloque quedando algún renderer a medias
			window.setTimeout(function() {
				renderer.html5.metronic.DisplayRenderer.unblockUI();
          }, 1000);
	  }
  }
  
} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.JSWShell", {
	create : function() {
		return new renderer.html5.base.ShellRenderer();
	}
});