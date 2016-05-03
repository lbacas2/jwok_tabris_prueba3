
metronic.topview = {};

metronic.topview.init = function() {
	metronic.handle_side_menu(jQuery);
	metronic.enable_search_ahead(jQuery);	
	metronic.general_things(jQuery);//and settings
	metronic.widget_boxes(jQuery);
	metronic.widget_reload_handler(jQuery);//this is for demo only, you can remove and have your own function, please see examples/widget.html
};
