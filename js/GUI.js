function GUI() {

  var trigger_div = 'GUI_Trigger_Div'

  this.init_gui = function () {
    create_trigger_div();
    enable_trigger_events();

  }

  var enable_trigger_events = function () {
    //$('div.' + trigger_div).on('submit_login_form', submit_login_form)
  }
  var create_trigger_div = function () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }

  //Public Functions Called by GUI




//Side_Navigation Functions
  this.Sider_Nav_Home = function () {
    $('div.Main_Menu_Trigger_Div').trigger('set_main_menu_mode',1);
  }
  this.Sider_Nav_Settings = function () {
    $('div.Main_Menu_Trigger_Div').trigger('set_main_menu_mode',2);
  }

  this.Sider_Nav_Drivers = function () {
    $('div.Main_Menu_Trigger_Div').trigger('set_main_menu_mode',3);
  }

  this.Sider_Nav_Map =function (i) {
    $('div.Main_Menu_Trigger_Div').trigger('set_main_menu_mode',4);
  }

  this.Sider_Nav_Admin =function (i) {
    $('div.Main_Menu_Trigger_Div').trigger('set_main_menu_mode',5);
  }

  //Click on Names of Driver Submenu of Drivers
  this.Side_Bar_Driver_Click =function (i) {
    $('div.Main_Menu_Trigger_Div').trigger('set_main_menu_mode',4);
    $('div.Adaptive_Side_Bar_Trigger_Div').trigger('hide_side_bar');
    $('div.Geo_Map_Trigger_Div').trigger('focus_on_driver',i);
  }







  //Functions of Admin page
  this.Submit_New_User_Form = function () {
      $('div.Admin_Trigger_Div').trigger('submit_new_user_form');
  }



}
