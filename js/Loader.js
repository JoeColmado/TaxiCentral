function Loader() {

  this.init_loader = function () {
    create_trigger_div();
    init_triggers();
  }
  var init_triggers = function () {
    $('div.Loader_Trigger_Div').on('App_Loading',function () {
      activate_loader();
    })
    $('div.Loader_Trigger_Div').on('App_Ready',function () {
      deactivate_loader();
    })
  }

  var create_trigger_div = function () {
    $('div.Loader_Trigger_Div').remove();
    $('body').append($('<div>',{
      class: 'Loader_Trigger_Div',
      style: 'display: none',
    }));
    }

    var start_time;
    var check_task;

    //Critical Time in Seconds
    var CRITICAL_TIME = 20;

    var opacity_on = function () {
      $('body').css('opacity', '0.5');
    }
    var opacity_off = function () {
      $('body').css('opacity', '1');
    }
    var create_spinning_loader = function () {
      $('div.loader').remove();
      $('body').append($('<div>',{
        class: 'loader ',
        style: 'position: fixed; left: 30%; top: 20%;'
      }));
    }

    var destroy_spinning_loader = function () {
      $('div.loader').remove();
    }

    var disable_buttons = function () {
      $('.ui_element').attr('disabled',true);
    }
    var enable_buttons = function () {
      $('.ui_element').attr('disabled',false);
    }



    var activate_loader = function () {
      opacity_on();
      create_spinning_loader();
      disable_buttons();
      start_time = new Date();
      check_task = setInterval(check_loading_time,100);

    }

    var check_loading_time = function () {
      var actual_time  = new Date();
      var time_difference = parseInt((actual_time -start_time)/1000);
      if (time_difference  >= CRITICAL_TIME) {
          deactivate_loader();
          alert('Time error');
          }
    }

    var deactivate_loader = function () {
      opacity_off();
      destroy_spinning_loader();
      enable_buttons();
      clearInterval(check_task);
    }
}

/*
*/
