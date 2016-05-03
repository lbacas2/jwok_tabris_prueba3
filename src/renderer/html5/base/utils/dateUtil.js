jsw.qx.Class.define("renderer.html5.base.utils.dateUtil",
		{
	type : 'static',

	/*
	 *****************************************************************************
     STATICS
	 *****************************************************************************
	 */

	statics : {

		// convertDateFormat: Converts a date in a format to another
		convertDateFormat : function( dateString, inputFormat, outputFormat ) {
			if ( dateString === null || dateString === '' ) {
				return '';
			}
			
			inputFormat = inputFormat.toUpperCase();
			outputFormat = outputFormat.toUpperCase();
			var result = '';
			
			try {
				// Quick and dirty hack
				if ( (inputFormat === "YYYY-MM-DD") && (outputFormat === "DD-MM-YYYY") ){
					result = renderer.html5.base.utils.dateUtil.__convertFromServer(dateString);
				} else if ( (inputFormat === "DD-MM-YYYY") && (outputFormat === "YYYY-MM-DD") ) {
					result = renderer.html5.base.utils.dateUtil.__convertForServer(dateString);
				}
			} catch (err) {
				console.error ( err.stack );
				result = '';
			}
			return result;
			
		},
		
		// __convertFromServer: Converts a date from "YYYY-MM-DD" to "DD-MM-YYYY"
		__convertFromServer: function( input ) {
			var datePart = input.match(/\d+/g);
			var year     = datePart[0];
			var month    = datePart[1];
			var day      = datePart[2];

			// Zero padding
			if ( day.lenght === 1 ) 
				day = '0' + day;
			if ( month.lenght === 1 ) 
				month = '0' + month;
			
			return day + '-' + month + '-' + year;
			
		},
		
		// __convertForServer: Converts a date from "DD-MM-YYYY" to "YYYY-MM-DD" 
		__convertForServer: function( input ) {
			 
			var datePart = input.match(/\d+/g);
			var day      = datePart[0];
			var month    = datePart[1];
			var year     = datePart[2];
			
			// Zero padding
			if ( day.lenght === 1 ) 
				day = '0' + day;
			if ( month.lenght === 1 ) 
				month = '0' + month;


			return year + '-' + month + '-' + day;
				
		}
	}

});


