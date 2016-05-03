var serverUrl = 'http://10.0.1.190:8080';

jws = {};

var namespace = function( name ) {
  var splits = name.split( "." );
  var parent = window;
  var part = splits[ 0 ];
  for( var i = 0, len = splits.length - 1; i < len; i++, part = splits[ i ] ) {
    if( !parent[ part ] ) {
      parent = parent[ part ] = {};
    } else {
      parent = parent[ part ];
    }
  }
  if( !( part in parent ) ) {
    parent[ part ] = {};
  }
  return part;
};

exports.namespace = namespace;


// require("./jws.js");

require("./bewf/runtime/BrowserFixes.js");
require("./bewf/util/Arrays.js");
require("./bewf/util/Objects.js");
require("./bewf/util/Strings.js");
require("./bewf/util/Numbers.js");
require("./bewf/util/Variant.js");
require("./bewf/client/Client.js");
require("./bewf/qx/Class.js");
require("./bewf/qx/Mixin.js");
require("./bewf/qx/LegacyProperty.js");
require("./bewf/qx/Property.js");
require("./bewf/qx/Object.js");
require("./bewf/util/Functions.js");
require("./bewf/qx/Target.js");
require("./bewf/event/Event.js");
require("./bewf/event/DataEvent.js");
require("./bewf/event/ChangeEvent.js");
require("./bewf/client/Timer.js");
require("./bewf/html/Entity.js");
require("./bewf/html/EventRegistration.js");
require("./bewf/runtime/Singletons.js");
require("./bewf/event/EventHandlerUtil.js");
require("./bewf/remote/HandlerRegistry.js");
require("./bewf/remote/ObjectRegistry.js");
require("./bewf/remote/HandlerUtil.js");
require("./bewf/util/Encoding.js");
require("./bewf/widgets/base/WidgetEvent.js");
require("./bewf/widgets/base/Widget.js");
require("./bewf/widgets/base/JSWItem.js");
require("./bewf/widgets/base/Parent.js");
require("./bewf/widgets/JSWDisplay.js");
require("./bewf/remote/handler/DisplayHandler.js");
require("./bewf/event/FocusEvent.js");
require("./bewf/event/EventHandler.js");
require("./bewf/event/DomEvent.js");
require("./bewf/event/KeyEvent.js");
require("./bewf/util/ObjectManager.js");

require("./bewf/widgets/base/ClientDocument.js");
require("./bewf/widgets/util/FocusHandler.js");
require("./bewf/client/ClientMessages.js");
require("./bewf/client/ServerPush.js");
require("./bewf/client/UrlLauncher.js");
require("./bewf/client/BrowserNavigation.js");
require("./bewf/html/ImageManager.js");
require("./bewf/html/ImagePreloader.js");
require("./bewf/html/ImagePreloaderManager.js");
require("./bewf/html/ImagePreloaderSystem.js");

require("./bewf/runtime/MobileWebkitSupport.js");
require("./bewf/runtime/ErrorHandler.js");
require("./bewf/runtime/System.js");

require("./bewf/develop/DevelopMode.js");
require("./bewf/develop/EventConsolePrinter.js");

require("./bewf/remote/MessageProcessor.js");
require("./bewf/remote/Connection.js");

require("./bewf/remote/Request.js");
require("./bewf/remote/EventUtil.js");
require("./bewf/remote/WidgetManager.js");
require("./bewf/remote/MessageWriter.js");
require("./bewf/remote/RemoteObject.js");
require("./bewf/remote/RemoteObjectFactory.js");

require("./bewf/remote/handler/ClientInfoHandler.js");
require("./bewf/remote/handler/ClientMessagesHandler.js");
require("./bewf/remote/handler/ServerPushHandler.js");
require("./bewf/remote/handler/ConnectionMessagesHandler.js");
require("./bewf/remote/handler/UrlLauncherHandler.js");

require("./bewf/widgets/util/ShellManager.js");
require("./bewf/widgets/util/ImageUtil.js");
require("./bewf/widgets/util/TextUtil.js");

require("./bewf/connection/ConnectionEvent.js");
require("./bewf/connection/Connection.js");

