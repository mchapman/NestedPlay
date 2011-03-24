function createDivFromBlueprint(assoc,type) {
    var content = $('#' + assoc + '_fields_' + type + '_blueprint').html(); // template

    // Make the context correct by replacing new_<parents> with the generated ID
    // of each of the parent objects
    var context = ($(this).closest('.fields').find('input:first').attr('name') || '').replace(new RegExp('\[[a-z]+\]$'), '');

    // context will be something like this for a brand new form:
    // project[tasks_attributes][1255929127459][assignments_attributes][1255929128105]
    // or for an edit form:
    // project[tasks_attributes][0][assignments_attributes][1]
    if(context) {
      var parent_names = context.match(/[a-z_]+_attributes/g) || [];
      var parent_ids   = context.match(/[0-9]+/g);

      for(i = 0; i < parent_names.length; i++) {
        if(parent_ids[i]) {
          content = content.replace(
            new RegExp('(\\[' + parent_names[i] + '\\])\\[.+?\\]', 'g'),
            '$1[' + parent_ids[i] + ']'
          )
        }
      }
    }

    // Make a unique ID for the new child
    var regexp  = new RegExp('new_' + assoc, 'g');
    var new_id  = new Date().getTime();
    content     = content.replace(regexp, new_id);
    return content;

}

$(function() {
$('form a.add_nested_fields').live('click', function() {

  // Setup
  var assoc   = $(this).attr('data-association');           // Name of child
  var edit_div_id = assoc+'-nested-fields-edit'

  // check we don't already have an edit "window"
  if($('#'+edit_div_id).length == 0) {
      $(this).before('<div id="'+edit_div_id+'">'+createDivFromBlueprint(assoc,'edit')+'</div>');
  }
  return false;
});

$('form a.remove_nested_fields').live('click', function() {
  var hidden_field = $(this).prev('input[type=hidden]')[0];
  if(hidden_field) {
    hidden_field.value = '1';
  }
  $(this).closest('.fields').hide();
  return false;
});

$('form a.stash_nested_fields').live('click', function() {
  // find the edit "popup" window
  var assoc   = $(this).attr('data-association');     
  var edit_popup = $('#'+assoc+'-nested-fields-edit');
  // see if there is any data in it
  var inputs = edit_popup.find('input')
  var has_data = 0
  // See if there is some data there (I am sure this can be improved by someone who knows jQuery / javascript)
  inputs.each(function(index) {
      if($(this).val() != "") {
          has_data = 1;
          return false;
      }
  })
  if(has_data == 1) {
      // create a new view div
      $('#'+assoc+'-list').append(createDivFromBlueprint(assoc,'view'));
      // and select it
      var new_view = $('#'+assoc+'-list .fields').last()
      // put the data from the view window into the new view div
      inputs.each(function(index) {
        var field_name = $(this).attr("name").match(/\[(\w+)\]$/)[1];
        new_view.find('input[name$="['+ field_name +']"]').val($(this).val());
        });
      // generate the output for the view div
      nested_displays[assoc]();
      };
  // Lose the popup window
  edit_popup.remove();
  return false;
  });
});

