
jsw.qx.Class.define( "jsw.widgets.ExpandableComposite", {

  extend : jsw.widgets.Composite,

  construct : function( styles ) {
    this.base( arguments );
    
    this._title      = '';
    this._expandable = true;
    this._expanded   = true;
  },

  members : {
    destroy : function() {
      this.base( arguments );
    },

    /** To be called after jsw_XXX states are set */
    initialize : function() {},
    
    getTitle : function() {
	    return this._title;
	},
	
	_setTitle : function( title ) {
		if ( !this._equal(this._title, title) ) {
			var oldValue = this._title;
			this._title = title; 
			this._dispatchAsyncChangePropertyEvent( "title", oldValue, this._title );
		}
	},
	
    isExpandable : function() {
	    return this._expandable;
	},
	
	_setExpandable : function( expandable ) {
		if ( !this._equal(this._expandable, expandable) ) {
			var oldValue = this._expandable;
			this._expandable = expandable; 
			this._dispatchAsyncChangePropertyEvent( "expandable", oldValue, this._expandable );
		}
	},
	
	isExpanded : function() {
	    return this._expanded;
	},
	
	_setExpanded : function( expanded ) {
		if ( !this._equal(this._expanded, expanded) ) {
			var oldValue = this._expanded;
			this._expanded = expanded; 
			this._dispatchAsyncChangePropertyEvent( "expanded", oldValue, this._expanded );
		}
	},
  }
});
