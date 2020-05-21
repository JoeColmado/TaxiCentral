function Settings() {

  var trigger_div = 'Settings_Trigger_Div';


  //Object from Settings Loader
  var Settings ={

  }

  this.init_settings = function () {
    create_trigger_div();
    enable_trigger_events();

  }

  var enable_trigger_events = function () {
    $('div.' + trigger_div).on('display_user_settings', display_user_settings)
    $('div.' + trigger_div).on('get_reparted_settings', get_reparted_settings);

  }
  var create_trigger_div = function () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }

  function get_reparted_settings(e,settings) {
    Settings = settings;
    set_elements_values();
  }

  function create_settings_form() {
    var temp_content;

    $('#User_Settings_Div').remove();
    $('body').append($('<div>',{
      class: 'User_Settings_Div w3-theme-d4',
      id: "User_Settings_Div",
      style: "padding: 5%",
    }));
    $('#User_Settings_Div').append($('<br>'));
    create_slide_button('User_Settings_Div','Online_Slider', 'Init_Online_Calls',false);
    $('#User_Settings_Div').append($('<br>'));

    //_------------------------Set Frequency-------------------------------------------
    $('#User_Settings_Div').append($('<input>',{
      id: 'Online_Update_Frequency_Display',
      type: 'text',
    }))

    $('#User_Settings_Div').append($('<button>',{
      html: 'Submit New frequency',
      id: 'submit_frequency_button',
    }));
    $('#User_Settings_Div').append($('<br>'));
    create_slide_button('User_Settings_Div','Geo_Slider', 'Init_Geo_Calls',false);

    $('#User_Settings_Div').append($('<br>'));

    $('#User_Settings_Div').append($('<button>',{
      html: 'Set Default Settings',
      id: 'Set_Default_Settings_Button',
    }));

    temp_content = $('#User_Settings_Div').clone().wrap('<div>').parent().html();
    $('#User_Settings_Div').remove();

    return temp_content;

  }
  function set_elements_values() {
    $('input.Online_Slider').prop('checked',Settings.ONLINE_SERVICE_ACTIVE);
    $('input.Geo_Slider').prop('checked',Settings.GEO_SERVICE_ACTIVE);
    $('#Online_Update_Frequency_Display').val(Settings.ONLINE_FREQUENCY);
  }

  function user_settings_gui_handler() {

    $('input.Online_Slider').off('change');
    $('input.Online_Slider').on('change',function () {
      if (this.checked) {
        trigger_setting_loader('ONLINE_SERVICE_ACTIVE',true);
        $('div.Online_Service_Trigger_Div').trigger('start_online_service');
      }
      else {
        trigger_setting_loader('ONLINE_SERVICE_ACTIVE',false);
        $('div.Online_Service_Trigger_Div').trigger('stop_online_service');
      }
    });

    $('#submit_frequency_button').off('click')
    $('#submit_frequency_button').on('click',function () {
      const new_frequency  = parseInt($('#Online_Update_Frequency_Display').val());
      trigger_setting_loader('ONLINE_FREQUENCY',new_frequency);

      if ($('input.Online_Slider').prop('checked')) {
        $('div.Online_Service_Trigger_Div').trigger('update_online_frequency',new_frequency);
      }
      else {
        $('div.Online_Service_Trigger_Div').trigger('set_online_frequency',new_frequency);

      }
    })

    $('input.Geo_Slider').off('change');
    $('input.Geo_Slider').on('change',function () {
      if (this.checked) {
        trigger_setting_loader('GEO_SERVICE_ACTIVE',true);
      }
      else {
        trigger_setting_loader('GEO_SERVICE_ACTIVE',false);
      }
    });//Change_Event_Geo_Slider_Function

    $('#Set_Default_Settings_Button').off('click');
    $('#Set_Default_Settings_Button').on('click',function () {
      $('div.Setting_Loader_Trigger_Div').trigger('set_dafault_settings');
    });
  }

  function trigger_setting_loader(key,value) {
    var trigger_data = {
      setting_key: key,
      setting_value: value,
    }
    $('div.Setting_Loader_Trigger_Div').trigger('set_setting_attr',trigger_data);
  }
  function display_user_settings (e,frame) {
    $(GLOBAL_MAIN_FRAME).html(create_settings_form());
    set_elements_values();
    user_settings_gui_handler();
  }
  function create_slide_button (parent_div_id,slider_id,label,checked) {
    $('#' + parent_div_id).append($('<label>',{
      id: slider_id,
      class: 'switch',
      html: '<input type="checkbox"  id= "  ' + slider_id +'_input "  class= "  ' + slider_id  + ' " ><span class="slider round"></span>',
    }));
    $('#' + parent_div_id).append($('<label>',{
      for:  slider_id +'_input',
      html: label ,
      style: 'margin: 15px',
    }));
      $(slider_id + '_input').prop('checked',checked);

  }
}
