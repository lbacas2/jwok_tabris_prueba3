
jsw.qx.Class.define( "renderer.base.Renderer", {

	extend : jsw.qx.Target,

	construct : function() {
		this.base( arguments );
		
		this.$el            = null;
		this._parent        = null;
		this._children      = [];
		this.__events       = []; // Para registrar los eventos recibidos. Solo para funciones de auditoria
		this.__rendered     = false; 
		this.__templated    = false;
		this.__templateName = null;
		this.__retries      = 0;
	},

	destruct : function() {
		if (this.getEl() !== null) {
			this.getEl().remove();

			this.setEl( null );
		}
		//this.base( arguments );	// jsw.qx.Target no implementa el método destruct.
	},

	statics : {
		RENDER_EVENT_TYPE   : "render",
		TEMPLATE_EVENT_TYPE : "template"
	},
	
	members : {
		getEl : function(){
			return this.$el;
		},
		setEl : function( el ) {
			this.$el = el || null; // Evitamos que pueda ser undefined
		},
		
		/* 
		 * Se define como salvaguarda, aunque conceptualmente si el renderer no extiende de ParentWidgetRenderer no debería
		 * usarse este método.
		 */
		getContainerEl : function() {
			return this.getEl();
		},

		isTemplated : function() {
			return this.__templated;
		},
		
		setTemplated : function( value ) {
			this.__templated = value;
		},
		
		getTemplateName : function() {
			return this.__templateName;
		},
		
		hasTemplateName : function() {
			return this.getTemplateName() !== null;
		},
		
		setTemplateName : function( value ) {
			if (typeof value !== 'string') {
				value = null;
			} 
			this.__templateName = value;
		},
		
		isRendered : function() {
			return this.__rendered;
		},
		
		setRendered : function( value ) {
			this.__rendered = value;
		},

		setParent : function(parent) {
			this._applyParentInternal( parent );
		},

		getParent : function() {
			return this._parent;
		},

		_applyParentInternal : function( parent ) {
			this._parent = parent;
			if(this._parent != null) {
				parent._addChildInternal(this);
			}
		},

		_addChildInternal : function( child ) {
			this._children.push(child);
		},
		
		__registerEvent : function(evt) {
			this.__events.push(evt)
			return;
		},
		
		__getEvents : function() {
			return this.__events;
		},
		
		__getRendererRetries : function() {
			return this.__retries;
		}, 
		
		__incrRendererRetries : function() {
			this.__retries++;
		}
	}

});