require("./bewf/widgets/mixin/InputComboItem.js");
require("./bewf/widgets/mixin/InputControl.js");
require("./bewf/widgets/mixin/MenuItem.js");
require("./bewf/widgets/mixin/SideBarItem.js");
require("./bewf/widgets/mixin/AbstractChart.js");
require("./bewf/widgets/mixin/AbstractChartXY.js");
require("./bewf/widgets/Label.js");
require("./bewf/widgets/ActiveLink.js");
require("./bewf/widgets/Link.js");
require("./bewf/widgets/Composite.js");
require("./bewf/widgets/ExpandableComposite.js");
require("./bewf/widgets/SashComposite.js");
require("./bewf/widgets/StackComposite.js");
require("./bewf/widgets/InputCheckbox.js");
require("./bewf/widgets/InputDate.js");
require("./bewf/widgets/InputDateTime.js");
require("./bewf/widgets/InputDateRange.js");
require("./bewf/widgets/InputDecimal.js");
require("./bewf/widgets/InputInteger.js");
require("./bewf/widgets/InputPassword.js");
require("./bewf/widgets/InputText.js");
require("./bewf/widgets/InputTextArea.js");
require("./bewf/widgets/InputTime.js");
require("./bewf/widgets/Button.js");
require("./bewf/widgets/JSWShell.js");
require("./bewf/widgets/sidebar/SideBar.js");
require("./bewf/widgets/sidebar/SideBarGroup.js");
require("./bewf/widgets/sidebar/SideBarModule.js");
require("./bewf/widgets/sidebar/SideBarModuleItem.js");
require("./bewf/widgets/treeview/TreeView.js");
require("./bewf/widgets/treeview/TreeViewItem.js");
require("./bewf/widgets/table/Table.js");
require("./bewf/widgets/table/TableColumn.js");
require("./bewf/widgets/table/TableRow.js");
require("./bewf/widgets/InputCombo.js");
require("./bewf/widgets/inputcombo/InputComboGroup.js");
require("./bewf/widgets/inputcombo/InputComboSeparator.js");
require("./bewf/widgets/inputcombo/InputComboOption.js");
require("./bewf/widgets/menu/Menu.js");
require("./bewf/widgets/menu/MenuSeparator.js");
require("./bewf/widgets/menu/MenuModule.js");
require("./bewf/widgets/menu/MenuModuleItem.js");
require("./bewf/widgets/Image.js");
require("./bewf/widgets/BrowserViewer.js");
require("./bewf/widgets/ChartPie.js");
require("./bewf/widgets/ChartGauge.js");
require("./bewf/widgets/ChartBar.js");
require("./bewf/widgets/ChartColumn.js");
require("./bewf/widgets/ChartLine.js");
require("./bewf/widgets/Calendar.js");
require("./bewf/widgets/CalendarEvent.js");
require("./bewf/widgets/ProgressBar.js");
require("./bewf/widgets/FileUpload.js");
require("./bewf/widgets/ToolBar.js");
require("./bewf/widgets/ToolItem.js");
require("./bewf/widgets/tabs/Tabs.js");
require("./bewf/widgets/tabs/TabItem.js");
require("./bewf/widgets/wizard/Wizard.js");
require("./bewf/widgets/wizard/WizardPage.js");

