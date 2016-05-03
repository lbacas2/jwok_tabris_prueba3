
jsw.qx.Mixin.define( "renderer.html5.metronic.mixin.InputControlRenderer", {

	members : {
		__changeHighlight : function () {
			if ( this.getEl() !== null ) {
				var isWritableNow     = ( !this.getJSWWidget().isReadOnly() && this.getJSWWidget().isEnabled() ),
					wasWeitableBefore = ( !this.getEl().prop('readonly') && this.getEl().attr('disabled') );
					
				// Elegimos el elemento destino
				if ( this.getJSWWidget().basename === 'InputCheckbox' || this.getJSWWidget().basename === 'InputRadio' ) {
					target = this.getEl().closest('label');
				} else {
					target = this.getEl();
				}
				
				if ( isWritableNow && !wasWeitableBefore ) {
					target.addClass('highlight');
				} else if ( !isWritableNow ) {
					target.removeClass('highlight');
				}
			}
		},

	}
} );