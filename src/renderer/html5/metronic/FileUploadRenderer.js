jsw.qx.Class.define( "renderer.html5.metronic.InputFileUploadRenderer", {

	extend : renderer.html5.base.InputFileUploadRenderer,
	
	include : renderer.html5.metronic.mixin.InputControlRenderer,

	members : {
		_selectBtnEl : null,
		_changeBtnEl : null,
		_removeBtnEl : null,
		_inputEl     : null,
		_textInputEl : null,
		_filenameEl  : null,
		_previewEl   : null,
		
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				var _this = this;
				
				this.__createStructure( elem );
				
				// Asignamos el plugin FileInput al elemento DOM
				this.getEl().fileinput({ name: this.getJSWWidget().getRenderRole() });
				
				this.getEl().on('change.bs.fileinput', function() {
				    //check whether browser fully supports all File API
				    //if (window.File && window.FileReader && window.FileList && window.Blob) {
					if (window.FileReader && window.File && window.Blob) {
				        var supportedFormats = _this.getJSWWidget().getSupportedExts() || [],
				        	maxSize = _this.getJSWWidget().getMaxSize() || 0,
			        		isSupported = ( supportedFormats.length === 0 ),
			        		files = [],
			        		file;
				        
				        // get the file size and file type from file input field
				    	try {
				    		// convert FileList to an array of JSON objects
				    		for (i=0; i < _this._inputEl[0].files.length; i++) {
				    			var filedata = {
			    					name: _this._inputEl[0].files[i].name,
			    					size: _this._inputEl[0].files[i].size,
			    					type: _this._inputEl[0].files[i].type
				    			};
				    			files.push( filedata );
				    		}
				    		// Forzamos a que sea simple (por el momento)
				    		files = files.slice( 0, 1 );
				    		file = files[0];
				    		
				    		// Check file size
					        if (maxSize > 0 && file.size > maxSize ) {
					        	_this.getEl().fileinput('clear');
// TODO: Show error message.
					        	alert("Invalid file size!: " + file.size);
					        	return false;
					        }
					        
					        /*
					        // Check file format
					        for (var i=0; i < supportedFormats.length && !isSupported; i++) { 
					            re = supportedFormats[i].toString().replace('/', '\\/').replace('*', '.+');
					            isSupported = ( (file.type).search(re) != -1 );
					        }
					        
					        
					        if (! isSupported) {
					        	_this.getEl().fileinput('clear');
// TODO: Show error message.
					    	   alert('Unsupported File! ' + file.type);
					    	   return false;
					        }
					        */
					        
					        
				    	} catch (err) {
				    		files = [{size: 0, type: '', name: ''}];
				    	}
				        
				        _this.getJSWWidget().setFiles(files);
				    }
				});
				
				this.getEl().on('clear.bs.fileinput reset.bs.fileinput', function() {
					_this.getJSWWidget().setFiles([]);
				});
							
				this.base(arguments);
				this._updateLabelAndLink();
				
				this._renderIsDone();
			}
		},
		
		_updateLabelAndLink : function() {
			if ( this.getEl() !== null ) {
				var label = this.getJSWWidget().getLabel() || '';
				var link = this.getJSWWidget().getLink() || 'javascript:;';
				
				if ( label !== '' && link !== '' ) {
					this.getEl().addClass('fileinput-exists').removeClass('fileinput-new');
				} else {
					this.getEl().addClass('fileinput-new').removeClass('fileinput-exists');
				}
				
				if ( this._filenameEl !== null ) {
					//this._filenameEl.find( '.title' ).text( label );
					//this._filenameEl.attr( 'href', link );
					this._filenameEl.val( label );
				}
				
				if ( this._previewEl !== null ) {
					this._previewEl.empty();
					
					if ( link.match(/\.(gif|png|jpeg|jpg)$/) ) {
				        this._previewEl.html( $('<img>').attr( 'src', link ) )
						
					} else {
						this._previewEl.text( label );
					}
				}
			}
		},
		
		// @Override
		_updatePlaceholder : function() {
			return;
		},
		
		// @Override
		_updateValue : function () {
			// See _updateLabelAndLink method.
			return; 
		},
		
		_updateUploadUrl : function() {
			var formData  = new FormData();
			var uploadUrl = this.getJSWWidget().getUploadUrl();
			
			if ( uploadUrl !== null && uploadUrl !== '' ) {
				formData.append( "file", this._inputEl[0].files[0] );
	
				var request = new XMLHttpRequest();
				request.open( "POST", uploadUrl );
				request.send( formData );
				this.getJSWWidget()._setUploadUrl( null );
			}
		}, 

		__createStructure : function( inputElem ) {
			this._inputEl = inputElem;
			this._inputEl.removeClass();
			
			// Create the main DOM element and insert after the located element.
			// The located DOM element will be moved inside main element later.
			var mainEl = $(document.createElement('div'))
					.insertAfter( this._inputEl )
					.attr({
						'class': 'fileinput fileinput-new',
						'data-provides': 'fileinput'
					});
			mainEl.attr( 'data-render-role', this._inputEl.attr( 'data-render-role' ) );
			this._inputEl.removeAttr( 'data-render-role' );
			this.setEl( mainEl );
			
			// Create common structure for any render style
			var buttonsContainerEl = $(document.createElement('span')).addClass('btn btn-sm btn-file blue');
			
			this._selectBtnEl = $( document.createElement('span') ).addClass( 'fileinput-new font-sm' ).appendTo( buttonsContainerEl );
			this._changeBtnEl = $( document.createElement('span') ).addClass( 'fileinput-exists font-sm' ).appendTo( buttonsContainerEl );
			this._inputEl.appendTo( buttonsContainerEl );
			
			this._removeBtnEl = $( document.createElement('a') )
					.attr({
						href : '#',
						class : 'fileinput-exists',
						'data-dismiss' : 'fileinput'
					});

			// Create DOM structure for specified render style
			var renderStyle = this.getEl().attr('data-template-style') || '';
			switch ( renderStyle ) {
			  case 'image':
				this.__createImageStructure( buttonsContainerEl );
				break;
			  case 'file-noinput':
				this.__createFileNoInputStructure( buttonsContainerEl );
				break;
			  case 'file':
			  default:
				this.__createFileStructure( buttonsContainerEl );
			}
			
// TODO: Internacionalizar
			this._selectBtnEl.html( 'Select file' );
			this._changeBtnEl.html( 'Change' );
		},
		
		__createFileStructure : function( buttonsContainerEl ) { 
			var inputGroupEl = $(document.createElement('div')).addClass('input-group input-sm').appendTo( this.getEl() );

			// Create filename element
			var textInputIconEl = $(document.createElement('div')).addClass( 'input-icon' ).appendTo( inputGroupEl );
			$( document.createElement('i') ).addClass( 'fa fa-file fileinput-exists' ).appendTo( textInputIconEl );
			this._filenameEl = $( document.createElement('input') ).addClass( 'form-control input-sm fileinput-filename' ).appendTo( textInputIconEl );
			this._filenameEl.prop({
				'readonly': true,
				'disabled': true
			});
			
			// Add specific classes to buttons container and set it in DOM structure
			buttonsContainerEl.addClass( 'input-group-addon' ).appendTo( inputGroupEl );
			
			// Add specific classes to remove button
			this._removeBtnEl.addClass( 'input-group-addon btn btn-sm red' ).appendTo( inputGroupEl );
			$( document.createElement('i') ).addClass( 'fa fa-times font-white' ).appendTo( this._removeBtnEl );
		},

		
		__createFileNoInputStructure: function( buttonsContainerEl ) {
			// Create filename element
			this._filenameEl = $( document.createElement('a') ).addClass( 'input-fixed' ).appendTo( this.getEl() );
			$( document.createElement('i') ).addClass( 'fa fa-file fileinput-exists margin-right-5' ).appendTo( this._filenameEl );
			$( document.createElement('span') ).addClass( 'title fileinput-filename input-fixed' ).appendTo( this._filenameEl );
						
			// Add specific classes to remove button
			this._removeBtnEl.addClass( 'close' ).appendTo( this.getEl() );		
		},
		
		
		__createImageStructure: function( buttonsContainerEl ) {
			// Create image preview zone
			this._previewEl = $( document.createElement('div') )
					.attr({
						'class': 'fileinput-preview thumbnail',
						'data-trigger': 'fileinput',
						'style' : 'width: 200px; height: 150px;'
					})
					.appendTo( this.getEl() );
					
			// Create controls zone
			var auxDiv = $( document.createElement('div') )
					.append( buttonsContainerEl )
					.appendTo( this.getEl() );
			
			// Add specific classes to remove button
			this._removeBtnEl.addClass( 'btn red' ).appendTo( auxDiv );
			$( document.createElement('i') ).addClass( 'fa fa-times font-white' ).appendTo( this._removeBtnEl );
		}
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.FileUpload", {
	create : function() {
		return new renderer.html5.metronic.InputFileUploadRenderer();
	}
});
