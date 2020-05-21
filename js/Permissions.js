  function Permissions() {

  var trigger_div = 'Permissions_Trigger_Div'

  this.init_permissions = function () {
    create_trigger_div();
    enable_trigger_events();
    debug_permissions();

  }

  var create_trigger_div = function () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }
  var enable_trigger_events = function () {
    $('div.' + trigger_div).on('set_main_menu_mode', set_main_menu_mode)
  }

  var set_main_menu_mode = function (e,mode) {
    alert(mode);
  }


  function debug_permissions() {

    var Permission = window.plugins.Permission;

    var permission = 'android.permission.RECORD_AUDIO';
    $('div.debug_div').html(permission);

    Permission.request(permission, function(results) {
        if (result[permission]) {
          $('div.debug_div').html('permission granted')
        }

    }, function () {
      $('div.debug_div').html('permission failed')
    })
//    $('div.debug_div').html('permissions');

/*
    Permission.has(permission, function(results) {
        if (!results[permission]) {
            Permission.request(permission, function(results) {
                if (result[permission]) {
                  $('div.debug_div').html('permission granted')
                }
            }, alert)
        }
    }, alert)
    */
  }



}
