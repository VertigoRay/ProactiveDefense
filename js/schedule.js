$(document).ready(function(text) {
    if ($.cookie('is_mobile') == 1 && $.cookie('mobile_disable') == 0) {
        // These cookies are set by weebly.com

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
            eventSources: [{
                    url: ($(location).attr('host') != 'proactivedefense.vertigion.com' ? (('https:' == $(location).attr('protocol') ? 'https:' : 'http:') +'//proactivedefense.vertigion.com/prd/') : ($(location).attr('pathname').match("^/prd") ? '/prd/' : '/dev/' )) +'schedule.json.php',
                    cache: true,
                    method: 'POST',
                    data: {
                        mobile: 1
                    },
                    error: function() {
                        alert('there was an error while fetching events!');
                    },
                }
            ],
            eventClick: function(event, jsEvent, view) {
                element.qtip({
                    content: {
                        title: event.title + '<br /><i>'+ $.format.date(event.StartDateTime, "MMM d h:mm p") +' - '+ ($.format.date(event.StartDateTime, "MMddyyyy") == $.format.date(event.EndDateTime, "MMddyyyy") ? $.format.date(event.EndDateTime, "h:mm p") : $.format.date(event.EndDateTime, "MMM d h:mm p") ) +'</i>',
                        text: (event.img != null ? '<img src="'+ event.img +'" alt="Class Image" style="text-align:center" />' : '') + event.description +'<hr /><a href="'+ event.url +'">Register</a>',
                    },
                    position: {
                        my: 'center',
                        at: 'center',
                        target: $(window),
                    },
                });
            }   
        })

    } else {
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
            eventSources: [{
                    url: ($(location).attr('host') != 'proactivedefense.vertigion.com' ? (('https:' == $(location).attr('protocol') ? 'https:' : 'http:') +'//proactivedefense.vertigion.com/prd/') : ($(location).attr('pathname').match("^/prd") ? '/prd/' : '/dev/' )) +'schedule.json.php',
                    cache: true,
                    error: function() {
                        alert('there was an error while fetching events!');
                    },
                }
            ],
            eventRender: function(event, element) {
                element.qtip({
                    content: {
                        title: event.title + '<br /><i>'+ $.format.date(event.StartDateTime, "MMM d h:mm p") +' - '+ ($.format.date(event.StartDateTime, "MMddyyyy") == $.format.date(event.EndDateTime, "MMddyyyy") ? $.format.date(event.EndDateTime, "h:mm p") : $.format.date(event.EndDateTime, "MMM d h:mm p") ) +'</i>',
                        text: (event.img != null ? '<img src="'+ event.img +'" alt="Class Image" style="text-align:center" />' : '') + event.description,
                    },
                    position: {
                        viewport: true
                    },
                });
            }   
        })
    }
})