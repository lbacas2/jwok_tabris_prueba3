
jsw.qx.Class.define( "renderer.tabris.ImageRenderer", {

	extend : renderer.tabris.WidgetRenderer,

	statics : {
		fetchImage : function ( wRenderer, imageUrl ) {
			// Si es un enlace externo ( empieza con http(s) ), lo asignamos directamente al elemento ImageView.
			if ( /^https?:\/\//i.test( imageUrl ) && wRenderer.getEl() !== null && imageUrl !== null ) {
				wRenderer.getEl().set( 'image', imageUrl );
				//console.log ( 'imageUrl: ' + imageUrl );
				return;
			}
			// En caso no ser una URL completa, buscarlo localmente y en caso de no existir intentamos buscarlo en el servidor 
			var localUrl  = tabris.app.getResourceLocation( imageUrl );
			var remoteUrl = serverUrl + imageUrl;
			
			renderer.tabris.ImageRenderer.__checkExistsUrl( wRenderer, localUrl, function( wRenderer, exists ) {
				if ( exists ) {
					wRenderer.getEl().set( 'image', localUrl );
					//console.log ( 'localUrl: ' + localUrl );
				} else {
					renderer.tabris.ImageRenderer.__checkExistsUrl( wRenderer, remoteUrl, function( wRenderer, exists ) {
						if ( exists ) {
							wRenderer.getEl().set( 'image', remoteUrl );
							//console.log ( 'remoteUrl: ' + remoteUrl );
						}
					});
				}
			});
		},
		
		__checkExistsUrl : function( wRenderer, imageUrl, callback ) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if ( this.readyState === this.DONE ) {
					var exists = ( this.status === 200 );
					callback( wRenderer, exists );
				}
			}
			xmlhttp.open( 'HEAD', imageUrl, true );	// Tabris.js doesn't support synchronous requests.
			xmlhttp.send();
		},
	},
	
	members : {
		//@Override
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var _this = this;
				var elem = new tabris.ImageView({
						id : this.getJSWWidget().getRenderRole(),
						scaleMode : 'fit'
				}).appendTo( parentElem );
				
				this.setEl( elem );
				this.base( arguments );
				
				this._updateImage();
			}
			
			this._renderIsDone();
		},
		
		_onPropertyChangeEvent : function(evt) {
			this.base( arguments, evt );
			
			switch (evt.property) {
				case 'source':
					this._updateImage();
					break;
				default:
			}
			return;
		},
		
		_updateImage : function () {
			var image = this.getJSWWidget().getImage();		
			if ( this.getEl() !== null && image !== null ) {
				renderer.tabris.ImageRenderer.fetchImage( this, image );
			}
		},
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Image",  {
	create : function() {
		return new renderer.tabris.ImageRenderer();
	}
});
