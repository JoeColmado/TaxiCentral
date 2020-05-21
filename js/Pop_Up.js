function Pop_Up() {

  var trigger_div = 'Pop_Up_Trigger_Div';

  var pop_up_displayed = false;

  this.init_pop_up = function () {
    create_trigger_div();
    enable_trigger_events();

  }

  function enable_trigger_events () {
    $('div.' + trigger_div).on('display_pop_up', display_pop_up);
    $('div.' + trigger_div).on('close_pop_up', close_pop_up);
    $('div.' + trigger_div).on('toggle_pop_up', toggle_pop_up);

  }
   function create_trigger_div () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }

  function toggle_pop_up() {
    if (pop_up_displayed) {
      close_pop_up();
    }
    else {
      display_pop_up();
    }
  }
  function display_pop_up () {
    pop_up_displayed = true;
    $('body').append(create_pop_up_window());
    enable_gui_events();
    $(GLOBAL_MAIN_FRAME).css('opacity',0.4);

  }
  function close_pop_up() {
    pop_up_displayed = false;
    console.log('here');
    $(GLOBAL_POPUP_FRAME).remove();
    $(GLOBAL_MAIN_FRAME).css('opacity',1);


  }
  function create_pop_up_window() {
    var temp_content ;

    $(GLOBAL_POPUP_FRAME).remove();
    $('body').append($('<div>',{
      id: GLOBAL_POPUP_FRAME_ID,
      class: 'w3-theme-d4 w3-padding w3-center  w3-diplay-container w3-display-middle  w3-round-xlarge w3-padding ',
      style: ' z-index: 2; min-width: 50%; height: 50%'
    }));


    $(GLOBAL_POPUP_FRAME).append($('<span>',{
      class: 'Pop_Up_Close_Button w3-btn w3-round-large w3-display-topright',
      html: '<i class="fa-1x fas fa-times" style="color: red"></i>',
    }));

    temp_content = $(GLOBAL_POPUP_FRAME).clone().wrap('<div>').parent().html();
    $(GLOBAL_POPUP_FRAME).remove();
    return temp_content;
  }
  function enable_gui_events() {
    $('span.Pop_Up_Close_Button').off('click');
    $('span.Pop_Up_Close_Button').on('click',close_pop_up);
  }


}
