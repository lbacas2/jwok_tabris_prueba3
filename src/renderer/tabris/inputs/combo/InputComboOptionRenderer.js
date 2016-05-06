
jsw.qx.Class.define( "renderer.tabris.InputComboOptionRenderer", {

	construct : function() {
		this.base( arguments );
		
		this.__optionData = {};
	},

	extend : renderer.tabris.WidgetRenderer,

	members : {
		onDispose : function( evt ) {
			if ( this.getParent() !== null && this.getParent().classname === 'renderer.tabris.InputComboRenderer' ) {
				this.getParent().removeOption( this.__optionData );
			}
			
			this.base( arguments, evt );
		},
		
		render : function() {
			this._updateOption();
			this._renderIsDone();
		},
		
		_onPropertyChangeEvent : function( evt ) {
			this.base(arguments, evt);
			// Image and additionalText roperties not supportted by Tabris.js
			switch (evt.property) {
				case 'text':
				case 'disabled':
					this._updateOption();
					break;
				case 'selected':
					this._updateSelected();
					break;
				default:
			}
			return;
		},
		
		_updateSelected : function() {
			/*
			if ( this.getParent() !== null && this.getParent().classname === 'renderer.tabris.InputComboRenderer' ) {
				var isSelected = this.getJSWWidget().isSelected();
				
				this.getEl().prop('selected', ( isSelected ) ? 'selected' : false );
			}
			*/
		},
	
		_updateOption : function() {
			if ( this.getParent() !== null && this.getParent().classname === 'renderer.tabris.InputComboRenderer' ) {
				var isDisabled = this.getJSWWidget().isDisabled();
				
				var oldOption = this.__optionData;
				this.__optionData = { 'id': this.getJSWWidget().getInternalId(), 'text': this.getJSWWidget().getText() || '' };
			
				this.getParent().removeOption( oldOption );
				if ( isDisabled == false ) {
					this.getParent().addOption( this.__optionData );
				}
			}
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.inputcombo.InputComboOption", {
	create : function() {
		return new renderer.tabris.InputComboOptionRenderer();
	}
});

