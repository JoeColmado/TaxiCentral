function Setting_Loader() {

    var trigger_div = 'Setting_Loader_Trigger_Div';

    const Storage_Key = 'App_Settings';

    var App_Settings  = {
      ONLINE_FREQUENCY: '',
      ONLINE_SERVICE_ACTIVE: '',

      GEO_UPDATE_FREQUENCY: '',
      GEO_SERVICE_ACTIVE: '',

      Driver_Data: '',
    };

    const Default_Settings = {
      ONLINE_FREQUENCY: '5000',
      ONLINE_SERVICE_ACTIVE: false,

      GEO_UPDATE_FREQUENCY: '5000',
      GEO_SERVICE_ACTIVE: false,

      Driver_Data: '',


    }

    this.init_setting_loader = function () {
      create_trigger_div();
      enable_trigger_events();
      //set_dafault_settings();
      load_app_settings();
      //repart_settings();
    }

    function enable_trigger_events () {

      $('div.' + trigger_div).on('save_driver_data', save_driver_data);
      $('div.' + trigger_div).on('set_setting_attr', set_setting_attr);
      $('div.' + trigger_div).on('set_dafault_settings', set_dafault_settings);
      $('div.' + trigger_div).on('repart_settings', repart_settings);
    }

    function create_trigger_div () {
      $('div.' + trigger_div ).remove();
      $('body').append($('<div>',{
      class: trigger_div,
      }));
    }

    function repart_settings() {
      //console.log('repart');
      $('div.Settings_Trigger_Div').trigger('get_reparted_settings',App_Settings);
      control_online_service();
      repart_driver_data();

    }
    function control_online_service() {
      $('div.Online_Service_Trigger_Div').trigger('set_online_frequency',App_Settings.ONLINE_FREQUENCY);
      if (App_Settings.ONLINE_SERVICE_ACTIVE) {
        $('div.Online_Service_Trigger_Div').trigger('start_online_service',App_Settings.ONLINE_FREQUENCY);
      }
    }
    function repart_driver_data() {
      $('div.Online_Service_Trigger_Div').trigger('repart_driver_data',App_Settings['Driver_Data'].Driver_Data);

    }

    function load_app_settings() {
      var loaded_settings_string =  localStorage.getItem(Storage_Key);
      //No Settings Loaded
      if (loaded_settings_string === null) {
        console.log('no settings found');
        set_dafault_settings();
        loaded_settings_string =  localStorage.getItem(Storage_Key);
      }
      App_Settings =JSON.parse(loaded_settings_string);
    }
    function save_settings() {
      const json_settings = JSON.stringify(App_Settings);
      localStorage.setItem(Storage_Key,json_settings);
    }

    function set_dafault_settings() {
      //console.log('set default');
      const json_settings = JSON.stringify(Default_Settings);
      localStorage.setItem(Storage_Key,json_settings);
      loaded_settings_string =  localStorage.getItem(Storage_Key);
      App_Settings =JSON.parse(loaded_settings_string);
      repart_settings();

    }

    function set_setting_attr (e,key_data_pair) {
      App_Settings[key_data_pair.setting_key] = key_data_pair.setting_value;
      save_settings();
    }
    function save_driver_data(e,driver_data) {
      App_Settings['Driver_Data'] = driver_data;
      save_settings();
    }


}
