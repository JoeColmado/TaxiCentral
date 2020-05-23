function Login_User() {

  var trigger_div = 'Login_User_Trigger_Div';

  var login_sucess = false;
    this.get_login_sucess = function () {
      return login_sucess;
    }

  var user_name = false;
    this.get_user_name  = function () {
      return user_name;
    }
  var user_pass = false;
    this.get_user_pass = function () {
      return user_pass;
    }

  this.init_login_user = function () {
    create_trigger_div();
    enable_trigger_events();

  }
  var create_trigger_div = function () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }

  var enable_trigger_events = function () {
    $('div.' + trigger_div).on('display_login_form', display_login_form);
    $('div.' + trigger_div).on('server_login_response', server_login_response);
    $('div.' + trigger_div).on('log_out_user', log_out_user);
    $('div.' + trigger_div).on('init_authentification_success',init_authentification_handler );
    $('div.' + trigger_div).on('init_authentification_fail',init_authentification_handler );
  }

  function init_authentification_handler(e,data) {
    console.log(data);
    if(data.authentification){
      user_name = data.user_name;
      user_pass = data.user_pass;
      login_sucess = true;
      $('div.Main_App_Trigger_Div').trigger('set_user_authentificated');
      $('div.User_Trigger_Div').trigger('set_user_information',data.user_data);
      $('div.User_Trigger_Div').trigger('display_user_home','Main_Page_Frame');

    }
    else {
      alert("fail");
    }
  }



  function display_login_form(e,frame) {

    $('#' + frame).html(create_login_form());
    enable_form_events();
  }
  function create_login_form() {
    var temp_content;
    const wrap_div_id = '#login_form_init';
    $(wrap_div_id).remove();
    $('body').append($('<div>',{
      id: 'login_form_init',
      class: 'Login_Form_Div w3-center w3-theme-d4 w3-card-4 w3-margin w3-round w3-padding',
    }));


    $(wrap_div_id).append($('<p>',{
      html: 'Usuario: ',
      class:" w3-large w3-red",
    }));

    $(wrap_div_id).append($('<input>',{
      type: 'text',
      placeholder: 'User Name',
      id: 'Login_Form_User_Name',
      class:"  w3-margin-bottom",
      //Debug-User
      value: 'Colombia',
    }));


    $(wrap_div_id).append($('<p>',{
      html: 'Contrasena: ',
      class:" w3-large  ",
      //Debug-User
    }));

    $(wrap_div_id).append($('<input>',{
      type: 'password',
      placeholder: 'User Pass',
      id: 'Login_Form_User_Pass',
      autofocus: '',
      //Debug_Value
      value: 'default',
    }));

    $(wrap_div_id).append($('<br>',{
    }));

    $(wrap_div_id).append($('<button>',{
      html: 'Iniciar',
      style: 'margin: 5%',
      class: ' w3-btn w3-teal w3-round-large ',
      id: 'login_submit_button',
      //onclick: 'GUI.Submit_Login_Form()',
    }))
    temp_content = $(wrap_div_id).clone().wrap('<div>').parent().html();
    $(wrap_div_id).remove();

    return temp_content;
  }
  function enable_form_events() {
    //Submit Form
    $('#login_submit_button').off('click');
    $('#login_submit_button').on('click',submit_login_form);
  }
  function submit_login_form() {

    const temp_user_name = $('#Login_Form_User_Name').val();
    const temp_user_pass = $('#Login_Form_User_Pass').val();
    var com_data = {
      sub_action: 'init_authentification',
      trigger_div: 'Login_User_Trigger_Div',
      sub_data:{
        user_name: temp_user_name,
        user_pass: temp_user_pass,
      }
      /*
      $('div.Communication_Trigger_Div').trigger("submit_log_in_form",{
        user_name: temp_user_name,
        user_pass: temp_user_pass
      });
      */
    }
    $('div.Communication_Trigger_Div').trigger('central_actions',com_data);

  }

  //Login Functions


  var server_login_response = function (e,data) {

  }

  var log_out_user = function () {
    user_name = "";
    user_pass = "";
    login_sucess = false;
  }



}
