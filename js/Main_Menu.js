function Main_Menu() {

  var trigger_div = 'Main_Menu_Trigger_Div';
  var main_page_div = 'Main_Page_Frame' ;

  var Last_Main_Menu_Mode = 0
  var Main_Menu_Mode = 0;

  this.get_Main_Menu_Mode = function () {
    return Main_Menu_Mode;
  }

  this.init_main_menu = function () {
    create_trigger_div();
    enable_trigger_events();
    create_data_div();

  }

  var enable_trigger_events = function () {
    $('div.' + trigger_div).on('set_main_menu_mode', set_main_menu_mode)
    $('div.' + trigger_div).on('set_last_main_menu_mode', set_last_main_menu_mode);
    $('div.' + trigger_div).on('set_last_main_menu_mode_no_display', set_last_main_menu_mode_no_display);

  }


  var create_trigger_div = function () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }

  function create_data_div() {
    $('body').append($('<div>',{
      id: GLOBAL_MAIN_DATA_FRAME_2,
    }));
  }
  function set_last_main_menu_mode() {
    set_main_menu_mode('e',Last_Main_Menu_Mode);
  }
  function set_last_main_menu_mode_no_display(e) {
    Last_Main_Menu_Mode = Main_Menu_Mode;
  }

  var set_main_menu_mode = function (e,mode) {

    //Hide Side_Bar After Action
    $('div.Adaptive_Side_Bar_Trigger_Div').trigger('hide_side_bar');


    //authentification Check for user
    //MA => MAIN APP Object!!!!
    if (!MA.get_user_authentificated()) {
      $('div.Login_User_Trigger_Div').trigger('display_login_form',main_page_div);
      $(GLOBAL_MAIN_DATA_FRAME).attr('main_menu_mode',0);
      return 0;
      }
    // set last Main Menu Mode
    Last_Main_Menu_Mode  = Main_Menu_Mode;
    Main_Menu_Mode = mode;
    switch (mode) {
      case HOME_MAIN_MENU_MODE:
        $('div.User_Trigger_Div').trigger('display_user_home',main_page_div);
      break;
      case SETTINGS_MAIN_MENU_MODE:
        $('div.Settings_Trigger_Div').trigger('display_user_settings',main_page_div);
      break;
      case DRIVER_MAIN_MENU_MODE:
        $('div.Driver_Trigger_Div').trigger('display_driver_mode',main_page_div);
      break;
      case MAP_MAIN_MENU_MODE:
        $('div.Geo_Map_Trigger_Div').trigger('display_map_mode',main_page_div);
      break;
      case 5:
        $('div.Admin_Trigger_Div').trigger('display_admin_view',main_page_div);
      break;
      case 6:
        $('div.Local_Image_Storage_Trigger_Div').trigger('show_image_list',main_page_div);
      break;

      default:
      //alert('default');
    }//Switch
  }//set_main_menu_mode

}//Main_Menu
