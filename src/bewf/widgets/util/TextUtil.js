


jsw.qx.Class.define("jsw.widgets.util.TextUtil",
{
	type : 'static',

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics : {

	  stripHtml : function( text ) {
		  text = text || '';
		  if ( text.length > 0 ) {
			  var regex = /(<([^>]+)>)/ig ;
			  return text.replace( regex, '' ) ;
		  } else {
			  return '';
		  }
	  }
  }

});


