$(document).ready(function(text) {
    if ($.cookie('is_mobile') == 1 && (!$.cookie('disable_mobile') || $.cookie('disable_mobile') == 0)) {
        // These cookies are set by weebly.com
        // alert('is_mobile: 1')
        $('head').append('<script src="//proactivedefense.vertigion.com/prd/js/bootstrapmodal.min.js"></script>');
        $('head').append('<link rel="stylesheet" href="//proactivedefense.vertigion.com/prd/css/bootstrapmodal.css" />');
        $('body').append('\
            <div id="fullCalModal" class="modal fade">\
                <div class="modal-dialog">\
                    <div class="modal-content">\
                        <div class="modal-header">\
                            <h4 id="modalTitle" class="modal-title"></h4>\
                            <span id="modalTime"></span>\
                        </div>\
                        <div id="modalBody" class="modal-body"></div>\
                        <div class="modal-footer">\
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                            <button class="btn btn-primary"><a id="eventUrl" target="_blank">Event Page</a></button>\
                        </div>\
                    </div>\
                </div>\
            </div>'
        );

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
                    type: 'POST',
                    data: {
                        mobile: 1,
                    },
                    error: function() {
                        alert('there was an error while fetching events!');
                    },
                }
            ],
            eventClick:  function(event, jsEvent, view) {
                $('#modalTitle').html(event.title);
                $('#modalTime').html('<i>'+ $.format.date(event.StartDateTime, "MMM d h:mm p") +' - '+ ($.format.date(event.StartDateTime, "MMddyyyy") == $.format.date(event.EndDateTime, "MMddyyyy") ? $.format.date(event.EndDateTime, "h:mm p") : $.format.date(event.EndDateTime, "MMM d h:mm p") ) +'</i>');
                $('#modalBody').html((event.img != null ? '<img src="'+ event.img +'" alt="Class Image" style="text-align:center" />' : '') + event.description);
                $('#eventUrl').attr('href',event.url);
                $('#fullCalModal').modal();
                return false;
            }
        });
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
        });
    }
})