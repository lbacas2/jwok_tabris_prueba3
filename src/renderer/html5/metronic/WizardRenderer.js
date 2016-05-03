jsw.qx.Class.define( "renderer.html5.metronic.WizardRenderer", {

	extend : renderer.html5.base.WizardRenderer,

	members : {
		render : function(){
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );
				
				this.base(arguments);

				//////////////////
				//  JS RENDER

				var _this = this;
				this.getEl().addClass('form-wizard');

				// Children
				var pages = this.getEl().children();

				// Create form body
				this.getEl().wrapInner("<div class='form-body' id='" + role + "-form-body'></div>");
				var formBody = $("#" + role + "-form-body");

				// nav-pills
				var navPils = $(document.createElement('ul'))
				.addClass('nav nav-pills nav-justified steps')
				.prependTo( formBody );

				var tabCounter = 1;
				pages.each(function () {

					var pageRoleId = $(this).attr('id');

					var pillLi = $(document.createElement('li'))
					.addClass('nav nav-pills nav-justified steps')
					.appendTo( navPils );

					var pillA = $(document.createElement('a'))
					.attr({
						'href':        '#' + pageRoleId,
						'data-toggle': 'tab',
						'class':       'step'
					})
					.appendTo( pillLi );

					$(document.createElement('span'))
					.addClass('number')
					.html(tabCounter)
					.appendTo( pillA );

					// Page Name
					var children = _this.getJSWWidget().getChildren();
					var pageTitle = "";
					$(children).each( function( index, element ) {
						if (pageRoleId === element._roleId){
							pageTitle = element._title;
						}
					});

					var pillSpanIcon = $(document.createElement('span'))
					.addClass('desc')
					.html(pageTitle)
					.appendTo( pillA );

					$(document.createElement('i'))
					.addClass('fa fa-check')
					.prependTo( pillSpanIcon );

					tabCounter++;
				  });

				// progress-bar
				var progressBar = $(document.createElement('div'))
				.attr({
					'role' : 'progressbar',
					'class': 'progress progress-striped'
				})
				.insertAfter( navPils );

				var pillA = $(document.createElement('div'))
				.addClass('progress-bar progress-bar-success')
				.appendTo( progressBar );


				// tab-content
				pages.wrapAll("<div class='tab-content' id='" + role + "-tab-content'></div>");

				var tabContent = $("#" + role + "-tab-content");

				// error and success areas
				_this.errorArea = $(document.createElement('div'))
				.addClass('alert alert-danger display-none')
				.html( _this.getJSWWidget().getError() )
				.prependTo( tabContent );

				$(document.createElement('button'))
				.attr({
					'data-dismiss' : 'alert',
					'class'        : 'close'
				})
				.prependTo( _this.errorArea );

				_this.successArea = $(document.createElement('div'))
				.addClass('alert alert-success display-none')
				.html( _this.getJSWWidget().getSuccess() )
				.prependTo( tabContent );

				$(document.createElement('button'))
				.attr({
					'data-dismiss' : 'alert',
					'class'        : 'close'
				})
				.prependTo( _this.successArea );

				// TODO: Actualizar dinamicamente errores al cambio del valor

				// pages
				pages.each(function () {
					$(this).addClass('tab-pane');
				});

				// controls
				var formActions = $(document.createElement('div'))
				.addClass('form-actions')
				.appendTo( this.getEl() );

				var formActionsRow = $(document.createElement('div'))
				.addClass('row')
				.appendTo( formActions );

				var formActionsContainer = $(document.createElement('div'))
				.addClass('col-md-offset-3 col-md-9')
				.appendTo( formActionsRow );


				// Buttons
				$(document.createElement('a'))
				.attr({
					'href'  : 'javascript:;',
					'class' : 'btn default button-previous'
				})
				.html('<i class="fa fa-arrow-circle-o-left"></i> Anterior')
				.appendTo( formActionsContainer );

				$(document.createElement('a'))
				.attr({
					'href'  : 'javascript:;',
					'class' : 'btn blue button-next'
				})
				.html('Siguiente <i class="fa fa-arrow-circle-o-right"></i>')
				.appendTo( formActionsContainer );

				$(document.createElement('a'))
				.attr({
					'href'  : 'javascript:;',
					'class' : 'btn green button-submit'
				})
				.html('Finalizar <i class="fa fa-paper-plane-o"></i>')
				.appendTo( formActionsContainer );

				$(document.createElement('a'))
				.attr({
					'href'  : 'javascript:;',
					'class' : 'btn red button-cancel'
				})
				.html('<i class="fa fa-times"></i> Cancelar')
				.appendTo( formActionsContainer );


				//////////////////
				//  JS LOGIC

				this.initDom( _this );
				this.initWizard( _this );
				
				this._renderIsDone();
			}
		},
		
		initDom : function ( _this ) {
			_this.errorMsg   = _this.getEl().find('.alert-danger');
			_this.successMsg = _this.getEl().find('.alert-success');
			_this.nextBtn    = _this.getEl().find('.button-next');
			_this.prevBtn    = _this.getEl().find('.button-previous');
			_this.finishBtn  = _this.getEl().find('.button-submit');
			_this.cancelBtn  = _this.getEl().find('.button-cancel');


			_this.nextBtn.on("click", function(){
				_this.onNext();
			});
			_this.prevBtn.on("click", function(){
				_this.onPrevious();
			});
			_this.finishBtn.on("click", function(){
				_this.onFinish();
			});
			_this.cancelBtn.on("click", function(){
				_this.onCancel();
			});
		},
		
		initWizard : function ( _this ) {
		    this.getEl().bootstrapWizard({
             //   'nextSelector': '.button-next',
             //   'previousSelector': '.button-previous',
                onInit: function (tab, navigation, index) {
                	// hide controls
                	//nextBtn.hide();
                	//prevBtn.hide();
                	_this.finishBtn.hide();
                	//cancelBtn.hide();
                },
                onTabClick: function (tab, navigation, index, clickedIndex) {
                	// Do nothing
                    return false;
                },
                onNext: function (tab, navigation, index) {
                    // Hide messages
                	_this.successMsg.hide();
                	_this.errorMsg.hide();

                },
                onPrevious: function (tab, navigation, index) {
                	// Hide messages
                	_this.successMsg.hide();
                	_this.errorMsg.hide();

                },
                onTabShow: function (tab, navigation, index) {

                	// Update progress bar
                    var total = _this.getEl().find('li').length;
                    var current = index + 1;
                    var percent = (current / total) * 100;
                    _this.getEl().find('.progress-bar').css({
                        width: percent + '%'
                    });

                    // Update buttons
                    if (current === 1) {
                    	// First tab
                    	_this.nextBtn.show();
                       	_this.prevBtn.hide();
                        _this.finishBtn.hide();
                        _this.cancelBtn.hide();
                    } else if(current >= total) {
            			// Last tab
                    	_this.nextBtn.hide();
                       	_this.prevBtn.show();
                       	_this.finishBtn.show();
                        _this.cancelBtn.show();
            		} else {
            			// others
            			_this.nextBtn.show();
            			_this.prevBtn.show();
            			_this.finishBtn.hide();
            			_this.cancelBtn.show();
            		}
                    
                    // Send command to server
                    _this.getJSWWidget()._sendPageHasChanged();

                }
		    });
		},
		onNext : function(){
			this.getJSWWidget()._sendNext();
			return;
		},
		onPrevious : function(){
			this.getJSWWidget()._sendPrevious();
			return;
		},
		onFinish : function(){
			this.getJSWWidget()._sendFinish();
			return;
		},
		onCancel : function(){
			this.getJSWWidget()._sendCancel();
			return;
		},
		
		_onCurrentPageChange : function() {
			alert('aaa');
			return;
		}
	}
} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Wizard",  {
	create : function() {
		return new renderer.html5.metronic.WizardRenderer();
	}
});
