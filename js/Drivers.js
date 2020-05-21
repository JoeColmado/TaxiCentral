function Drivers() {

  const trigger_div = 'Driver_Trigger_Div';

  var Driver_Data  = new Array();
  var display_single_profile_bool = false;
  var detailed_displayed_driver_index = 0;

  this.init_drivers = function () {
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
    //Display  Main driver Selection
    $('div.' + trigger_div).on('display_driver_mode', display_driver_mode);
    //Display Single Driver Profile
    $('div.' + trigger_div).on('display_driver_profile', display_driver_profile);

    $('div.' + trigger_div).on('set_driver_data', set_driver_data);
    $('div.' + trigger_div).on('delete_position_history_success', delete_position_history_success);
    $('div.' + trigger_div).on('delete_position_history_fail', delete_position_history_fail);


  }
  function delete_position_history_fail(txt,xhr) {
    console.log('delete_position_history_fail');
  }

  function delete_position_history_success(e,data) {
    console.log(data);
  }

//Get Data From Communication
  function set_driver_data(e,driver_data) {
      var temp_data ;
      temp_data = JSON.parse(driver_data);
       //console.log(temp_data);
      //Check Driver Data
      if (!Array.isArray(temp_data) || temp_data.length < 1 ) {
        console.log("Driver Data is not valid ");
        return 0;
      }
      //Check if number of Drivers changed
      if (Driver_Data.length != temp_data.length) {
        Driver_Data = temp_data;
        if (MM.get_Main_Menu_Mode() == DRIVER_MAIN_MENU_MODE) {
        display_driver_mode('event','Main_Page_Frame');
        }
      }
      else {
        Driver_Data = temp_data;
        update_driver_view();
      }
      //Driver_Mode_
      if (MM.get_Main_Menu_Mode() == DRIVER_MAIN_MENU_MODE) {
        //
        if (display_single_profile_bool) {
          display_driver_profile('e',detailed_displayed_driver_index);
        }
      }

      //console.log(Driver_Data);
    }


  function update_driver_view() {
    //Update_Frame if Driver Mode Selected
    if (MM.get_Main_Menu_Mode() == DRIVER_MAIN_MENU_MODE) {
      for (var i = 0; i < Driver_Data.length; i++) {
        var last_online_time = Utilities.Time_Difference(Driver_Data[i].user_last_online)
        $('#last_online_display_' + i).html(last_online_time)
      }

    }

  }


  function _create_single_driver_profile(data_set,index) {
    var temp_content = "";
    var last_online_time = Utilities.Time_Difference(data_set.user_last_online);
    const image_data = GLOBAL_LOCAL_IMAGE_STORAGE.get_image_data_from_url(data_set.profile_image);

    $('body').append($('<div>',{
      id: 'Driver_Wrap_Div_' + index ,
      class: 'Driver_Show_Profile_Link Driver_Wrap_Div w3-card-4 w3-margin w3-round-xlarge w3-hover-theme',
      button_index: index,
    }));

    $('#Driver_Wrap_Div_' + index ).append($('<img>',{

      src: image_data,
      alt: data_set.user_nicename,
      style: 'height: 100px; width: 100px;  margin: 5%',
      class: 'Driver_Show_Profile_Link w3-circle',

    }));

    $('#Driver_Wrap_Div_' + index ).append($('<h2>',{
      html: data_set.user_nicename,
    }));

    temp_content = $('#Driver_Wrap_Div_' + index).clone().wrap('<div>').parent().html();
    $('div.Driver_Wrap_Div').remove();
    return temp_content;
  }
  function enable_gui_events() {
    $('button.display_on_map_button').off('click');
    $('button.display_on_map_button').on('click',function (e) {
      const button_index = e.target.getAttribute('button_index');
    });
    $('button.delete_position_history_button').off('click');
    $('button.delete_position_history_button').on('click',function (e) {
      const button_index = e.target.getAttribute('button_index');
      delete_driver_history_data(button_index)
    });

    $('.Driver_Show_Profile_Link').off('click');
    $('.Driver_Show_Profile_Link').on('click',function (e) {
      const driver_index = e.target.getAttribute('button_index');
      display_driver_profile('e',driver_index);
    });

  }

  function display_driver_mode(e,frame) {
    detailed_displayed_driver_index = false;

    var grid_content = new Array();
    display_single_profile_bool = false;

    $(GLOBAL_MAIN_FRAME).html('');
    if (!Driver_Data || Driver_Data.length == 0 ) {
      console.log('No Driver Data');
    }
    for (var i = 0; i < Driver_Data.length; i++) {
      var single_profile = _create_single_driver_profile(Driver_Data[i],i);
      grid_content.push(single_profile);
    }
    var Driver_Grid = new Grid_View('Drivers');
    Driver_Grid.display_main_navigation(frame,grid_content,[2,3]);
    enable_gui_events();
  }

  function display_driver_profile(e,index) {
    display_single_profile_bool = true;
    detailed_displayed_driver_index = index;

    $(GLOBAL_MAIN_FRAME).html(create_driver_profile(index));
    // Main_Menu_Trigger_Div
    // set_lat_main_menu_mode
    //Driver_Profile_Close_Button
    //Set LAst Main Menu Mode To Return To Profile Section
    //$('div.Geo_Map_Control_Trigger_Div').trigger('set_driver_index',index);
    $('div.Main_Menu_Trigger_Div').trigger('set_last_main_menu_mode_no_display');

    enable_driver_single_profile_gui_handlers()
  }

  function enable_driver_single_profile_gui_handlers() {
    $('#Driver_Profile_Close_Button').off('click');
    $('#Driver_Profile_Close_Button').on('click',function () {
      $('div.Main_Menu_Trigger_Div').trigger('set_last_main_menu_mode')
    });
    $('#delete_position_history_button').off('click');
    $('#delete_position_history_button').on('click',function (e) {
      const driver_index  = e.target.getAttribute('button_index');
      delete_driver_history_data(driver_index);
      //$('div.Main_Menu_Trigger_Div').trigger('set_last_main_menu_mode')
    });
    $('#User_Home_Profile_Picture').off('dblclick');
    $('#User_Home_Profile_Picture').on('dblclick',function (e) {
      const driver_index =e.target.getAttribute('button_index');
      $('div.Main_Menu_Trigger_Div').trigger('set_main_menu_mode',MAP_MAIN_MENU_MODE);
      $('div.Geo_Map_Trigger_Div').trigger('focus_on_driver',driver_index);
    });
    $('#user_profile_show_map_button').off('click');
    $('#user_profile_show_map_button').on('click',function (e) {
      const driver_index =e.target.getAttribute('button_index');
      $('div.Main_Menu_Trigger_Div').trigger('set_main_menu_mode',MAP_MAIN_MENU_MODE);
      $('div.Geo_Map_Trigger_Div').trigger('focus_on_driver',driver_index);
    });


  }
  function delete_driver_history_data(data_index) {
    const position_history_distance =  Driver_Data[data_index].position_history_distance;
    const driver_id = Driver_Data[data_index].ID;
    const com_data = {
      sub_action: 'delete_position_history',
      trigger_div: trigger_div,
      sub_data: {
        Driver_ID: driver_id,
        Position_History_Distance: position_history_distance,
      },
      async: false,
    }
    $('div.Communication_Trigger_Div').trigger('central_actions',com_data);

  }
  function create_driver_profile(index) {
    const wrap_div = "#Driver_Profile_Wrapper";
    const wrap_div_id = "Driver_Profile_Wrapper";

    const profile_pic_div = '#driver_home_profile_pic_div';
    const profile_pic_div_id = 'driver_home_profile_pic_div';

    const profile_name_div = '#driver_home_profile_name_div';
    const profile_name_div_id = 'driver_home_profile_name_div';

    const profile_email_div = '#driver_home_profile_email_div';
    const profile_email_div_id = 'driver_home_profile_email_div';

    const profile_phone_div = '#driver_home_profile_phone_div';
    const profile_phone_div_id = 'driver_home_profile_phone_div';

    const profile_distance_div = '#driver_home_profile_distance_div';
    const profile_distance_div_id = 'driver_home_profile_distance_div';

    const profile_total_driven_distance_div = '#driver_home_profile_total_driven_distance_div';
    const profile_total_driven_distance_div_id = 'driver_home_profile_total_driven_distance_div';

    const profile_tour_driven_distance_div = '#driver_home_profile_tour_driven_distance_div';
    const profile_tour_driven_distance_div_id = 'driver_home_profile_tour_driven_distance_div';



    var temp_content;


    //console.log(Driver_Data);
    const user_name = Driver_Data[index].user_nicename;
    const user_image_url = GLOBAL_LOCAL_IMAGE_STORAGE.get_image_data_from_url(Driver_Data[index].profile_image);
    const user_email = Driver_Data[index].user_email;
    const user_registred = Driver_Data[index].user_registered;
    const last_position = Driver_Data[index].user_position;
    const user_phone = Driver_Data[index].user_phone;
    const driver_position_history_distance = parseFloat(Driver_Data[index].position_history_distance).toFixed(2);
    const driver_tour_driven_distance = parseFloat(Driver_Data[index].driver_total_driven_distance).toFixed(2);

    $(wrap_div).remove();

    $('body').append($('<div>',{
      id: wrap_div_id,
      style: "",
      class: 'w3-margin-left w3-center  ',
    }));

    $(wrap_div).append($('<span>',{
      id: 'Driver_Profile_Close_Button',
      class: 'w3-display-topright ',
      html: '<i class="fa-2x fas fa-times" style="color: white"></i>',
    }))


  //---Profile_ Picture
    $(wrap_div).append($('<div>',{
      id: profile_pic_div_id,
      class: 'w3-display-container w3-padding w3-card-4 w3-margin w3-padding w3-round-xlarge',
      style: 'height: 180px; ',

    }))


    $(profile_pic_div).append($('<img>',{
      alt: user_name + 'no tiene foto',
      src: user_image_url,
      style: 'height: 150px; width: 150px; ',
      class: 'w3-circle w3-display-middle  ',
      id: 'User_Home_Profile_Picture',
      button_index: index,
    }));

    $(profile_pic_div).append($('<h3>',{
      html: user_name.toUpperCase(),
      class:"w3-display-topleft w3-xxlarge "
    }));
    $(profile_pic_div).append($('<button>',{
      class: 'w3-teal w3-display-bottomright w3-btn w3-round  ',
      html: 'Ver en Mapa',
      id: 'user_profile_show_map_button',
      button_index: index,

    }));

/*

*/

    $(wrap_div).append($('<div>',{
      class: 'w3-half   w3-xlarge  ',
      id: profile_email_div_id,
    }));


    $(profile_email_div).append($('<span>',{
     html: '<i class= "fa-lg fas fa-envelope" ></i> <p></p>',
     class: ' ' ,

    }));

    $(profile_email_div).append($('<span>',{
      html: '  ' + user_email,
      class: '   ',
    }));


    $(wrap_div).append($('<div>',{
      class: 'w3-half   w3-xlarge',
      id: profile_phone_div_id,
    }));

    $(profile_phone_div).append($('<span>',{
     html: '<i class= "fa-lg fas fa-phone-alt" ></i> <p></p>',
     class: ' ',
    }));

    $(profile_phone_div).append($('<span>',{
      html:  '+1 800 654 827',
      class: ' ',
    }));






    $(wrap_div).append($('<div>',{
      class: ' w3-xlarge w3-container',
      id: profile_distance_div_id,
    }));

    $(profile_distance_div).append($('<div>',{
      class : 'w3-half ',
      id : profile_tour_driven_distance_div_id,
    }));
    $(profile_distance_div).append($('<div>',{
      class : ' w3-half',
      id : profile_total_driven_distance_div_id,

    }));

    $(profile_total_driven_distance_div).append($('<h2>',{
      html: 'Total:',
    }));
    $(profile_total_driven_distance_div).append($('<span>',{
     html: '<i class= "fa-lg fas fa-tachometer-alt" ></i>',
     class: ' ',
    }));
    $(profile_total_driven_distance_div).append($('<span>',{
      html: '  ' + driver_tour_driven_distance + ' km ' + '<p></p>',
      class: ' ',
    }));
    $(profile_total_driven_distance_div).append($('<button>',{
      class: 'w3-theme-d2 w3-btn w3-round',
      id: 'delete_position_history_button',
      html: 'Borrar Total',
      button_index: index,
    }));

    $(profile_tour_driven_distance_div).append($('<h2>',{
      html: 'Vuelta:',
    }));
    $(profile_tour_driven_distance_div).append($('<span>',{
     html: '<i class= "fa-lg fas fa-tachometer-alt" ></i>',
    }));
    $(profile_tour_driven_distance_div).append($('<span>',{
      html: '  ' + driver_position_history_distance+ ' km ' + '<p> </p>',
    }));

    $(profile_tour_driven_distance_div).append($('<button>',{
      class: 'w3-theme-d2 w3-btn w3-round',
      id: 'delete_position_history_button',
      html: 'Borrar Vuelta',
      button_index: index,
    }));


    //
    $(wrap_div).append($('<div>',{
      id: 'profile_bottom_control_div',
      class: 'w3-row   w3-margin'
    }));



    temp_content = $(wrap_div).clone().wrap('<div>').parent().html();
    $(wrap_div).remove();
    return temp_content;
  }

}
