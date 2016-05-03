jsw.qx.Class.define("renderer.html5.metronic.keyTranslation",
{
	type : 'static',

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics : {
	  
		/* Add here the
		 * 'key' : 'value',
		 * pairs for the theme.
		 */
	  
	  KEY_CONVERSIONS : {
        'tk_none'                    : 'fa fa-fw',
        'tk_default_module'          : 'fa fa-dot-circle-o',
        'tk_kfm_home'                : 'fa fa-home',
        'tk_logout'			         : 'fa fa-sign-out',
        
        // Headers action buttons
        'tk_Save'                    : 'fa fa-floppy-o fa-2x',
		'tk_Cancel'                  : 'fa fa-ban fa-2x',
		'tk_Clean'                   : 'fa fa-eraser fa-2x',
		
		//
		'tk_Security_Gold'           : 'fa fa-lock',
		'tk_User_Home_Group'         : 'fa fa-users',
		'tk_Contact_Male'            : 'fa fa-calendar-o',
		'tk_Systems_Green'           : 'fa fa-cubes',
		
		// Page action buttons
		'tk_ok_btn'                  : 'fa fa-check',
		'tk_cancel_btn'              : 'fa fa-times',
		'tk_search_btn'              : 'fa fa-search',
		'tk_expandSearch_btn'        : 'fa fa-search',
		'tk_back_btn'                : 'fa fa-reply',
		'tk_clean_btn'               : 'fa fa-eraser',
		'tk_pin_btn'                 : 'fa fa-thumb-tack',
		'tk_pin2_btn'                : 'fa fa-bullseye',
		'tk_keepPrevSelection_btn'   : 'fa fa-bookmark-o',
		'tk_keepPrevSelection2_btn'  : 'fa fa-bookmark',
		'tk_link_btn'                : 'fa fa-link',
		'tk_unlink_btn'              : 'fa fa-unlink',
		
		'tk_insert_btn'              : 'fa fa-plus-circle',
		'tk_update_btn'              : 'fa fa-pencil',
		'tk_configure_btn'           : 'fa fa-cogs',
		'tk_delete_btn'              : 'fa fa-remove',
		'tk_activate_ds_btn'         : 'fa fa-toggle-on',
		'tk_rollback_btn'            : 'fa fa-history',
		'tk_manual_lock_btn'         : 'fa fa-lock',
		'tk_manual_unlock_btn'       : 'fa fa-unlock-alt',
		'tk_copy_data_from_btn'      : 'fa fa-upload',
		'tk_activate_btn'            : 'fa fa-power-off',
		'tk_filter_btn'              : 'fa fa-filter',
		
		'tk_compare_result_btn'      : 'fa fa-files-o',
		'tk_import_btn'              : 'fa fa-download',
		'tk_convert_to_scenary_btn'  : 'fa fa-cubes',
		'tk_stop_test_btn'           : 'fa fa-stop',
		'tk_run_test_btn'            : 'fa fa-play',
		'tk_success_test_btn'        : 'fa fa-check-circle',
		'tk_error_test_btn'          : 'fa fa-times-circle',
		'tk_bug_btn'                 : 'fa fa-bug',
		'tk_reset_btn'               : 'fa fa-refresh',
		
        'tk_resetUser_btn'           : 'fa fa-user-times',
        'tk_changePassword_btn'      : 'fa fa-key',
        'tk_statistics_btn'          : 'fa fa-line-chart',
        'tk_switchOn_btn'            : 'fa fa-toggle-on',
        'tk_switchOff_btn'           : 'fa fa-toggle-off',
        'tk_unsubscribe_btn'         : 'fa fa-arrow-circle-down',
        
        'tk_create_params_btn'       : 'fa fa-newspaper-o',
        'tk_create_license_btn'      : 'fa fa-thumbs-o-up',
        'tk_create_key_btn'          : 'fa fa-key',
        'tk_remove_key_btn'          : 'fa fa-trash',
        
        'tk_associated_profiles_btn' : 'fa fa-wpforms',
		
		// Table images
		'tk_new_row'                 : 'fa fa-plus-circle',
		'tk_edit_row'                : 'fa fa-pencil',
		'tk_remove_row'              : 'fa fa-remove',
		'tk_tablerow_img'            : 'fa fa-th-list',
		'tk_filter_btn'              : 'fa fa-filter',
		'tk_db_download_btn'         : 'fa fa-download',
		'tk_config_columns_btn'      : 'fa fa-cogs',
		'tk_set_output_dataset_btn'  : 'fa fa-video-camera',
		'tk_select_all_btn'          : 'fa fa-check-square-o text-info',
		'tk_deselect_all_btn'        : 'fa fa-square-o text-success',
		
		'tk_check_circle_green'      : 'fa fa-check-circle text-success',
		'tk_check_blue'              : 'fa fa-check text-info',
		'tk_tack'                    : 'fa fa-thumb-tack',
		'tk_document_copy'           : 'fa fa-copy',
		
		// TreeItems images
		'tk_treeItem_folder_1'       : 'fa fa-folder',
		'tk_treeItem_folder_2'       : 'fa fa-cubes',
		'tk_treeItem_folder_3'       : 'fa fa-cogs',
		'tk_treeItem_leaf_1'         : 'fa fa-file',
		'tk_treeItem_leaf_2'         : 'fa fa-cube',
		'tk_treeItem_leaf_3'         : 'fa fa-cog',
		
		// Main menu
	    'tk_system_search_menu'      : 'fa fa-binoculars',
	    'tk_contents_menu'           : 'fa fa-book',
		
		// Dialogs
		'tk_info_dialog'             : 'fa fa-info-circle fa-4x',
		'tk_warning_dialog'          : 'fa fa-warning fa-4x',
		'tk_error_dialog'            : 'fa fa-times-circle fa-4x',
		
		// InputI18nText
		'tk_i18n_btn'                : 'fa fa-language',
		
		// Mirage (sidebar)
		'tk_mirage'                  : 'fa fa-magic',
	    'tk_mirage_trazability'      : 'fa fa-random',
	    'tk_mirage_shuffle'          : 'fa fa-list-alt',
	    'tk_mirage_analysis'         : 'fa fa-tasks',
	    'tk_mirage_config'           : 'fa fa-wrench',
	    'tk_mirage_process'          : 'fa fa-cogs',
	    
        // Mirage
	    'tk_mirage_execute_process'  : 'fa fa-cogs',
	    'tk_mirage_stop_process'     : 'fa fa-stop',
	    
	    // Efleet (sidebar)
	    'tk_efleet_planning'         : 'fa fa-tasks',
	    'tk_efleet_catalog'          : 'fa fa-book',
	    'tk_efleet_tracing'          : 'fa fa-map-o',
	    'tk_efleet_operation'        : 'fa fa-road',
	    'tk_efleet_automobile'       : 'fa fa-car',
	    'tk_efleet_drivers'          : 'fa fa-male',
	    
	    // Cfleet (sidebar)
	  	'tk_cfleet_economical'       : 'fa fa-line-chart',
      	'tk_cfleet_billing'          : 'fa fa-money',
	    'tk_cfleet_overnights'       : 'fa fa-bed',
	  },
	  
	  getKeyConversion : function( key ) {		  
		  return this.KEY_CONVERSIONS[key] || '';
	  },
	  
	  
	  setWidgetImage : function( widget, parentDomElem, position, defValue ) {
		  defValue = defValue || null;
		  
		  // Check position value or set default position if it isn't specified
		  if (typeof position !== 'string') {
			  position = position || 'after';
		  } else {
			  switch ( position.toLowerCase() ) {
			  	case 'before':
			  		position = 'before';
			  		break;
			  	case 'none':
			  		position = 'none';
			  		break;
			  	case 'after':
			  	default:
			  		position = 'after';
			  }
		  }
		  
		  if (typeof widget === typeof undefined || widget === null 
				  	|| typeof parentDomElem === typeof undefined || parentDomElem === null) {
			  return;
		  }
		  
		  var imageKey   = renderer.html5.base.utils.keyFix.getImageKeyByWidget( widget ),
		      imageValue = (imageKey) ? this.getKeyConversion( imageKey ) : widget.getImage() || '',
		      imageType  = jsw.widgets.util.ImageUtil.getImageType( imageValue ),
		      imgElem    = null;
		  
		     // Search the image DOM element. If it doesn´t exist, we create it.
	      if ( (imgElem = parentDomElem.find( imageType.elementType ).first()).length == 0) {
			  imgElem = $(document.createElement( imageType.elementType ) );
			  if ( position == 'after' ) {
				  imgElem.appendTo( parentDomElem );
			  } else if ( position == 'before' ) {
				  imgElem.prependTo( parentDomElem );
			  }
		  }
	      
		  if (imgElem) {
			  if ( imageType !== jsw.widgets.util.ImageUtil.IMAGE.NONE ) {
				  imgElem.attr(imageType.elementAttr, imageValue );
			  } else if ( defValue && defValue.attr && defValue.image ) {
				  imgElem.attr( defValue.attr, defValue.image );
			  }
		  }
			
		  // Hide img element if image is not found
		  imgElem.on('error', function () { 
			  $(this).css( {visibility: "hidden"} ); 
		  });
			
		  return imgElem;
	  }
  }
  
});


