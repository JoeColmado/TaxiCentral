function Geo_Map_Control() {

  var trigger_div = 'Geo_Map_Control_Trigger_Div';

  var Driver_Data = new Array();
  var amount_drivers = 0;
  var Driver_Selected_Index = -1;



  this.init_geo_map_control = function () {
    create_trigger_div();
    enable_trigger_events();

  }

  function enable_trigger_events () {
    $('div.' + trigger_div).on('set_driver_data', set_driver_data)
    $('div.' + trigger_div).on('display_controls', display_controls);
    $('div.' + trigger_div).on('set_driver_index', get_driver_index);



  }
  function create_trigger_div () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
    class: trigger_div,
    }));
  }
  function get_driver_index(e,index) {
    if (Driver_Selected_Index == index) {
      return 0;
    }
    else {
      if (index <= amount_drivers && Driver_Data) {
        Driver_Selected_Index = index;
        update_index_display();
      }
    }
  }

  function set_driver_data (e,data) {
      Driver_Data = JSON.parse(data);
      amount_drivers = Driver_Data.length;
    }

  function update_index_display(){

      if (!Driver_Selected_Index) {
        Driver_Selected_Index = 0;
      }
      var array_index = parseInt(Driver_Selected_Index) ;

      const display_content = (array_index + 1) +' - ' + amount_drivers;
      $('#Navigation_Control_Index_Display').html(display_content);

      //const user_profile_image = GLOBAL_LOCAL_IMAGE_STORAGE.get_image_data_from_url(Driver_Data[array_index].user_profile_image)
      //$('#Navigation_Control_Profile_Picture').attr('src',user_profile_image);

      //const user_profile_image = GLOBAL_LOCAL_IMAGE_STORAGE.get_image_data_from_url(Driver_Data[array_index].user_profile_image)
      $('#Navigation_Control_Profile_Name').html(Driver_Data[array_index].user_nicename);


      control_external_module(array_index);
    }

  function control_external_module(index) {
    switch (MM.get_Main_Menu_Mode()) {
      case DRIVER_MAIN_MENU_MODE:
        $('div.Driver_Trigger_Div').trigger('display_driver_profile',index)
      break;
      case MAP_MAIN_MENU_MODE:
        $('div.Geo_Map_Trigger_Div').trigger('focus_on_driver',index);
      break;
      default:

    }
  }
  function increase_index(){
      if (Driver_Selected_Index >= amount_drivers -1 ) {
        Driver_Selected_Index = 0;
      }
      else {
        Driver_Selected_Index = parseInt(Driver_Selected_Index) + 1;
      }
      update_index_display();
    }
  function decrease_index(){
      if (Driver_Selected_Index <= 0 ) {
        Driver_Selected_Index = parseInt(amount_drivers)-1;
      }
      else {
        Driver_Selected_Index = parseInt(Driver_Selected_Index) - 1;
      }
      update_index_display();
    }

  function create_controls() {
    const wrap_div = "#Navigation_Control_Wrapper";
    const wrap_div_id = "Navigation_Control_Wrapper";

    const middle_frame = '#Navigation_Control_Middle_Frame'
    const middle_frame_id = 'Navigation_Control_Middle_Frame'

    var temp_content;

    $(wrap_div).remove();
    $('body').append($('<div>',{
      id: wrap_div_id,
      class: ' w3-round w3-margin-bottom-xlarge w3-row Navigation_Control_Wrapper'
    }));
    //Left Side
    $(wrap_div).append($('<div>',{
      class: 'Navigation_Control_Left_Frame w3-col w3-display-container',
      html: '<span class="w3-display-middle"><i class="fa-3x fas fa-step-backward" ></i></span>'
    }))
    //Middle_Side
    $(wrap_div).append($('<div>',{
      class: 'Navigation_Control_Middle_Frame  w3-col w3-display-container',
      id: middle_frame_id,
    }))

    $(middle_frame).append($('<h1>',{
      class: 'w3-display-topmiddle ',
      id: 'Navigation_Control_Profile_Name',
      html: '-',
    }));

    //Right Side
    $(wrap_div).append($('<div>',{
      class: 'Navigation_Control_Right_Frame w3-col w3-display-container',
      html: '<span class="w3-display-middle"><i class="fa-3x 3-btn fas fa-step-forward" ></i></span>'
    }));

    temp_content = $(wrap_div).clone().wrap('<div>').parent().html();
    $(wrap_div).remove();
    return temp_content;

  }
  function enable_gui_handlers() {
    $('div.Navigation_Control_Left_Frame').off('click');
    $('div.Navigation_Control_Left_Frame').on('click',decrease_index);

    $('div.Navigation_Control_Right_Frame').off('click');
    $('div.Navigation_Control_Right_Frame').on('click',increase_index);

  }

  function display_controls(e,frame) {
    $(frame).append(create_controls());
    enable_gui_handlers();
    //Reset Index
    Driver_Selected_Index = -1;
    //update_index_display();
  }

}
