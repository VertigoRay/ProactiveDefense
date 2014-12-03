$(document).ready(function() {
// page is now ready, initialize the calendar...
	$('#calendar').fullCalendar({
		loading: function(bool) {
		  if (bool) 
		    $('#loading').show();
		  else 
		    $('#loading').hide();
		},
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		height: 'auto',
		eventSources: [

	        // your event source
	        {
	        	url: ('https:' == document.location.protocol ? 'https:' : 'http:') +'//proactivedefense.vertigion.com/schedule.json.php',
			    cache: true,
	            type: 'POST',
	            data: {
	                custom_param1: 'something',
	                custom_param2: 'somethingelse'
	            },
	            error: function() {
	                alert('there was an error while fetching events!');
	            },
	            // color: 'yellow',   // a non-ajax option
	            // textColor: 'black' // a non-ajax option
	        }

	        // any other sources...

	    ]
	})
});