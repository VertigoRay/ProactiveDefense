// jquery.xdomainajax.js  ------ from padolsey

jQuery.ajax = (function(_ajax){

    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from html where url="{URL}" and xpath="*"';

    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }

    return function(o) {
        var url = o.url;
        if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {
            // Manipulate options so that JSONP-x request is made to YQL
            o.url = YQL;
            o.dataType = 'json';
            o.data = {
                q: query.replace(
                    '{URL}',
                    url + (o.data ?
                        (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
                    : '')
                ),
                format: 'xml'
            };

            // Since it's a JSONP request
            // complete === success
            if (!o.success && o.complete) {
                o.success = o.complete;
                delete o.complete;
            }

            o.success = (function(_success){
                return function(data) {

                    if (_success) {
                        // Fake XHR callback.
                        _success.call(this, {
                            responseText: data.results[0]
                                // YQL screws with <script>s
                                // Get rid of them
                                .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                        }, 'success');
                    }
                };
            })(o.success);
        }

        return _ajax.apply(this, arguments);
    };

})(jQuery.ajax);

$(document).ready(function(text) {
    // Pull event_list content ...
$.ajax({
    url: 'http://proactivedefense.vertigion.com/schedule.json.php?html=1',
    type: 'GET',
    success: function(res) {
        alert(res.responseText);
        $('#event_list').html(res.responseText);
    },
    dataType: 'html'
});

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
        ],
        eventRender: function(event, element) {
            element.qtip({
                content: (event.img != null ? '<img src="'+ event.img +'" alt="Class Image" />' : '') +'<pre>'+ event.description +'</pre>'
            });
        }   
    })
});