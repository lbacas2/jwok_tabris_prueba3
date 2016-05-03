
jsw.qx.Class.define( "renderer.html5.metronic.CalendarRenderer", {

	extend : renderer.html5.base.CalendarRenderer,

	members : {
		render : function() {
			var elem = this.__locateInTemplate();
			if ( elem !== null ) {
				this.setEl( elem );
			
				this.base(arguments);
				
				var isEditable = this.getJSWWidget().isEditable();
				if (typeof isEditable === "string") { isEditable = $.parseJSON(isEditable); }

				// Get the event list
				var events = this._createEventList( this.getJSWWidget() );

				this.getEl().fullCalendar({
					header: {
						left: 'prev,next today',
						center: 'title',
						right: 'month,agendaWeek,agendaDay'
					},
					defaultDate: this.getJSWWidget().getSelectedDate(),
					editable: isEditable,
					events: events
				});
				
				this._renderIsDone();
			}

		},

		_createEventList : function( widget ) {
			var events    = widget.getEvents(),
				event,
				eventList = [];

			for (var i = 0; i < events.length; i++) {
				if (events[i].classname === 'jsw.widgets.calendar.CalendarEvent') {
					event = {};

					if ( events[i].getTitle() ) { event.title = events[i].getTitle(); }
					if ( events[i].getStart() ) { event.start = events[i].getStart(); }
					if ( events[i].getEnd() )   { event.end   = events[i].getEnd(); }
					if ( events[i].getUrl() )   { event.url   = events[i].getUrl(); }

					eventList.push( event );
				}
			}

			return eventList;
		}
	}

} );

renderer.base.RendererHandlerRegistry.getInstance().add("jsw.widgets.Calendar",  {
	create : function() {
		return new renderer.html5.metronic.CalendarRenderer();
	}
});
