
var jws = require("../../../jws.js");

jsw.qx.Class.define("renderer.tabris.utils.Template",
{
	type : 'static',

	/*
	*****************************************************************************
	   STATICS
	*****************************************************************************
	*/
	statics : {
		FILE_EXT: '.tpl',
		__templates : {
			'jsw.widgets.JSWShell' : {},
			'jsw.widgets.Composite' : {}
		},
		__store : {},
		
	  
		downloadTemplateIfExists : function ( wRenderer ) {	
			var widgetRole, widgetType, templateStr = null;
			
			try {
				widgetRole  = wRenderer.getJSWWidget().getRenderRole() || '';
				widgetType  = wRenderer.getJSWWidget().classname || '';
				templateStr = this.__getTemplatePath( wRenderer.getJSWWidget() );

				if ( templateStr === null ) {
					wRenderer.templateIsDone( null );
					
				} else {
					if (this.__store[templateStr] === undefined ) {
						renderer.base.AjaxRemoteUtils.doPost( this, templateStr, 'application/json',
								function( msg ) {
									try {
										msg = JSON.parse( msg );
									} catch( ex ) {
										console.error ( ex.stack );
									}
									this.__store[templateStr] = msg;
									wRenderer.templateIsDone( this.__store[templateStr] );
								},
								function( data ) {
									wRenderer.templateIsDone( null );
								}
						);
					} else {
						wRenderer.templateIsDone( this.__store[templateStr] );
					}
				}
			} catch (ex) {
				console.error (ex);
				wRenderer.templateIsDone( null );
			}
		},
				
		__getTemplatePath : function( widget ) {
			var widgetRole  = widget.getRenderRole() || '';
			var widgetType  = widget.classname || '';
			var templateStr = null;
			
			if ( widgetRole !== '' && this.__templates[widgetType] !== undefined ) {
				try {
					//templateStr =  jws.getServerUrl( serverUrl, templatePath ) + '/' + widgetRole + this.FILE_EXT;
					//templateStr =  jws.getServerUrl( serverUrl, templatePath ) + '/tabrisjs.' + widgetRole + this.FILE_EXT;
					templateStr =  tabris.app.getResourceLocation( '/templates/' + widgetRole + this.FILE_EXT );
				} catch( ex ) {
					console.error( ex.stack );
					templateStr = null;
				}
			}
			
			return templateStr;
		}
	}

});