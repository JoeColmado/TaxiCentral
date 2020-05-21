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
    $('body.Main_Frame').append($('<div>',{
      class: 'Loader_Trigger_Div',
      style: 'display: none',
    }));
    }


    var opacity_on = function () {
      $('div.Main_Window').css('opacity', '0.5');
    }
    var opacity_off = function () {
      $('div.Main_Window').css('opacity', '1');
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

    }
    var deactivate_loader = function () {
      opacity_off();
      destroy_spinning_loader();
      enable_buttons();
    }
}

/*
*/
