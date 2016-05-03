jsw.qx.Mixin.define("jsw.widgets.mixin.MenuItem", {

	construct : function() {
		this._internalId = "";
		this._text    = "";
		this._image   = "";
		this._tooltip = "";
		this._additionalText    = "";
		this._additionalTooltip = "";
		this._enabled = true;
		this._visible = true;
	},

	statics : {
		widgetProperties : [
			"internalId",
			"text",
			"image",
			"tooltip",
			"additionalText",
			"additionalTooltip",
			"enabled",
			"visible"
		],

		widgetMethods : {
	  		"internalId" : function( widget, value ) {
			    widget._setInternalId( value );
			},
	  		"text" : function( widget, value ) {
			    widget._setText( value );
			},
	  		"image" : function( widget, value ) {
			    widget._setImage( value );
			},
	  		"tooltip" : function( widget, value ) {
			    widget._setTooltip( value );
			},
			"additionalText" : function( widget, value ) {
				widget._setAdditionalText( value );
			},
			"additionalTooltip" : function( widget, value ) {
				widget._setAdditionalTooltip( value );
			},
			"enabled" : function( widget, value ) {
				widget._setEnabled( value );
			},
			"visible" : function( widget, value ) {
				widget._setVisible( value );
			}
		}
	},

  members: {
		getInternalId : function() {
			return this._internalId;
		},

		_setInternalId : function(id) {
			this._internalId = id;
		},


		getText : function() {
		  return this._text;
		},

		_setText : function(text) {
			if ( !this._equal(this._text, text) ) {
				var oldText = this._text;
				this._text = text;
				this._dispatchAsyncChangePropertyEvent( "text", oldText, this._text );
			}
		},
		
		getImage : function() {
			  return this._image;
			},

		_setImage : function(image) {
			if ( !this._equal(this._image, image) ) {
				var oldImage = this._image;
				this._image = image;
				this._dispatchAsyncChangePropertyEvent( "image", oldImage, this._image );
			}
		},


		getTooltip : function() {
		  return this._tooltip;
		},

		_setTooltip : function(tooltip) {
			if ( !this._equal(this._tooltip, tooltip) ) {
				var oldTooltip = this._tooltip;
				this._tooltip = tooltip;
				this._dispatchAsyncChangePropertyEvent( "tooltip", oldTooltip, this._tooltip );
			}
		},

		
		getAdditionalText : function() {
			return this._additionalText;
		},
		
		_setAdditionalText : function(additionalText) {
			if ( !this._equal(this._additionalText, additionalText) ) {
				var oldAdditionalText = this._additionalText;
				this._additionalText = additionalText;
				this._dispatchAsyncChangePropertyEvent( "additionalText", oldAdditionalText, this._additionalText );
			}
		},
		

		getAdditionalTooltip : function() {
			return this._additionalTooltip;
		},

		_setAdditionalTooltip : function(additionalTooltip) {
			if ( !this._equal(this._additionalTooltip, additionalTooltip) ) {
				var oldAdditionalTooltip = this._additionalTooltip;
				this._additionalTooltip = additionalTooltip;
				this._dispatchAsyncChangePropertyEvent( "additionalTooltip", oldAdditionalTooltip, this._additionalTooltip );
			}
		},
		
		
		isEnabled : function() {
		    return this._enabled;
		},

		_setEnabled : function(value) {
			if ( !this._equal(this._enabled, value) ) {
				var oldValue = this._enabled;
				this._enabled = value;
				this._dispatchAsyncChangePropertyEvent( "enabled", oldValue, this._enabled );
			}
		},
		
		
		isVisible : function() {
		    return this._visible;
		},

		_setVisible : function(value) {
			if ( !this._equal(this._visible, value) ) {
				var oldValue = this._visible;
				this._visible = value;
				this._dispatchAsyncChangePropertyEvent( "visible", oldValue, this._visible );
			}
		},


		getMenuItemById : function(id) {
			// Check if the actual menu item is the searched.
			if (this.getInternalId() == id ) {
				return this;
			}
			
			// Check if the actual menu item has children.
			if (this.getChildren === undefined || this.getChildren() === null) {
				return null;
			}
			// Continue searching in each child menu item.
			var result = null;
			for (var i = 0; i < this.getChildren().length && result == null; i++) {
				if ( this.getChildren()[i].getMenuItemById(id) != null ) {
					result = this.getChildren()[i].getMenuItemById(id);
				}
			}
			return result;
		},
		
		
		getMenu : function() {
			if ( this.getParent() === null ) {
				return null;
			}
			
			if (this.getParent().classname === 'jsw.widgets.Menu') {
				return this.getParent();
			} else {
				return this.getParent().getMenu();
			}
		}
	}
});
