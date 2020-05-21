function Admin() {

  var trigger_div = 'Admin_Trigger_Div'

  this.init_admin = function () {
    create_trigger_div();
    enable_trigger_events();

  }

  var enable_trigger_events = function () {
    $('div.' + trigger_div).on('add_driver', add_driver);
    $('div.' + trigger_div).on('display_admin_view', display_admin_view);
    $('div.' + trigger_div).on('submit_new_user_form', submit_new_user_form);



  }


  var create_trigger_div = function () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }

  function create_new_user_form() {
    $('#new_user_form').remove();
    $('body').append($('<div>',{
      id: 'new_user_form',
      style: 'padding: 2%',
    }));
    $('#new_user_form').append($('<input>',{
      type: 'text',
      placeholder: 'name',
      id: 'new_user_form_name_input',
    }));
    $('#new_user_form').append($('<br>'));

    $('#new_user_form').append($('<input>',{
      type: 'password',
      placeholder: 'password',
      id: 'new_user_form_password_input',
    }));

    $('#new_user_form').append($('<br>'));
    $('#new_user_form').append($('<input>',{
      type: 'password',
      placeholder: 'repeat password',
      id: 'new_user_form_password_repeat_input',
    }));

    $('#new_user_form').append($('<br>'));
    $('#new_user_form').append($('<input>',{
      type: 'file',
      id: 'new_user_form_file_input',
    }));

    $('#new_user_form').append($('<label>',{
      for: 'new_user_form_file_input',
      html: 'select profile picture',
    }));

    $('#new_user_form').append($('<br>'));
    $('#new_user_form').append($('<button>',{
      id: 'new_user_form_submit_button',
      html: 'submit',
      onclick: 'GUI.Submit_New_User_Form()',
    }));

    var form_content =  $('#new_user_form').clone().wrap('<div>').parent().html();
    $('#new_user_form').remove();
    return form_content;
  }

  function submit_new_user_form () {
    check_new_user_form();
  }

  function check_new_user_form() {

    //Check the length of User Name
    const new_user_name = $('#new_user_form_name_input').val();
    console.log(new_user_name.length);


    const new_user_pass = $('#new_user_form_password_input').val();
    const new_user_pass_repeat = $('#new_user_form_password_repeat_input').val();

    console.log($('#new_user_form_password_input').val());
    console.log($('#new_user_form_password_repeat_input').val());

    if (!(new_user_pass == new_user_pass_repeat)){
    console.log('fail');
    }
    else {
      console.log('correct');
    }
  }
  function display_admin_view(e,frame){
    $(GLOBAL_MAIN_FRAME).html('');
    $(GLOBAL_MAIN_FRAME).html(create_new_user_form())
  }

  var add_driver = function (e,mode) {
    alert(mode);
  }

}
