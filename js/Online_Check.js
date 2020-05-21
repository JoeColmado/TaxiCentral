function Online_Check() {

  var trigger_div = 'Online_Check_Trigger_Div'

  this.init_online_check = function () {
    create_trigger_div();
    enable_trigger_events();
    check_connection();

  }
  var set_main_menu_mode = function (e,mode) {
    alert(mode);
  }

  function check_connection() {
    //$('div.debug_div').html('Connection type: ');
    //document.addEventListener("online", onOnline, false);
    //document.addEventListener("offline", onOffline, false);
      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';

      $('div.debug_div').html('Connection type: ' + states[networkState]);
      /*
      */
  }


  function onOnline() {
    $('div.debug_div').html('online ');
    }
  function onOffline() {
    $('div.debug_div').html('Offline ');

  }


  var enable_trigger_events = function () {
    $('div.' + trigger_div).on('set_main_menu_mode', set_main_menu_mode)
  }

  var create_trigger_div = function () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }


}
