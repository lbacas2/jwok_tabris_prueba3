


jsw.qx.Class.define("jsw.widgets.util.ImageUtil",
{
	type : 'static',

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics : {
	  IMAGE : {
		  NONE : {
			  value: 0,
			  elementType: 'i',
			  elementAttr: 'class'
		  },
		  FILE : {
			  value: 1,
			  elementType: 'img',
			  elementAttr: 'src'
		  }, 
		  FONT_AWESOME: {
			  value: 2,
			  elementType: 'i',
			  elementAttr: 'class'
		  }
	  },
  
	  getImageType : function( image ) {
		  var result = this.IMAGE.NONE;
		  
		  if (image !== null && image !== '') {
			  if ( (/\.(gif|jpg|jpeg|tiff|png)$/i).test(image) ) {
				  result = this.IMAGE.FILE;
				  
			  } else if ( image.substring(0, 6) == 'fa fa-') {
				  result = this.IMAGE.FONT_AWESOME;
			  }
		  }
		  return result;
	  }
  }
  
});


