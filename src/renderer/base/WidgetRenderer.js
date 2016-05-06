
jsw.qx.Class.define( "renderer.base.WidgetRenderer", {

	extend : renderer.base.Renderer,

	construct : function() {
		this.base( arguments );
		
		this._jswWidget = null;
	},
	
	/*
	 *****************************************************************************
     STATICS
	 *****************************************************************************
	 */
	statics : {
		__UNIQUE_ID : Math.floor((Math.random() * 100000) + 1),

	    getUniqueId : function() {
	    	return renderer.base.WidgetRenderer.__UNIQUE_ID++;
	    },
	},

	/*
	 *****************************************************************************
     MEMBERS
	 *****************************************************************************
	 */
	members : {

		setJSWWidget : function(jswWidget) {
			this._jswWidget = jswWidget; 
			jswWidget.setRenderer( this );
			
			this.getJSWWidget().addEventListener( jsw.widgets.base.WidgetEvent.WidgetEventtype_DISPOSE, this._onDispose, this );
			this.getJSWWidget().addEventListener( jsw.widgets.base.WidgetEvent.WidgetEventtype_PARENT_DISPOSE, this._onDispose, this );
			this.__onCreate();
			return;
		},

		getJSWWidget : function() {
			return this._jswWidget;
		},
		
		findRendererForWidget : function( widget ) {
			if (this.getJSWWidget() === widget ) {
				return this;
			}
			if (this.getChildren === undefined) {
				return null;
			}
			for (var i=0 ; i<this.getChildren().length ; i++) {
				var result = this.getChildren()[i].findRendererForWidget(widget);
				if (result !== null) {
					return result;
				}
			};
			return null;
		},

		__onCreate : function() {
			this.onCreate();
			this._tryRender();
			return;
		},
		
		onCreate : function() {
			this.getJSWWidget().addEventListener( jsw.widgets.base.WidgetEvent.WidgetEventType_PROPERTY, this._onPropertyChangeEvent, this );
			return;
		},
		
		_onDispose : function(evt) {
			this.__registerEvent(evt);
			this.onDispose(evt);
		},
		
		onDispose : function(evt) {
			this.getJSWWidget().removeEventListener( jsw.widgets.base.WidgetEvent.WidgetEventType_PROPERTY, this._onPropertyChangeEvent, this );
		},
		
		_onPropertyChangeEvent : function( evt ) {
			this.__registerEvent(evt);
			
			switch (evt.property) {
				case 'visible':
					this._updateVisible();
					break;
				case 'enabled':
					this._updateEnabled();
					break;
				default:
			}
		},
		
		_updateVisible : function() {
			if (this.getEl() !== null) {
				if ( this.getJSWWidget().isVisible() ) {
					this.show();
				} else {
					this.hide();
				}
			}
		},
		
		_updateEnabled : function() {
		},
		
		/*
		_tryRender : function() {
			try {
				var renderRole = this.getJSWWidget().getRenderRole() || '';
				
				this.getParent().removeEventListener( renderer.base.Renderer.RENDER_EVENT_TYPE, this._onParentRenderedEvent, this );
				if (this.getParent() ) {
					if ( this.getParent().isRendered() ) {
						this.render();
					} else {
						this._waitFromParentRenderer();
					}
				} else {
					this.render();
				}
			} catch (ex) {
				console.error (ex.stack);
			}
		},
		*/
		
		_waitFromParentRenderer : function() {
			this.getParent().addEventListener( renderer.base.Renderer.RENDER_EVENT_TYPE, this._onParentRenderedEvent, this );
			return;
		},

		_onParentRenderedEvent : function() {
			this.getParent().removeEventListener( renderer.base.Renderer.RENDER_EVENT_TYPE, this._onParentRenderedEvent, this );
			this._tryRender();
			return;
		},

		render : function() {
			if ( this.getEl() !== null ) {
				this._updateEnabled();
				this._updateVisible();
			}
		},
		
		show : function() {
		}, 
		
		hide : function() {
		},
		
		afterChildrenChanged : function () {
			// default implementation is empty
		},
		
		_renderIsDone : function() {
			if ( !this.isRendered() ) {
				this.setRendered( true );
				
				var evt = new jsw.event.Event( renderer.base.Renderer.RENDER_EVENT_TYPE );
				this.dispatchEvent( evt, false );
			}
		},
		
		//**********************************************************************
        // function waitfor - Wait until a condition is met
        //
        // Needed parameters:
        //	     test: function that returns a value
        //	     expectedValue: the value of the test function we are waiting for
        //	     msec: delay between the calls to test
	    //	     maxAttemps: maximum number of loops.
        //	     callback: function to execute when the condition is met
        //**********************************************************************
	    waitFor : function( test, expectedValue, msec, maxAttemps, callback, errCallback ) {
	    	// Check if condition met. If not, re-check later (msec).
    		if ( test.call( this ) === expectedValue ) {
    			callback.call( this );
    			
    		} else {
    			if ( --maxAttemps >= 0 ) {
	    			var _this = this;
	    			setTimeout( function() {
	    				_this.waitFor(test, expectedValue, msec, maxAttemps, callback);
	    			}, msec);
	    		} else {
	    			if ( typeof errCallback === 'function' ) {
	    				errCallback.call( this );
	    			}
	    		}
    		}
	    }
	}

});

