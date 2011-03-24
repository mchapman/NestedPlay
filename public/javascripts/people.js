var nested_displays = [];

nested_displays['references'] = showReferencesView;

function getFieldValue(fieldsDiv, fieldName) {
    return fieldsDiv.find('input[name$="['+ fieldName +']"]').attr("value");
}

function showReferencesView() {
// Can this be generated from Ruby code by a helper?
    var desc_text;
    $(".detail-display").each(function (i) {
        var fields = $(this).parent();
        var returned_date = getFieldValue(fields,'date_returned');
        var sent_date;
        if(returned_date.length == 0) {
            sent_date = getFieldValue(fields,'date_requested');
            if(sent_date.length==0) {
                desc_text = "Not yet sent";
            } else {
                desc_text = "Request sent " + sent_date;
            }
        } else {
            desc_text = "Reference received " + returned_date;
        }
    this.innerHTML=(getFieldValue(fields,'first_name') + ' ' + getFieldValue(fields,'last_name') + '.  ' + desc_text + '.');
    });
}

$(function() {
    nested_displays['references']();
});
