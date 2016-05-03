
jsw.qx.Class.define( "renderer.html5.metronic.TreeViewRenderer", {

	extend : renderer.html5.base.TreeViewRenderer,

	members : {
		onDispose : function() {
			var jsTree = this.getJSTree();
			if ( jsTree !== null ) {
				jsTree.destroy();
			}
			
			this.base(arguments);
		},
		
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null && $.jstree ) {
				this.setEl( elem );

				var options = {
						plugins: [],
						core: {
							check_callback : true,
							multiple       : this.getJSWWidget().isMultipleSelection()
						}
				};

				/*
				// Adding options to the Widget creation
				if ( this.getJSWWidget().isMultipleSelection() ) {
					// Adding checkbox plugin to jsTree widget
					options.plugins.push('checkbox');
					options.checkbox = {
						'keep_selected_style' : false
					};
				} else {
					options.core.multiple = false;
				}
				 */
				// Tree is sorted
				/*
				if ( this.getJSWWidget().isSorted() ) {
					options.plugins.push('sort');
				}
				*/

				// Generate jsTree widget
				var _this = this;
				this.getEl().jstree( options )
					/*
					.on("ready.jstree", function (e, data) {
					})
					.on("changed.jstree", function (e, data) {
					})
					 */
					.on("select_node.jstree", function (e, data) {
						var item = _this.getJSWWidget().getTreeViewItemById( _this._getRoleIdFromHtmlId( data.node.id ) );
						item.setSelected( true );
						return false;
					})
					.on("deselect_node.jstree", function (e, data) {
						var item = _this.getJSWWidget().getTreeViewItemById( _this._getRoleIdFromHtmlId( data.node.id ) );
						item.setSelected( false );
						return false;
					})
					.on("before_open.jstree", function (e, data) {
						var item = _this.getJSWWidget().getTreeViewItemById( _this._getRoleIdFromHtmlId( data.node.id ) );
						item.setExpanded( true );
						return false;
					})
					/*
					.on("after_open.jstree", function (e, data) {
					})
					*/
					.on("close_node.jstree", function (e, data) {
						var item = _this.getJSWWidget().getTreeViewItemById( _this._getRoleIdFromHtmlId( data.node.id ) );
						item.setExpanded( false );
						return false;
					});
/*
					// Prevent multiple selection in single selection tree
					if ( !isMultipleSelection ) {
						_this.getEl().on("select_node.jstree", function (e, data) {
							if(data.node && data.node.id && data.node.id !== '#') {
								var oldSelection = data.instance.get_selected(true);
								for (var i = 0; i < oldSelection.length; i++) {
									if (oldSelection[i] !== data.node)
									data.instance.deselect_node(oldSelection[i], false);
								}
							}
						});
					}
*/

				/*
				ready.jstree
				load_node.jstree

				hover_node.jstree
				dehover_node.jstree

				enable_node.jstree
				disable_node.jstree

				set_text.jstree
				rename_node.jstree

				create_node.jstree
				delete_node.jstree

				move_node.jstree
				copy_node.jstree
				cut.jstree
				copy.jstree
				paste.jstree
				*/
			}

			this.base(arguments);
			
			this._renderIsDone();
		},

		select : function() {
			// Do nothing due to select propagation
			return;
		},

		unselect : function() {
			// Do nothing due to unselect propagation
			return;
		},
		
		getJSTree : function() {
			if ( this.getEl() !== null && $.jstree && $.jstree.reference( this.getEl() ) ) {
				// El parametro 'true' indica que no se cree en caso de no existir.
				// Si no existe la instancia de jsTree devuelve 'false'.
				var jsTree = this.getEl().jstree( true );
				return ( jsTree !== false ? jsTree : null );
			}
			return null;
		},
		
		getTreeNodeId : function() {
			return '#';
		},
		
		addTreeNode : function( parentNode, newNode, index ) {
			// Check index value
			index = index || 'last';
			if ( isNaN(index) && index !== 'last' && index !== 'first' && index < 0 ) {
				index = 'last';
			}
			var jsTree = this.getJSTree();
			if ( jsTree !== null ) {
				var id = jsTree.create_node( parentNode, newNode, index );
				// Getting the DOM element.
				// En caso de ejecutarse de forma asíncrona, utilizar el callback de create_node.
				if ( id ) {
					var elem = this.getEl().find('[id="' + id + '"]').first();
					if ( elem.length != 0 ) {
						return elem;
					}
				}
			}
			return null;
		},

		/*
		 * @param node: jstree node to delete
		 * @return (boolean) Return true if remove is successfully
		 */
		removeTreeNode : function( node ) {
			var jsTree = this.getJSTree();
			if ( jsTree !== null ) {
				return jsTree.delete_node( node );
			}
			return false;
		},
		
		
		_getRoleIdFromHtmlId : function( htmlId ) {
			var re  = /^tvi_.+_(\d+)$/; 
			var res = re.exec(htmlId);
			 
			if (res !== null && res.length > 1) {
			    return res[1];
			}
			return null;
		}
	}

});

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.TreeView",  {
	create : function() {
		return new renderer.html5.metronic.TreeViewRenderer();
	}
});
