function Main_App() {

  var trigger_div = 'Main_App_Trigger_Div';

  var _authentificated_user = false;


  this.init_main_app = function () {
    create_trigger_div();
    enable_trigger_events();

  }

  var enable_trigger_events = function () {
    $('div.' + trigger_div).on('set_user_authentificated', set_user_authentificated);
    $('div.' + trigger_div).on('log_out_user', log_out_user);

  }

  var create_trigger_div = function () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }

  var set_user_authentificated = function (e) {
    _authentificated_user = true;
  }
   var log_out_user  =function (e) {
     _authentificated_user = false;
     $('div.Login_User_Trigger_Div').trigger('log_out_user');
     $('div.Main_Menu_Trigger_Div').trigger('set_main_menu_mode',1);
   }

  this.get_user_authentificated = function () {
    return _authentificated_user ;
  }



}
