
function button_handler() {
    navigator.geolocation.getCurrentPosition(Geo_On_Success, Geo_On_Error, {enableHighAccuracy: true});
    $('div.Loader_Trigger_Div').trigger('App_Loading');
      //navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        //destinationType: Camera.DestinationType.FILE_URI });
        //navigator.vibrate(1000);

}





function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}


var Geo_On_Success = function(position) {
  $('div.Loader_Trigger_Div').trigger('App_Ready');
/*
  alert('Latitude: '          + position.coords.latitude          + '\n' +
  'Longitude: '         + position.coords.longitude         + '\n' +
  'Altitude: '          + position.coords.altitude          + '\n' +
  'Accuracy: '          + position.coords.accuracy          + '\n' +
  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
  'Heading: '           + position.coords.heading           + '\n' +
  'Speed: '             + position.coords.speed             + '\n' +
  'Timestamp: '         + position.timestamp                + '\n');
*/
  $('div.Geo_Map_Trigger_Div').trigger('set_new_marker',{lat: position.coords.latitude, long: position.coords.longitude  });
    //$('div.Communication_Data_Div').trigger("update_user_geo_data",{lat: position.coords.latitude , long: position.coords.longitude})
};

// onError Callback receives a PositionError object
//
function Geo_On_Error(error) {
  $('div.Loader_Trigger_Div').trigger('App_Ready');
  alert('code: '    + error.code    + '\n' +
  'message: ' + error.message + '\n');
}






function configure_geo_location() {
/*
  interval :   	The minimum time interval between location updates in milliseconds. @see Android docs for more information. 	all 	60000
  fastestInterval:  	 	Fastest rate in milliseconds at which your app can handle location updates. @see Android docs. 	ACT 	120000
  activitiesInterval: 	 	Rate in milliseconds at which activity recognition occurs. Larger values will result in fewer activity detections while improving battery life. 	ACT 	10000
*/
  BackgroundGeolocation.configure({
    locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
    desiredAccuracy: BackgroundGeolocation.LOW_ACCURACY,
    stationaryRadius: 25,
    distanceFilter: 25,
    notificationTitle: 'Background tracking',
    notificationText: 'enabled',
    debug: true,
    interval: 6000,
    fastestInterval: 5000,
    activitiesInterval: 5000,
    url: 'http://helmanito.space/wp-admin/admin-ajax.php',
    /*
    httpHeaders: {
      'X-FOO': 'bar'
    },
    */
    // customize post properties
    postTemplate: {
      lat: '@latitude',
      long: '@longitude',
      foo: 'bar', // you can also add your own properties
      action: 'Update_User_Geo_Data',
      username: "Funky_Joe",
      userpass: "default",
      log_action: 'I m the background_app',
    }
  });
}

//closeSidebar();


$( document ).ready(function() {
    init_main_app();
});

function init_main_app() {

  LO = new Loader();
  LO.init_loader();

  CO = new Communication();
  CO.init_communication();

  const IPRE = new Image_Preview();
  IPRE.init_image_preview();

  PC = new Post_Create();
  PC.init_post_creator();

  MM = new Main_Menu();
  MM.init_main_menu();

  LU = new Login_User();
  LU.init_login_user();

  GUI = new GUI();
  GUI.init_gui();

  USER = new User();
  USER.init_user();

  MA = new Main_App();
  MA.init_main_app();

  SE = new Settings();
  SE.init_settings();

  DRIVERS = new Drivers();
  DRIVERS.init_drivers();

  ASB = new Adaptive_Side_Bar();
  ASB.init_adaptive_side_bar();

  GEOM = new Geo_Map();
  GEOM.init_geo_map();

  ADMIN = new Admin();
  ADMIN.init_admin();

  const SETTING_LOADER = new Setting_Loader();
  SETTING_LOADER.init_setting_loader();


  const ONLINE_SERVICE = new Online_Service();
  ONLINE_SERVICE.init_online_service();

  const POP_UP  =new Pop_Up();
  POP_UP.init_pop_up();

  const GEO_MAP_CONTROL = new Geo_Map_Control();
  GEO_MAP_CONTROL.init_geo_map_control();
    
  GLOBAL_LOCAL_IMAGE_STORAGE = new Local_Image_Storage();
  GLOBAL_LOCAL_IMAGE_STORAGE.init_local_image_storage();



  //Call At End of Routine to init app to all Modules
  const INIT_APP_SERVICE = new Init_App_Service();
  INIT_APP_SERVICE.init_init_app_service();


  //ONLINE_CHECK = new Online_Check();
  //ONLINE_CHECK.init_online_check();

  //PERMISSIONS = new Permissions();
  //PERMISSIONS.init_permissions();

  //BGO = new Backgound_Online();
  //BGO.init_backgound_online();


  //BGL = new Background_Location();
  //BGL.init_background_location();






}
