jsw.qx.Class.define( "renderer.html5.metronic.AccordionPanelRenderer", {

	extend : renderer.html5.metronic.TabItemRenderer,

	members : {
		render : function() {
			var panelItem = this.getJSWWidget(),
				accordion  = (panelItem) ? panelItem.getTab() : null;
	
			if (panelItem && accordion && this.getParent() !== null && this.getParent().getEl() !== null) {
				var elem = accordion.getEl().find('[href=#'+ tab.getRenderRole() + '_' + tabItem.getInternalId()+ ']').first();
				
				this.setEl( elem != undefined ? elem : null );
				this.base(arguments);
				this._renderIsDone();
			}
		},
			
		select : function() {
			this.getEl().collapse('show');
			return;
		},

		unselect : function() {
			this.getEl().collapse('hide');
			return;
		},
		
	}
});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.TabItem", {
	create : function() {
		return new renderer.html5.metronic.AccordionPanelRenderer();
	}
});