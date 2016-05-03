
jsw.qx.Class.define( "renderer.html5.metronic.TreeViewItemRenderer", {

	extend : renderer.html5.base.TreeViewItemRenderer,

	members : {
		__nodeId   : '',
		__treeView : null,
		
		
		onCreate : function() {
			this.base(arguments);
			
			// Needed for disposing this object
			this.__nodeId   = this.getTreeNodeId();
			this.__treeView = this.getJSWWidget().getTreeView();
		},
		
		onDispose : function() {
			try {
				var treeView = this.__treeView;
				
				var result = treeView.getRenderer().removeTreeNode( this.__nodeId );
				if ( !result && this.getEl() !== null) {
					this.getEl().remove();
				}
			} catch ( ex ) {
				jsw.runtime.ErrorHandler.processJavaScriptError( ex );
			}
			this.setEl( null );
			
			this.base(arguments);
		},
		
		render : function() {
			var widget      = this.getJSWWidget();
			var parent      = widget.getParent();
			var treeView    = widget.getTreeView(); 
			var hasChildren = ( widget.getChildren() !== null && widget.getChildren().length < 0 );
			var parentTreeNodeId = parent.getRenderer().getTreeNodeId();
			
			var node = {
					id    : this.__nodeId,
					text  : widget.getText() || '',
					state : {
//						opened    : boolean  // is the node open
//						hidden    : !widget.isVisible(),
						disabled  : !widget.isEnabled(),
						selected  : widget.isSelected()
					},
					children : ( hasChildren ? [] : false ),
					li_attr  : {},  // attributes for the generated LI node
					a_attr   : {},  // attributes for the generated A node
			};

			// Set TreeItem image
			var imageKey   = renderer.html5.base.utils.keyFix.getImageKeyByWidget( widget ),
		      	imageValue = (imageKey) ? renderer.html5.metronic.keyTranslation.getKeyConversion( imageKey ) : widget.getImage() || '';
		      	
		    // Set TreeItem image
			var imageKey   = renderer.html5.base.utils.keyFix.getImageKeyByWidget( widget ),
		      	imageValue = (imageKey) ? renderer.html5.metronic.keyTranslation.getKeyConversion( imageKey ) : widget.getImage() || '';
		      	
		    if ( imageValue !== '' ) {
		    	node.icon = imageValue;
		    } else {
		    	if ( node.text === '' ) {
		    		node.icon = 'fa fa-spinner fa-pulse fa-fw margin-bottom';
		    	}
		    	
		    }
			this.setEl( treeView.getRenderer().addTreeNode( parentTreeNodeId, node, widget.getIndex() ) );
			
			this.base(arguments);
			
			this._renderIsDone();
		},

		select : function() {
			this.base(arguments);

			var _this = this;
			this.getJSWWidget().getTreeView().getRenderer().getEl().on('ready.jstree', function(e, data) {
				$(this).jstree( true ).select_node( _this.getTreeNodeId() );
			});
		},

		unselect : function() {
			this.base(arguments);

			var _this = this;
			this.getJSWWidget().getTreeView().getRenderer().getEl().on('ready.jstree', function(e, data) {
				$(this).jstree( true ).deselect_node( _this.getTreeNodeId() );
			});
		},
		
		check : function() {
		},
		
		uncheck : function() {
		},
		
		expand : function() {
			this.base(arguments);

			var _this = this;
			this.getJSWWidget().getTreeView().getRenderer().getEl().on('ready.jstree', function(e, data) {
				$(this).jstree( true ).open_node( _this.getTreeNodeId() );
			});
		},
		
		collapse : function() {
			this.base(arguments);

			var _this = this;
			this.getJSWWidget().getTreeView().getRenderer().getEl().on('ready.jstree', function(e, data) {
				$(this).jstree( true ).close_node( _this.getTreeNodeId() );
			});
		},
		
		_updateTextRender : function() {
		},
		
		_updateImageRender : function() {
		},
		
		getTreeNodeId : function() {
			return 'tvi_'+ this.getJSWWidget().getTreeView().getRenderRole() + '_' + this.getJSWWidget().getInternalId();
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.treeview.TreeViewItem",  {
	create : function() {
		return new renderer.html5.metronic.TreeViewItemRenderer();
	}
});
