
jsw.qx.Class.define( "jsw.widgets.sidebar.SideBarModuleItem", {

  extend : jsw.widgets.base.JSWItem,

  include: jsw.widgets.mixin.SideBarItem,

  members : {
    isSelected : function() {
    	return (this.getInternalId() == this.getSideBar().getSelectedItemId());
    },
    
    command : function(){
    	this._notifyModify( "Command" );
    	return;
    }
  }
});