require("./bewf/remote/handler/LabelHandler.js");
require("./bewf/remote/handler/ActiveLinkHandler.js");
require("./bewf/remote/handler/LinkHandler.js");
require("./bewf/remote/handler/CompositeHandler.js");
require("./bewf/remote/handler/ExpandableCompositeHandler.js");
require("./bewf/remote/handler/SashCompositeHandler.js");
require("./bewf/remote/handler/StackCompositeHandler.js");
require("./bewf/remote/handler/InputCheckboxHandler.js");
require("./bewf/remote/handler/InputDateHandler.js");
require("./bewf/remote/handler/InputDateTimeHandler.js");
require("./bewf/remote/handler/InputDateRangeHandler.js");
require("./bewf/remote/handler/InputDecimalHandler.js");
require("./bewf/remote/handler/InputIntegerHandler.js");
require("./bewf/remote/handler/InputPasswordHandler.js");
require("./bewf/remote/handler/InputTextHandler.js");
require("./bewf/remote/handler/InputTextAreaHandler.js");
require("./bewf/remote/handler/InputTimeHandler.js");
require("./bewf/remote/handler/ButtonHandler.js");
require("./bewf/remote/handler/JSWShellHandler.js");
require("./bewf/remote/handler/sidebar/SideBarHandler.js");
require("./bewf/remote/handler/sidebar/SideBarGroupHandler.js");
require("./bewf/remote/handler/sidebar/SideBarModuleHandler.js");
require("./bewf/remote/handler/sidebar/SideBarModuleItemHandler.js");
require("./bewf/remote/handler/treeview/TreeViewHandler.js");
require("./bewf/remote/handler/treeview/TreeViewItemHandler.js");
require("./bewf/remote/handler/table/TableHandler.js");
require("./bewf/remote/handler/table/TableColumnHandler.js");
require("./bewf/remote/handler/table/TableRowHandler.js");
require("./bewf/remote/handler/InputComboHandler.js");
require("./bewf/remote/handler/inputcombo/InputComboGroupHandler.js");
require("./bewf/remote/handler/inputcombo/InputComboSeparatorHandler.js");
require("./bewf/remote/handler/inputcombo/InputComboOptionHandler.js");
require("./bewf/remote/handler/menu/MenuHandler.js");
require("./bewf/remote/handler/menu/MenuSeparatorHandler.js");
require("./bewf/remote/handler/menu/MenuModuleHandler.js");
require("./bewf/remote/handler/menu/MenuModuleItemHandler.js");
require("./bewf/remote/handler/ImageHandler.js");
require("./bewf/remote/handler/BrowserViewerHandler.js");
require("./bewf/remote/handler/ChartPieHandler.js");
require("./bewf/remote/handler/ChartGaugeHandler.js");
require("./bewf/remote/handler/ChartBarHandler.js");
require("./bewf/remote/handler/ChartColumnHandler.js");
require("./bewf/remote/handler/ChartLineHandler.js");
require("./bewf/remote/handler/CalendarHandler.js");
require("./bewf/remote/handler/CalendarEventHandler.js");
require("./bewf/remote/handler/ProgressBarHandler.js");
require("./bewf/remote/handler/FileUploadHandler.js");
require("./bewf/remote/handler/ToolBarHandler.js");
require("./bewf/remote/handler/ToolItemHandler.js");
require("./bewf/remote/handler/tabs/TabsHandler.js");
require("./bewf/remote/handler/tabs/TabItemHandler.js");
require("./bewf/remote/handler/wizard/WizardHandler.js");
require("./bewf/remote/handler/wizard/WizardPageHandler.js");

require("./renderer/base/mixin/ParentWidgetRenderer.js");

require("./renderer/base/AjaxRemoteUtils.js");
require("./renderer/base/RendererHandlerRegistry.js");
require("./renderer/base/Renderer.js");
require("./renderer/base/WidgetRenderer.js");
require("./renderer/base/ParentWidgetRenderer.js");
require("./renderer/base/RendererQueueManager.js");
require("./renderer/base/ConnectionRenderer.js");


require("./renderer/tabris/ButtonRenderer.js");
require("./renderer/tabris/CompositeRenderer.js");
require("./renderer/tabris/ImageRenderer.js");
require("./renderer/tabris/ShellRenderer.js");
require("./renderer/tabris/inputs/InputTextRenderer.js");

                
require("./bewf.js")


var createConnection = function(connPath) {

	// Se crea la conexión
	connection = new jsw.connection.Connection();

	// Se crea el renderer de la conexión
	var connectionRenderer = renderer.base.RendererHandlerRegistry.getInstance().getHandler("jsw.connection.Connection").create();
	connectionRenderer.setConnection(connection);
	
	// Se pasan parametros a la conexión
	connection.setUrl( connPath );

	// Se intenta conectar
	connection.connect();
	
	// Se retorna la conexión
	return connection;
}

var getServerUrl = function( pServerUrl, pServerPath ) {
	pServerUrl  = pServerUrl  || ( typeof serverUrl  !== 'undefined' ? serverUrl  : window.location.pathname.replace(/\/[^\/]+$/,"") );
	pServerPath = pServerPath || ( typeof serverPath !== 'undefined' ? serverPath : '/bewf' );
	
	return pServerUrl + pServerPath;
}

// Init connection to server 
window.jswConnection = createConnection( getServerUrl( serverUrl, '/bewf' ) );