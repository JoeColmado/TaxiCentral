function Online_Service() {

  var trigger_div = 'Online_Service_Trigger_Div';

  var Online_Service_Frquency;
  var Online_Service_Task;
  var Online_Service_Active;
  var first_call = true;


  this.init_online_service = function () {
    create_trigger_div();
    enable_trigger_events();
  }
  function create_trigger_div () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }

  function enable_trigger_events () {

    $('div.' + trigger_div).on('set_online_frequency', set_online_frequency);
    $('div.' + trigger_div).on('update_online_frequency', update_online_frequency);
    $('div.' + trigger_div).on('stop_online_service', stop_online_service);
    $('div.' + trigger_div).on('start_online_service', start_online_service);
    $('div.' + trigger_div).on('single_online_call', single_online_call);
    $('div.' + trigger_div).on('central_online_request_success', central_online_request_success_handler);
    $('div.' + trigger_div).on('repart_driver_data', repart_driver_data);
  }
  // TODO: central online fail _handler


  //Repart the Driver Data to all Modules
  function central_online_request_success_handler(e,data) {

    if (data.uptodate) {
      return 0;
    }
    //Calculate Postion History Distance and Add it in Driver_Data Object
    data.driver_data.map(function (obj,i) {
      obj.position_history_distance = return_distance_from_position_history(obj.user_position_history);
    })
    //Save Data Local in Settings Loader
    $('div.Setting_Loader_Trigger_Div').trigger('save_driver_data',{
      Driver_Data: JSON.stringify(data.driver_data),
    });
    repart_driver_data(e,JSON.stringify(data.driver_data));
  }

  function return_distance_from_position_history(positon_history) {
    var temp_latlngs = new Array();
    var path;
    for (var i = 0; i < positon_history.length; i++) {
      temp_latlng = {lat: "", lng:""};
      temp_latlng.lat = positon_history[i].lat;
      temp_latlng.lng = positon_history[i].long;
      temp_latlngs.push(temp_latlng);
    }
    path = L.polyline(temp_latlngs)
    //Poly Line getDistance => Custom Function defined in GeoMap Module
    return path.getDistance();
  }

  function repart_driver_data(e,driver_data) {
    if (driver_data === undefined) {
      return 0;
    }
    // console.log(driver_data);
    driver_data = JSON.parse(driver_data);
    //Trigger Data to Drivers Module without filtering
    $('div.Driver_Trigger_Div').trigger('set_driver_data',JSON.stringify(driver_data));

      var user_geo_map_data =  driver_data.map(function(obj,i){return {
        user_nicename: obj.user_nicename,
        user_position: obj.user_position,
        user_position_history: obj.user_position_history,
        user_profile_image: obj.profile_image,
      }
    });
    $('div.Geo_Map_Trigger_Div').trigger('set_driver_data',JSON.stringify(user_geo_map_data));

    var user_geo_map_control_data =  driver_data.map(function(obj,i){return {
      user_nicename: obj.user_nicename,
      user_profile_image: obj.profile_image,
      }
    });
    $('div.Geo_Map_Control_Trigger_Div').trigger('set_driver_data',JSON.stringify(user_geo_map_control_data));
  }

  function set_online_frequency(e,new_freq) {
    Online_Service_Frquency = new_freq;
  }

  function update_online_frequency(e,new_freq) {
    stop_online_service();
    Online_Service_Frquency = new_freq;
    start_online_service();
  }


  function start_online_service() {
    //Debugging For only Foreground App
    //Dont Start if Online Service active
    if (Online_Service_Active) {
      return 0 ;
    }
    Online_Service_Active = true;
    console.log(Online_Service_Frquency);
    Online_Service_Task = setInterval(function () {
      //console.log('online');
      Online_Request();
    },Online_Service_Frquency);
    /*
    */
  }
  function stop_online_service() {
    //Debugging For only Foreground App
    //Dont Stop if Online Service stopped
    //console.log('stop');
    if (!Online_Service_Active) {
      return 0 ;
    }
    Online_Service_Active = false;
    clearInterval(Online_Service_Task);
  }
  function single_online_call() {
    Online_Request();
  }

  function Online_Request() {
    //console.log(USER.return_user_id());
    const com_data = {
      sub_action: 'central_online_request',
      trigger_div: 'Online_Service_Trigger_Div',
      sub_data:{
        identification: USER.return_user_id(),
        first_call: first_call,
      },
      async: true,
    }
    $('div.Communication_Trigger_Div').trigger('central_actions',com_data);
    first_call = false;

  }




}
