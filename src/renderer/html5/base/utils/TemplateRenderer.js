
jsw.qx.Class.define("renderer.html5.base.utils.Template",
{
	type : 'static',

	/*
	*****************************************************************************
	   STATICS
	*****************************************************************************
	*/
	statics : {
		PATH: window.location.pathname.replace(/\/[^\/]+$/,"") + '/tester/',
		FILE_EXT: '.mustache',
		__templates : {
			'jsw.widgets.JSWShell' : {
				'mainTopView' : 'view.topview',
				'login' :       'view.login',
				'loginView' :   'view.login',
			},
			'jsw.widgets.Composite' : {
			},
			'jsw.widgets.Table' : {
			}
		},
		__store : {},
		
	  
		downloadTemplateIfExists : function ( wRenderer ) {
			var widgetRole, widgetType, templateStr = null;
			
			try {
				widgetRole  = wRenderer.getJSWWidget().getRenderRole() || '';
				widgetType  = wRenderer.getJSWWidget().classname || '';
				templateStr = this.__getTemplatePath( wRenderer.getJSWWidget() );
				
				if (templateStr !== null && this.__store[templateStr] === undefined) {
					renderer.base.AjaxRemoteUtils.doPost(this, templateStr, 
							function(msg) {
								this.__store[templateStr] = msg;
								wRenderer.templateIsDone( templateStr );
							},
							function(data) {
								wRenderer.templateIsDone( null );
							}
					);
				} else {
					wRenderer.templateIsDone( templateStr );
				}
			} catch (ex) {
				console.error (ex);
				wRenderer.templateIsDone( null );
			}
		},
		
		/**
		 * 
		 * @param wRenderer Renderer que contiene el widget al que queremos aplicar la plantilla y su elemento DOM HTML donde aplicarlo.
		 * @param replace   Boolean. Indica si la plantilla reemplazará al contenido previo en caso de existir (defecto: true)
		 */
		applyTemplate : function( wRenderer, replace ) {
			var widget   = wRenderer.getJSWWidget();
			var domElems = wRenderer.getEl();
			var templateStr, 
				content;
			
			replace = replace || true; // Si no se define el parametro se entiende que el valor por defecto es reemplazar el contenido.
			
			try {
				templateStr = this.__getTemplatePath( widget );
				
				// TODO: Añadir comprobaciones al domElem
				if (templateStr !== null && domElems !== null) {
					content = this.__store[templateStr] || '';
					
					if (content && content.length > 0 ) {
						domElems.each( function() {
							try {
								if (replace === true) {
									$(this).empty();
									$(this).html(content);
								} else {
									$(this).append(content);
								}
								
							} catch (ex) {
								console.error ("Error al cambiar la plantilla '" + templateStr + "': " + ex.message);
							}
						});
					}
					return true;
				}
			} catch (ex) {
				console.error (ex.stack);
			}
			
			return false;
		},

				
		__getTemplatePath : function( widget ) {
			var widgetRole = widget.getRenderRole() || '',
				widgetType = widget.classname || '',
				templateStr = null;
			
			if (widgetRole === '') {
				return null;
			}
			
			try {
				if ( this.__templates[widgetType] !== undefined && this.__templates[widgetType][widgetRole] !== undefined) {
					templateStr = this.__templates[widgetType][widgetRole];
					if (templateStr === '-') {
						templateStr = widgetRole;
					}
					templateStr =  getServerUrl( null, '/tester/' ) + templateStr + this.FILE_EXT;
					
				} else if (widgetType === 'jsw.widgets.Composite') {
					if ( widgetRole.match(/^view\.T(|E)View_\w+$/i) !== null 
									|| widgetRole.match(/^searchview\.TSView_\w+$/i) !== null
									|| widgetRole.match(/^list\.T(|S)List_\w+$/i) !== null
									|| widgetRole.match(/^graph\.TGraph_\w+$/i) !== null 
									|| widgetRole.match(/^explorer.TExplorer_\w+$/i) !== null
									|| widgetRole.match(/^detail.TDetail_\w+$/i) !== null ) {
						templateStr =  getServerUrl( null, '/tester/' ) + widgetRole + this.FILE_EXT;
					}
				}
				
			} catch (err) {
				templateStr = null;
			}
			return templateStr;
		}
	}

});