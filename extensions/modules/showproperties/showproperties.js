$(document).ready(function() {
    //Set up drag- and dropp-functionality
    $('.show-property').draggable({ helper: 'clone' });

    // highlight previously selected properties
    $('.show-property').each(function() {
        var propUri = $(this).attr('about');
        if (!$(this).hasClass('InverseProperty')) {
            var pos = $.inArray(propUri, shownProperties);
        } else {
            var pos = $.inArray(propUri, shownInverseProperties);
        }
        	
        if (pos > -1) {
            $(this).addClass('selected');
        }
    })

    //set click handler for the properties
    $('.show-property').click(function() {
        var propUri = $(this).attr('about');
        $(this).toggleClass('selected');
        
        var action = $(this).hasClass('selected')? "add" : "remove";
           
        var inverse = $(this).hasClass('InverseProperty');

        var label = $(this).attr("title");
        
        var data =
            {
            "shownProperties" : 
                [ {
                "uri" : propUri,
                "label" : label,
                "action" : action,
                "inverse" : inverse
                } ]
            };
        var serialized = serialize(data);
        //
        //reload page
        //$('#showproperties form input').attr("value", serialized);
        //$('#showproperties form').submit();

        // or reload list
        var mainInnerContent = $(this).parents('.content.has-innerwindows').eq(0).find('.innercontent');
        mainInnerContent.addClass('is-processing');
        mainInnerContent.load(document.URL, {"instancesconfig": serialized}, function(){
            mainInnerContent.removeClass('is-processing');
        });
    })
})
