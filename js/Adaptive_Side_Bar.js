function Adaptive_Side_Bar() {

  var trigger_div = 'Adaptive_Side_Bar_Trigger_Div';
  var Driver_Names = new Array();

  this.init_adaptive_side_bar = function () {
    create_trigger_div();
    enable_trigger_events();
    show_side_bar();
  }

  var enable_trigger_events = function () {

    $('div.' + trigger_div).on('hide_side_bar', hide_side_bar);
    $('div.' + trigger_div).on('show_side_bar', show_side_bar);
    $('div.' + trigger_div).on('set_driver_names', set_driver_names);
  }

  var create_trigger_div = function () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }

    var set_driver_names = function (e,driver_names) {
      Driver_Names= JSON.parse(driver_names);
      update_side_bar_list();
    }

    var update_side_bar_list = function () {
      $('#sidebar-link-mycomponents').html('');
      for (var i = 0; i < Driver_Names.length; i++) {
        $('#sidebar-link-mycomponents').append($('<li>',{
          id: 'side_bar_driver_' + i,
          onclick: 'GUI.Side_Bar_Driver_Click(' + i + ')',

        }));
        $('#side_bar_driver_' + i).append($('<a>',{
          href: '#',
          html: Driver_Names[i],
        }));


      }
    }

    var hide_side_bar = function () {
      var jContext = $('#my-sidebar-context');
      jContext.removeClass('sidebar-show');
      jContext.addClass('sidebar-hide');

    }
    var show_side_bar = function () {
      var jContext = $('#my-sidebar-context');
      jContext.removeClass('sidebar-hide');
      jContext.addClass('sidebar-show');

    }

}
