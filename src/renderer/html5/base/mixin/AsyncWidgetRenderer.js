
jsw.qx.Mixin.define( "renderer.html5.base.mixin.AsyncWidgetRenderer", {

	construct : function() {
		this._asyncRendering = true;
		this._rendering = false;
	},
	
	members : {
		_isAsyncRendering : function () {
			return this._asyncRendering;
		},
		
		_isRenderingInProgress : function () {
			return this._rendering;
		},
		
		_startAsyncRendering : function() {
			this._rendering = true;
		}
	}
});