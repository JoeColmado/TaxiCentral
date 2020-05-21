
function Background_Location() {
  var trigger_div = 'Background_Location_Trigger_Div';
  /*
*/
  this.init_background_location = function () {
    create_trigger_div();
    enable_trigger_events();

  }
  var create_trigger_div = function () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }
  var enable_trigger_events = function () {
    $('div.' + trigger_div).on('enable_backgound_location', init_debug);
    $('div.' + trigger_div).on('dsiable_backgound_location', stop_backgound_location);

  }
  var init_debug  = function () {

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
    $('#Debug_Section').html('init');


  BackgroundGeolocation.on('start', function() {
    console.log('[INFO] BackgroundGeolocation service has been started');
    $('#Debug_Section').html('start');
  });

  BackgroundGeolocation.on('background', function() {
   console.log('[INFO] App is in background');
   // you can also reconfigure service (changes will be applied immediately)
   BackgroundGeolocation.configure({ debug: true });
 });

 BackgroundGeolocation.on('location', function(location) {
   $('#Debug_Section').html('location');

    // handle your locations here
    // to perform long running operation on iOS
    // you need to create background task
    BackgroundGeolocation.startTask(function(taskKey) {
      //alert(taskKey);

      $('div.Communication_Data_Div').trigger("update_background_task_key",taskKey);
      $('div.Communication_Data_Div').trigger("update_user_geo_data",{lat: location.latitude, long: location.longitude});
      // execute long running task
      // eg. ajax post location
      // IMPORTANT: task has to be ended by endTask
      //!!!!!!!!!!!!!!!End Task in Communication!!!!!!!!!!!!!!!!
      //BackgroundGeolocation.endTask(taskKey);
    });
  });

  BackgroundGeolocation.start();


    }//Init_Debug
  var stop_backgound_location = function () {
    BackgroundGeolocation.stop();
  }

  var configure_geo_location = function() {
/*
  interval :   	The minimum time interval between location updates in milliseconds. @see Android docs for more information. 	all 	60000
  fastestInterval:  	 	Fastest rate in milliseconds at which your app can handle location updates. @see Android docs. 	ACT 	120000
  activitiesInterval: 	 	Rate in milliseconds at which activity recognition occurs. Larger values will result in fewer activity detections while improving battery life. 	ACT 	10000
*/

}
  var configure_success = function () {
    $('#Debug_Section').html('configure_success');
  }
  var configure_fail = function () {
    $('#Debug_Section').html('configure_fail');
  }

}

/*


//configure_geo_location();
BackgroundGeolocation.on('start', function() {
  console.log('[INFO] BackgroundGeolocation service has been started');
  $('#Debug_Section').html('start');
});

BackgroundGeolocation.on('background', function() {
 console.log('[INFO] App is in background');
 // you can also reconfigure service (changes will be applied immediately)
 BackgroundGeolocation.configure({ debug: true });
});

BackgroundGeolocation.on('location', function(location) {
 $('#Debug_Section').html('location');

  // handle your locations here
  // to perform long running operation on iOS
  // you need to create background task
  BackgroundGeolocation.startTask(function(taskKey) {
    //alert(taskKey);

    $('div.Communication_Data_Div').trigger("update_background_task_key",taskKey);
    $('div.Communication_Data_Div').trigger("update_user_geo_data",{lat: location.latitude, long: location.longitude});
    // execute long running task
    // eg. ajax post location
    // IMPORTANT: task has to be ended by endTask
    //!!!!!!!!!!!!!!!End Task in Communication!!!!!!!!!!!!!!!!
    //BackgroundGeolocation.endTask(taskKey);
  });
});

BackgroundGeolocation.start();


*/
