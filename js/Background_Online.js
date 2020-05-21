function Backgound_Online() {

  var trigger_div = 'Backgound_Online_Trigger_Div'


  var settings = {
    timerInterval: 6000, // interval between ticks of the timer in milliseconds (Default: 60000)
    startOnBoot: false, // enable this to start timer after the device was restarted (Default: false)
    stopOnTerminate: true, // set to true to force stop timer in case the app is terminated (User closed the app and etc.) (Default: true)
    hours: -1, // delay timer to start at certain time (Default: -1)
    minutes: -1, // delay timer to start at certain time (Default: -1)
  }

  this.init_backgound_online = function () {
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
    $('div.' + trigger_div).on('start_online_backgound_task', start_online_backgound_task);
    $('div.' + trigger_div).on('stop_online_backgound_task', stop_online_backgound_task);
    $('div.' + trigger_div).on('set_online_update_frequency_running_process', set_online_update_frequency_running_process);

  }
  var set_online_update_frequency_running_process = function (new_frequency) {
    stop_online_backgound_task('event');
    start_online_backgound_task('event',new_frequency);
  }
  var set_online_update_frequency = function (new_frequency) {
    settings.timerInterval = new_frequency;
  }

  var start_online_backgound_task = function (e,interval) {
    window.BackgroundTimer.onTimerEvent(eventCallback); // subscribe on timer event
    set_online_update_frequency(interval);
    window.BackgroundTimer.start(successCallback, errorCallback, settings);
  }

  var stop_online_backgound_task = function (e) {
    window.BackgroundTimer.stop(successCallback, errorCallback);
  }


  var eventCallback = function() {
    //Ajax Call
    $('div.Communication_Trigger_Div').trigger("i_am_online");
    //Debug Notification
    /*
    cordova.plugins.notification.local.schedule({
        title: 'Online Call',
        text: 'You send your data',
        foreground: true
    });
    */
    // timer event fired
  }

  var successCallback = function() {
    alert('Background Task succes with: ' + settings.timerInterval + ' as frequency');
  }

  var errorCallback = function(e) {
    alert("Error Heppend")
  }

}
