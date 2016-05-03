jsw.qx.Class.define("renderer.html5.base.utils.keyFix",
{
	type : 'static',

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics : {
	  
      /* Add here the
       * 
       *  {
       *    rule : {
		*      renderRole: '',
		*      widget:     '',
		*      image:      '',
		*      text:       ''
		*    },
		*    key: ''
       *  }
       *  
       * elements for the server responses
       * 
       * Matching patterns:
       * - Same image
       * - Same renderRole
       * - Same widget and text
       */
	  __ruleTemplate : {
		  rule : {
			  renderRole: '',
			  widget:     '',
			  image:      '',
			  text:       ''
		  }
	  },
	  
	  CONVERSION_RULES : [
	                      
	      /*************
	       * TEXT RULES
	       *************/
	      // SideBar
	      { rule : { widget: 'SideBarModule',     text: 'Avanzado' },            key: 'tk_default_module' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Juego de datos' },      key: 'tk_none' },
	      { rule : { widget: 'SideBarModule',     text: 'Ejecución' },           key: 'tk_default_module' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Ejecución de planes' }, key: 'tk_none' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Panel de pruebas' },    key: 'tk_none' },
	      { rule : { widget: 'SideBarModule',     text: 'Definición' },          key: 'tk_default_module' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Definición' },          key: 'tk_none' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Escenarios' },          key: 'tk_none' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Casos de prueba' },     key: 'tk_none' },
	      
	      // Mirage
	      { rule : { widget: 'SideBarModule',     text: 'Mirage' },              key: 'tk_mirage' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Trazabilidad' },        key: 'tk_mirage_trazability' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Barajado' },            key: 'tk_mirage_shuffle' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Análisis' }, 			 key: 'tk_mirage_analysis' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Configuración' },       key: 'tk_mirage_config' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Procesos' },            key: 'tk_mirage_process' },
	      
	      // Efleet
	      { rule : { widget: 'SideBarModule',     text: 'Planificación flota' }, key: 'tk_efleet_planning' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Catálogos' },           key: 'tk_efleet_catalog' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Seguimiento' },         key: 'tk_efleet_tracing' },
	      { rule : { widget: 'SideBarModule',     text: 'Operación flota' },     key: 'tk_efleet_operation' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Vehículos' },           key: 'tk_efleet_automobile' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Conductores' },         key: 'tk_efleet_drivers' },

	      // Cfleet
	      { rule : { widget: 'SideBarModule',     text: 'Económico' },           key: 'tk_cfleet_economical' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Facturación' },         key: 'tk_cfleet_billing' },
	      { rule : { widget: 'SideBarModuleItem', text: 'Pernoctas' },           key: 'tk_cfleet_overnights' },
	      
	      /********************
	       * RENDER ROLE RULES
	       ********************/
	      
		  // Mirage
		  { rule : { renderRole: 'view.process.field.TViewAction_BE_TEST_PROCESS_INSTANCE_Basic_Queue_item'},        key: 'tk_mirage_execute_process' },
		  { rule : { renderRole: 'view.process.field.TViewAction_BE_TEST_PROCESS_INSTANCE_Basic_StopRequest_item' }, key: 'tk_mirage_stop_process' },
		  
	      /***************
	       * IMAGE RULES
	       ***************/
	      // mainTop
		  { rule : { image: '/icons/32x32/Security_Gold.png' },                          key: 'tk_Security_Gold' },
		  { rule : { image: '/icons/24x24/User_Home_Group.png' },                        key: 'tk_User_Home_Group' },
		  { rule : { image: '/icons/24x24/Contact_Male.png' },                           key: 'tk_Contact_Male' },
		  { rule : { image: '/icons/24x24/Systems_Green.png' },                          key: 'tk_Systems_Green' },
		  { rule : { image: '/icons/small/filesystems/kfm_home.png' },                   key: 'tk_kfm_home' },
		  { rule : { image: '/icons/24x24/basic2-010_exit_logout_white.png' },           key: 'tk_logout' },
		  
		  { rule : { image: '/icons/24x24/basic1-187_floppy_save_disc_white.png' },      key: 'tk_Save' },
		  { rule : { image: '/icons/24x24/basic1-124_disabled_error_white.png' },        key: 'tk_Cancel' },
		  { rule : { image: '/icons/24x24/basic1-180_cross_no_white.png' },              key: 'tk_Clean' },
		  
		  // Buttons
		  { rule : { image: '/icons/24x24/Add.png' },                                    key: 'tk_insert_btn' },
		  { rule : { image: '/icons/24x24/Edit.png' },                                   key: 'tk_update_btn' },
		  { rule : { image: '/icons/24x24/Delete.png' },                                 key: 'tk_delete_btn' },
		  { rule : { image: '/icons/24x24/basic2-292_tools_settings.png' },              key: 'tk_configure_btn' },
		  { rule : { image: '/icons/24x24/basic1-161_sun_weather.png' },                 key: 'tk_activate_ds_btn' },
		  { rule : { image: '/icons/24x24/basic3-016_rotate_replace_move.png' },         key: 'tk_rollback_btn' },
		  { rule : { image: '/icons/24x24/basic1-107_lock_security_unlocked.png' },      key: 'tk_manual_unlock_btn' },
		  { rule : { image: '/icons/24x24/basic1-106_lock_security.png' },               key: 'tk_manual_lock_btn' },
		  { rule : { image: '/icons/24x24/basic1-058_file_export.png' },                 key: 'tk_copy_data_from_btn' },
		  { rule : { image: '/icons/24x24/basic2-171_power_on.png' },                    key: 'tk_activate_btn' },
		  { rule : { image: '/icons/24x24/basic3-107_link_chain_url.png' },              key: 'tk_link_btn' },
		  
		  { rule : { image: '/icons/24x24/Language_Translation.png' },                   key: 'tk_compare_result_btn' },
		  { rule : { image: '/icons/24x24/basic2-098_file_table.png' },                  key: 'tk_config_columns_btn' },
		  { rule : { image: '/icons/24x24/basic2-020_store_shop.png' },                  key: 'tk_convert_to_scenary_btn' },
		  
		  { rule : { image: '/icons/16x16/basic2-128_media_stop.png' },                  key: 'tk_stop_test_btn' },
		  { rule : { image: '/icons/16x16/basic2-124_media_play.png' },                  key: 'tk_run_test_btn' },
		  { rule : { image: '/icons/24x24/basic1-174_ok_success_check_green.png' },      key: 'tk_success_test_btn' },
		  { rule : { image: '/icons/24x24/basic2-287_remove_error_warning_exit_red.png' }, key: 'tk_error_test_btn' },
		  { rule : { image: '/icons/24x24/basic2-189_bug.png' },                         key: 'tk_bug_btn' },
		  { rule : { image: '/icons/24x24/basic1-084_rotate_sync.png' },                 key: 'tk_reset_btn' },
		  { rule : { image: '/icons/24x24/basic1-179_check_yes.png' },                   key: 'tk_ok_btn' },
		  { rule : { image: '/icons/24x24/basic1-180_cross_no.png' },                    key: 'tk_cancel_btn' },
		  
		  { rule : { image: '/icons/16x16/basic1-015_search_zoom_find_sblue.png' },      key: 'tk_expandSearch_btn' },
		  { rule : { image: '/icons/24x24/basic1-015_search_zoom_find.png' },            key: 'tk_expandSearch_btn' },
		  { rule : { image: '/icons/24x24/basic1-015_search_zoom_find_sblue.png' },      key: 'tk_expandSearch_btn' },
		  { rule : { image: '/icons/24x24/basic1-180_cross_no_sblue.png' },              key: 'tk_clean_btn' },
		  { rule : { image: '/icons/24x24/basic1-008_pin_sblue.png' },                   key: 'tk_pin_btn' },
		  { rule : { image: '/icons/24x24/basic1-147_target_sblue.png' },                key: 'tk_pin2_btn' },
		  { rule : { image: '/icons/24x24/basic3-122_back_previous_return_history_undo_sblue.png' }, key: 'tk_back_btn' },
		  { rule : { image: '/icons/24x24/basic3-008_stack_clipboard_empty_sblue.png' }, key: 'tk_keepPrevSelection_btn' },
		  { rule : { image: '/icons/24x24/basic3-008_stack_clipboard_sblue.png' },       key: 'tk_keepPrevSelection2_btn' },
		  
		  { rule : { image: '/icons/24x24/basic2-105_user.png' },                        key: 'tk_resetUser_btn' },
		  { rule : { image: '/icons/24x24/basic1-108_key_security.png' },                key: 'tk_changePassword_btn' },
		  { rule : { image: '/icons/24x24/basic3-001_analytics_graph.png' },             key: 'tk_statistics_btn' },
		  { rule : { image: '/icons/24x24/basic2-045_switch_on.png'},                    key: 'tk_switchOn_btn' },
		  { rule : { image: '/icons/24x24/basic2-044_switch_off.png'},                   key: 'tk_switchOff_btn' },
		  { rule : { image: '/icons/24x24/basic2-208_bin_delete_trash.png'},             key: 'tk_reset_btn' },
		  { rule : { image: '/icons/24x24/basic3-018_article_text_image.png'},           key: 'tk_unsubscribe_btn' },
		  
		  { rule : { image: '/icons/24x24/basic2-249_law_license_policy.png'},           key: 'tk_create_params_btn' },
		  { rule : { image: '/icons/24x24/basic3-052_paper_document_sheet.png'},         key: 'tk_create_license_btn' },
		  { rule : { image: '/icons/24x24/basic2-025_key.png' },                         key: 'tk_create_key_btn' },
		  { rule : { image: '/icons/24x24/basic2-209_bin_delete_trash_full.png' },       key: 'tk_remove_key_btn' },
		  
		  { rule : { image: '/icons/24x24/basic2-258_personal_profile_id.png' },         key: 'tk_associated_profiles_btn' },

		  // Table images
		  { rule : { image: '/icons/16x16/basic1-171_add_new_plus.png' },                key: 'tk_new_row' },
		  { rule : { image: '/icons/16x16/basic1-002_write_pencil_new_edit.png' },       key: 'tk_edit_row' },
		  { rule : { image: '/icons/16x16/basic2-287_remove_error_warning_exit.png' },   key: 'tk_remove_row' },
		  
		  { rule : { image: '/icons/24x24/TableRow.png' },                               key: 'tk_tablerow_img' },
		  { rule : { image: '/icons/24x24/basic2-178_filter.png' },                      key: 'tk_filter_btn' },
		  { rule : { image: '/icons/small/actions/filter.png' },                         key: 'tk_filter_btn' },
		  { rule : { image: '/icons/24x24/basic1-104_database_download.png' },           key: 'tk_db_download_btn' },
		  { rule : { image: '/icons/24x24/basic1-179_check_yes_sblue.png' },             key: 'tk_check_blue' },
		  { rule : { image: '/icons/24x24/basic3-055_movie_video_recording_hd.png' },    key: 'tk_set_output_dataset_btn' },
		  { rule : { image: '/icons/24x24/basic2-067_checkbox_list_to_do.png' },         key: 'tk_select_all_btn' },
		  { rule : { image: '/icons/24x24/basic2-067_checkbox_list_to_do_sblue.png' },   key: 'tk_select_all_btn' },
		  { rule : { image: '/icons/24x24/basic3-083_drop_zone_dashed_line.png' },       key: 'tk_deselect_all_btn' },
		  { rule : { image: '/icons/24x24/basic3-083_drop_zone_dashed_line_sblue.png' }, key: 'tk_deselect_all_btn' },
		  
		  // TableCell images
		  { rule : { image: '/icons/16x16/White.png' },                                  key: 'tk_none' },
		  { rule : { image: '/icons/16x16/basic1-174_ok_success_check_green.png' },      key: 'tk_check_circle_green' },
		  { rule : { image: '/icons/24x24/basic1-008_pin.png' },                         key: 'tk_tack' },
		  { rule : { image: '/icons/16x16/basic1-042_file_document_copy.png'},           key: 'tk_document_copy' },
		  
		  // TreeItems images
		  { rule : { image: '/icons/16x16/basic2-091_map.png'},                          key: 'tk_treeItem_folder_2' },
		  { rule : { image: '/icons/16x16/basic2-114_contacts_book.png'},                key: 'tk_treeItem_leaf_2' },
		  { rule : { image: '/icons/16x16/basic3-148_colors_circles.png'},               key: 'tk_treeItem_folder_3' },
		  { rule : { image: '/icons/16x16/basic1-019_settings_preferences_gears.png'},   key: 'tk_treeItem_leaf_3' },
		  
		  // Dialogs
		  { rule : { image: '/icons/large/actions/messagebox_info.png' },                key: 'tk_info_dialog' },
		  { rule : { image: '/icons/large/actions/konv_message.png' },                   key: 'tk_info_dialog' },
		  { rule : { image: '/icons/large/actions/konv_message2.png' },                  key: 'tk_warning_dialog' },
		  { rule : { image: '/icons/large/actions/messagebox_warning.png' },             key: 'tk_warning_dialog' },
		  { rule : { image: '/icons/large/actions/messagebox_critical.png' },            key: 'tk_error_dialog' },
		  
		  // Menu 
		  { rule : { image: '/icons/small/actions/system_search.png' },                  key: 'tk_system_search_menu' },
		  { rule : { image: '/icons/small/actions/contents.png' },                       key: 'tk_contents_menu' },
	  ],
  
	  /**
	   * La función busca si hay algún patrón de sustitución de la imagen para el widget
	   */
	  getImageKeyByWidget : function( widget ) {
		  if (typeof widget === typeof undefined || widget === null) {
			  return;
		  }
		  
		  var renderRole = (widget.getRenderRole !== undefined) ? widget.getRenderRole() : '',
			  image      = (widget.getImage !== undefined) ?      widget.getImage() : '',
			  text       = (widget.getText !== undefined) ?       widget.getText() : '';
		  
		  return this.getImageKey( widget.basename, renderRole, image, text );
	  },
	  
	  getImageKey : function( widgetType, renderRole, image, text ) {
		  var result = null;
		  var item = {
				  renderRole : renderRole || '',
				  widget     : widgetType || '',
				  image      : image      || '',
				  text       : text       || '',
		  };

		  for (index in this.CONVERSION_RULES) {
			  var elem = $.extend( true, {}, this.__ruleTemplate, this.CONVERSION_RULES[index] );
			  
			  if ( elem.rule.widget && elem.rule.text && ( (elem.rule.widget === item.widget) && (elem.rule.text === item.text) ) ) {
				  result = elem.key;
				  break;
			  } else if ( elem.rule.image && (elem.rule.image === item.image) ) {
				  result = elem.key;
				  break;
			  } else if ( elem.rule.renderRole && (elem.rule.renderRole === item.renderRole) ) {
				  result = elem.key;
				  break;
			  }
		  }
			  
		  return result;
	  }
  }
  
});


