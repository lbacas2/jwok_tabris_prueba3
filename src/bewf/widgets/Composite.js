
jsw.qx.Class.define( "jsw.widgets.Composite", {

  extend : jsw.widgets.base.Parent,

  construct : function( styles ) {
    this.base( arguments );
  },

  members : {	  
    destroy : function() {
      this.base( arguments );
    },

    /** To be called after jsw_XXX states are set */
    initialize : function() {
    },
  }
});
