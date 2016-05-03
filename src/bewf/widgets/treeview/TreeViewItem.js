jsw.qx.Class.define( "jsw.widgets.treeview.TreeViewItem", {

	extend : jsw.widgets.base.Parent,

	members : {
		_internalId : 0,
		_index      : -1,
		_text       : '',
		_image      : '',
		_selected   : false,
		_checked    : false,
		_expanded   : false,


		getInternalId : function() {
			return this._internalId;
		},

		_setInternalId : function( id ) {
			this._internalId = id;
		},
		
		
		getIndex : function() {
			return this._index;
		},

		_setIndex : function( index ) {
			if ( !this._equal(this._index, index) ) {
				var oldIndex = this._index;
				this._index = index;
				this._dispatchAsyncChangePropertyEvent( "index", oldIndex, this._index );
			}
		},

	
		getText : function() {
			return this._text;
		},

		_setText : function( text ) {
			if ( !this._equal(this._text, text) ) {
				var oldText = this._text;
				this._text = text;
				this._dispatchAsyncChangePropertyEvent( "text", oldText, this._text );
			}
		},

    
		getImage : function() {
			return this._image;
		},

		_setImage : function( image ) {
			if ( !this._equal(this._image, image) ) {
				var oldImage = this._image;
				this._image = image;
				this._dispatchAsyncChangePropertyEvent( "image", oldImage, this._image );
			}
		},
    

		isSelected : function() {
			return this._selected;
		},

		setSelected : function( selected ) {
			if (typeof selected === 'string') {
				selected = $.parseJSON( selected );
			}
			if ( !this._equal(this._selected, selected) ) {
				var oldValue = this._selected;
				this._selected = selected;
				this._dispatchAsyncChangePropertyEvent( "selected", oldValue, this._selected );
				this._handlePropertyModification( "Selected", "selected", this.isSelected() );
			}
		},

		_setSelected : function( selected ) {
			if (typeof selected === 'string') {
				selected = $.parseJSON( selected );
			}
			if ( !this._equal(this._selected, selected) ) {
				var oldValue = this._selected;
				this._selected = selected;
				this._dispatchAsyncChangePropertyEvent( "selected", oldValue, this._selected );
			}
		},
	
		
		isChecked : function() {
			return this._checked;
		},

		setChecked : function( checked ) {
			if (typeof checked === 'string') {
				checked = $.parseJSON( checked );
			}
			if ( !this._equal(this._checked, checked) ) {
				var oldValue = this._checked;
				this._checked = checked;
				this._dispatchAsyncChangePropertyEvent( "checked", oldValue, this._checked );
				this._handlePropertyModification( "Checked", "checked", this.isChecked() );
			}
		},

		_setChecked : function( checked ) {
			if (typeof checked === 'string') {
				checked = $.parseJSON( checked );
			}
			if ( !this._equal(this._checked, checked) ) {
				var oldValue = this._checked;
				this._checked = checked;
				this._dispatchAsyncChangePropertyEvent( "checked", oldValue, this._checked );
			}
		},
		
		
		isExpanded : function() {
			return this._expanded;
		},

		setExpanded : function( expanded ) {
			if (typeof expanded === 'string') {
				expanded = $.parseJSON( expanded );
			}
			if ( !this._equal(this._expanded, expanded) ) {
				var oldValue = this._expanded;
				this._expanded = expanded;
				this._dispatchAsyncChangePropertyEvent( "expanded", oldValue, this._expanded );
				this._handlePropertyModification( "Expanded", "expanded", this.isExpanded() );
			}
		},

		_setExpanded : function( expanded ) {
			if (typeof expanded === 'string') {
				expanded = $.parseJSON( expanded );
			}
			if ( !this._equal(this._expanded, expanded) ) {
				var oldValue = this._expanded;
				this._expanded = expanded;
				this._dispatchAsyncChangePropertyEvent( "expanded", oldValue, this._expanded );
			}
		},
		

		getTreeView : function() {
			if ( this.getParent() === null ) {
				return null;
			}
			
			if ( this.getParent().classname === 'jsw.widgets.TreeView' ) {
				return this.getParent();
			} else {
				return this.getParent().getTreeView();
			}
		},

		// TODO: Similar en Menu, TreeView y SideBar
		getTreeViewItemById : function( id ){
			if ( this.getInternalId() == id ) {
				return this;
			}
			if ( this.getChildren === undefined || this.getChildren() === null ) {
				return null;
			}

			for( var i=0; i<this.getChildren().length; i++) {
				var result = this.getChildren()[i].getTreeViewItemById(id);
				if (result != null) {
					return result;
				}
			}
			return null;
		},
	}
});
