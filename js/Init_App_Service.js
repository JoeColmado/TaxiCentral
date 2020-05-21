function Init_App_Service() {

  var trigger_div = 'Init_App_Service_Trigger_Div'

  this.init_init_app_service = function () {
    create_trigger_div();
    enable_trigger_events();
    init_main_app();
  }

  function enable_trigger_events () {
    //$('div.' + trigger_div).on('set_geo_radius', set_geo_radius)
  }
   function create_trigger_div () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }

  function init_main_app () {

    //Set Context
    $("#my-sidebar-context").simpleSidebar();
    //Set Main Menu Mode in Loguin User

    $('div.Main_Menu_Trigger_Div').trigger('set_main_menu_mode',HOME_MAIN_MENU_MODE);

    //Debug!!!!!!!!!
    // $('div.Main_Menu_Trigger_Div').trigger('set_main_menu_mode',DRIVER_MAIN_MENU_MODE);
    $('div.Setting_Loader_Trigger_Div').trigger('repart_settings');
    //Debug!!!!!!!!!

    //Trigger Click on submit button for debugging
    //$('#login_submit_button').trigger('click');

    //When User authentificates
    // $('div.Main_App_Trigger_Div').on('set_user_authentificated',function () {
      //Repart Settings Loaded from Local Storage
    $('div.Setting_Loader_Trigger_Div').trigger('repart_settings');
      //Do Single Online Call to get Data from Server
    $('div.Online_Service_Trigger_Div').trigger('single_online_call');


    }
  }
