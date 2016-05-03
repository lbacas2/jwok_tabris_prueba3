
jsw.qx.Class.define( "renderer.base.Renderer.RendererQueueManager", {

	construct : function() {},

	statics : {
		//////////////////////////
		// Global Renderer Flush

		_retryRenderAfterQueue : [],
		_childrenChangedQueue  : [],

		_autoFlushTimeout : null,
		_flushQueuesPhase : 0,
	
		_FLUSH_PHASE_IDLE : 0,
		_FLUSH_PHASE_RETRY_RENDER_AFTER : 1,
		_FLUSH_PHASE_CHILDREN_CHANGED   : 2,
	
		_initAutoFlush : function( phase ) {
			if( renderer.base.Renderer.RendererQueueManager._autoFlushTimeout == null ) {
				if( !renderer.base.Renderer._inFlushQueues || phase < renderer.base.Renderer.RendererQueueManager._flushQueuesPhase ) {
					renderer.base.Renderer.RendererQueueManager._autoFlushTimeout = window.setTimeout( renderer.base.Renderer.RendererQueueManager._autoFlushHelper, 0 );
				}
			}
		},
	
		_removeAutoFlush : function() {
			if( renderer.base.Renderer.RendererQueueManager._autoFlushTimeout != null ) {
				window.clearTimeout( renderer.base.Renderer.RendererQueueManager._autoFlushTimeout );
				renderer.base.Renderer.RendererQueueManager._autoFlushTimeout = null;
			}
		},
	
		_autoFlushHelper : function() {
			try {
				renderer.base.Renderer.RendererQueueManager._autoFlushTimeout = null;
				renderer.base.Renderer.RendererQueueManager.flushRendererQueues();
			} catch( ex ) {
				jsw.runtime.ErrorHandler.processJavaScriptError( ex );
			}
		},
	
	
		flushRendererQueues : function() {
			if( renderer.base.Renderer.RendererQueueManager._autoFlushTimeout != null ) {
				renderer.base.Renderer.RendererQueueManager._removeAutoFlush();
			}
			if( renderer.base.Renderer.RendererQueueManager._inFlushQueues ) {
				return;
			}
			if( !jsw.runtime.System.getInstance().getUiReady() ) {
				return;
			}
			renderer.base.Renderer.RendererQueueManager._inFlushQueues = true;	// Creamos el cerrojo
			renderer.base.Renderer.RendererQueueManager.flushRetryRenderAfterQueue();
			renderer.base.Renderer.RendererQueueManager.flushChildrenChangedQueue();
	  
			renderer.base.Renderer.RendererQueueManager._flushQueuePhase = renderer.base.Renderer.RendererQueueManager._FLUSH_PHASE_IDLE;
			delete renderer.base.Renderer.RendererQueueManager._inFlushQueues;	// Eliminamos el cerrojo
		},

		
		addToRetryRenderAfterQueue : function( vRenderer ) {
			if ( !jsw.util.Arrays.contains( renderer.base.Renderer.RendererQueueManager._retryRenderAfterQueue, vRenderer) ) {
				if (renderer.base.Renderer.RendererQueueManager._autoFlushTimeout == null) {
					renderer.base.Renderer.RendererQueueManager._initAutoFlush( renderer.base.Renderer.RendererQueueManager._FLUSH_PHASE_RETRY_RENDER_AFTER );
				}
				renderer.base.Renderer.RendererQueueManager._retryRenderAfterQueue.push( vRenderer );
			}
	    },
	
	    removeFromRetryRenderAfterQueue : function( vRenderer ) {
	    	jsw.util.Arrays.remove( renderer.base.Renderer.RendererQueueManager._retryRenderAfterQueue, vRenderer );
	    },
	
	    flushRetryRenderAfterQueue : function() {
	    	renderer.base.Renderer.RendererQueueManager._flushQueuesPhase = renderer.base.Renderer.RendererQueueManager._FLUSH_PHASE_RETRY_RENDER_AFTER;
	    	
	    	var vQueue = renderer.base.Renderer.RendererQueueManager._retryRenderAfterQueue, 
	    		vLength, 
	    		vRenderer;
	    	
	    	while ( (vLength = vQueue.length) > 0 ) {
	    		for (var i=0; i < vLength; i++) {
	    			vRenderer = vQueue[i];
	    			if ( vRenderer && vRenderer.getEl !== undefined && vRenderer.getEl() === null ) {
	    				vRenderer.setRendered( false );
	    				vRenderer._tryRender();
	    			}
	    		}
	    		vQueue.splice(0, vLength);
	    	}
	    	renderer.base.Renderer.RendererQueueManager._retryRenderAfterQueue = [];
	    },
		
	
		addToChildrenChangedQueue : function( vRenderer ) {
			if ( !jsw.util.Arrays.contains( renderer.base.Renderer.RendererQueueManager._childrenChangedQueue, vRenderer) ) {
				if (renderer.base.Renderer.RendererQueueManager._autoFlushTimeout == null) {
					renderer.base.Renderer.RendererQueueManager._initAutoFlush( renderer.base.Renderer.RendererQueueManager._FLUSH_PHASE_CHILDREN_CHANGED );
				}
				renderer.base.Renderer.RendererQueueManager._childrenChangedQueue.push( vRenderer );
			}
	    },
	
	    removeFromChildrenChangedQueue : function( vRenderer ) {
	    	jsw.util.Arrays.remove( renderer.base.Renderer.RendererQueueManager._childrenChangedQueue, vRenderer );
	    },
	
	    flushChildrenChangedQueue : function() {
	    	renderer.base.Renderer.RendererQueueManager._flushQueuesPhase = renderer.base.Renderer.RendererQueueManager._FLUSH_PHASE_CHILDREN_CHANGED;
	    	
	    	var vQueue = renderer.base.Renderer.RendererQueueManager._childrenChangedQueue, 
	    		vLength, 
	    		vRenderer;
	    	
	    	while ( (vLength = vQueue.length) > 0 ) {
	    		for (var i=0; i < vLength; i++) {
	    			vRenderer = vQueue[i];
	    			vRenderer.afterChildrenChanged();
	    		}
	    		vQueue.splice(0, vLength);
	    	}
	    	renderer.base.Renderer.RendererQueueManager._childrenChangedQueue = [];
	    }
	}
  
});
