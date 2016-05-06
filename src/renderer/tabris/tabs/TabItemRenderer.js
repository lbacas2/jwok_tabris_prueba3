jsw.qx.Class.define( "renderer.tabris.TabItemRenderer", {

	extend : renderer.tabris.ParentWidgetRenderer,

	members : {
		render : function() {
			var parentElem = this.getEffectiveParentElement();
			if ( parentElem !== null ) {
				var tab = new tabris.Tab({
						id : this.getJSWWidget().getRenderRole()
				}).appendTo( parentElem );
				
				this.setEl( tab );
				this.base( arguments );
				
				this._updateText();
				this._updateImage();
				this._updateReadOnly();
				
				this.getEl().on( 'change:selection', this.__updateSelectedOptions, this );
				
				//this.redraw();
			}
			
			this._renderIsDone();
		},
		
		
		_onPropertyChangeEvent : function( evt ) {
			this.base( arguments, evt );
			
			switch(evt.property) {
				case 'text':
					this._updateText();
					break;
				case 'image':
					this._updateImage();
					break;
				case 'selected':
					this._updateSelection();
					break;
				default:
			}
		},
		
		_updateText : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'title', { src: this.getJSWWidget().getText() || '', scale: 2 } );
			}
		},
		
		_updateImage : function () {
			if ( this.getEl() !== null ) {
				this.getEl().set( 'image', this.getJSWWidget().getImage() || '' );
			}
		},
		
		_updateSelection : function () {
			if ( this.getEl() !== null && this.getJSWWidget().isSelected() === true ) {
				this.getParent().getEl().set( 'selection', this.getEl() );
			}
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.tabs.TabItem", {
	create : function() {
		return new renderer.tabris.TabItemRenderer();
	}
});


