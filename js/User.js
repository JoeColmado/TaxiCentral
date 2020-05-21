function User() {

  var trigger_div = 'User_Trigger_Div';

  var User_Data = {};

  //Set by Image_Preview Module
  var New_User_Image_Data = {};

  this.init_user = function () {
    create_trigger_div();
    enable_trigger_events();
  }
  function create_trigger_div() {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }
  function enable_trigger_events() {
    $('div.' + trigger_div).on('display_user_home', display_user_home);
    $('div.' + trigger_div).on('set_user_information', set_user_information);
    $('div.' + trigger_div).on('valid_picture_selected', success_picture_preview_handler);
    $('div.' + trigger_div).on('invalid_picture_selected', fail_picture_preview_handler);
    $('div.' + trigger_div).on('change_user_profile_picture_success', change_user_profile_picture_success_handler);
    $('div.' + trigger_div).on('change_user_profile_picture_fail', change_user_profile_picture_fail_handler);

    $('div.' + trigger_div).on('change_user_email_success',change_user_email_success);
    $('div.' + trigger_div).on('change_user_email_fail',change_user_email_fail);

    $('div.' + trigger_div).on('change_user_pass_success',change_user_pass_success);
    $('div.' + trigger_div).on('change_user_pass_fail',change_user_pass_fail);
  }

  this.return_user_id = function () {
    if (User_Data.ID) {
      return User_Data.ID;
    }
    else {
      return false;
    }
  }
  //Get Information
  //Trigger from Ajax Call Login Form
  function set_user_information(e,data) {
    User_Data = data;
    //console.log(User_Data);
  }

  function display_user_home(e,frame) {
    $(GLOBAL_MAIN_FRAME).html(create_user_home_view());
    enable_home_view_events();
  }

  function create_user_home_view() {
      const wrap_div_id = '#user_home_wrap_div';
      const wrap_div_id_2 = 'user_home_wrap_div';

      const profile_pic_div = '#user_home_profile_pic_div';
      const profile_pic_div_id = 'user_home_profile_pic_div';

      const profile_name_div = '#user_home_profile_name_div';
      const profile_name_div_id = 'user_home_profile_name_div';

      const profile_email_div = '#user_home_profile_email_div';
      const profile_email_div_id = 'user_home_profile_email_div';

      const profile_phone_div = '#user_home_profile_phone_div';
      const profile_phone_div_id = 'user_home_profile_phone_div';




      var temp_content;

      const user_name = User_Data.display_name;
      const user_image_url = GLOBAL_LOCAL_IMAGE_STORAGE.get_image_data_from_url(User_Data.profile_image);
      const user_email = User_Data.user_email;
      const user_registred = User_Data.user_registered;
      const last_position = User_Data.last_position;
      const user_phone = User_Data.phone;


      $(wrap_div_id).remove();
      $('body').append($('<div>',{
        id: wrap_div_id_2,
        style: "height: 100%; width:100%; margin: 0px",
        class: 'w3-padding w3-center w3-container ',
      }));

      //---Profile_ Picture
      $(wrap_div_id).append($('<div>',{
        id: profile_pic_div_id,
        class: 'w3-border-bottom w3-display-container '
      }))

      $(profile_pic_div).append($('<img>',{
        alt: user_name + 'no tiene foto',
        src: user_image_url,
        style: 'height: 150px; width: 150px;',
        class: 'w3-circle w3-margin',
        id: 'User_Home_Profile_Picture'
      }));
      // $(profile_pic_div).append($('<span>',{
      //   class: 'w3-border w3-display-bottommiddle  w3-circle User_Change_Profile_Picture_Icon',
      //   style: 'margin-left: 60px; margin-bottom: 25px ',
      //   html: '<i class= "fa-3x fas fa-pen" ></i>'
      // }));

      //Change User Profile picture
      $(wrap_div_id).append($('<input>',{
        type: 'file',
        id: "Change_User_Profile_Picture_File_Input",
      }));

      $(wrap_div_id).append($('<h1>',{
        html: user_name,
        style: 'cursor: pointer; '
      }));


      $(wrap_div_id).append($('<div>',{
       class: 'w3-row  w3-margin-top w3-xlarge',
       id: profile_email_div_id,
      }));

      $(wrap_div_id).append($('<div>',{
       class: 'w3-row  w3-margin-top w3-xlarge',
       id: profile_phone_div_id,
      }));

      $(wrap_div_id).append($('<br>'));

      $(profile_email_div).append($('<span>',{
       html: '<i class= "fa-lg fas fa-envelope" ></i>',
       class: 'Change_User_Email_Link ' ,
       style: 'width: 35%;   cursor: pointer; '

      }));

      $(profile_email_div).append($('<span>',{
        html: user_email,
        class: ' Change_User_Email_Link  ',
        style: ' margin-left: 5%; width: 55%; cursor: pointer  ',
      }));

      $(profile_phone_div).append($('<span>',{
       html: '<i class= "fa-lg fas fa-phone-alt" ></i>',
       class: ' ',
       style: 'width:35%;   cursor: pointer; '
      }));

      $(profile_phone_div).append($('<span>',{
        html: '+1 80955257658 ',
        class: ' ',
        style: ' margin-left: 5%; width: 55%; cursor: pointer  ',
      }));

      $(wrap_div_id).append($('<div>',{
        class: 'w3-row ',
        id: 'userControlBar'
      }));

      $('#userControlBar').append($('<button>',{
        id: 'Change_User_Pass_Button',
        html: 'Contrasena',
        class: 'w3-btn w3-theme-d1 w3-margin-right w3-round-large',
      }));
      $('#userControlBar').append($('<button>',{
        html: 'Numero',
        class: 'w3-btn w3-theme-d1 w3-margin-right w3-round-large',
      }));

      $('#userControlBar').append($('<button>',{
        html: 'E-mail',

        class: ' Change_User_Email_Link w3-btn w3-theme-d1 w3-margin-right w3-round-large',
      }));

      $('#userControlBar').append($('<button>',{
        id: 'User_Change_Profile_Picture_Icon',
        html: 'Photo',
        class: 'w3-btn w3-theme-d1 w3-margin-right w3-round-large',
      }));




      $(wrap_div_id).append($('<hr>'));


      // $(wrap_div_id).append($('<button>',{
      //   html: 'change password',
      //   id: 'Change_User_Pass_Button',
      //   class: ''
      // }));


      // $(wrap_div_id).append($('<br>'));
      // $(wrap_div_id).append($('<p>',{
      //   html: "registrado el " +  user_registred,
      // }));



      $(wrap_div_id).append($('<button>',{
        html: "Log Out",
        class: ' w3-btn w3-teal w3-round-large ',

        id: "User_Log_Out_Button",
      }));

      temp_content = $(wrap_div_id).clone().wrap('<div>').parent().html();
      $(wrap_div_id).remove();
      return temp_content;
    }


  function enable_home_view_events() {
    $('#User_Log_Out_Button').off('click');
    $('#User_Log_Out_Button').on('click',log_out_handler);



    $('#Change_User_Profile_Picture_File_Input').off('change');
    $('#Change_User_Profile_Picture_File_Input').on('change',change_user_profile_picture_handler);

    $('.Change_User_Email_Link').off('click');
    $('.Change_User_Email_Link').on('click',change_user_email_handler);

    $('#Change_User_Pass_Button').off('click');
    $('#Change_User_Pass_Button').on('click',change_user_pass_handler);

    $('#User_Home_Profile_Picture').off('click');
    $('#User_Home_Profile_Picture').on('click',open_file_input_by_trigger);

    $('#User_Change_Profile_Picture_Icon').off('click');
    $('#User_Change_Profile_Picture_Icon').on('click',open_file_input_by_trigger);
  }

  function debug_click(ev) {
    console.log('click');
  }

  function open_file_input_by_trigger(e) {
    e.preventDefault();
    $('#Change_User_Profile_Picture_File_Input').trigger('click');
  }

  //
  // function maximize_profile_pic() {
  //   console.log(User_Data);
  //   $('div.Pop_Up_Trigger_Div').trigger('display_pop_up');
  //   $(GLOBAL_POPUP_FRAME).append($('<img>',{
  //     src: User_Data.profile_image,
  //     style: 'max-height: 500px; width:100%'
  //   }))
  //
  // }

  function change_user_pass_handler() {
      $('div.Pop_Up_Trigger_Div').trigger('display_pop_up');
      $(GLOBAL_POPUP_FRAME).append($('<h2>',{
        html: 'Nueva Contrasena',
        class: 'w3-margin-top'
      }))

      $(GLOBAL_POPUP_FRAME).append($('<input>',{
        type: 'password',
        class: 'w3-theme-d4 w3-round w3-margin-bottom',
        id: 'change_user_pass_input'
      }));

      $(GLOBAL_POPUP_FRAME).append($('<h2>',{
        html: 'Otra vez',
        class: ''
      }))
      $(GLOBAL_POPUP_FRAME).append($('<input>',{
        type: 'password',
        class: 'w3-theme-d4 w3-round w3-margin-bottom',
        id: 'change_user_pass_confirm_input'
      }));
      $(GLOBAL_POPUP_FRAME).append($('<br>'));
      $(GLOBAL_POPUP_FRAME).append($('<button>',{
        class: ' w3-btn w3-teal w3-round-large  w3-margin-top',
        html: 'Validar',
        id: 'change_user_pass_submit_button',
      }));
      $('#change_user_pass_submit_button').off('click');
      $('#change_user_pass_submit_button').on('click',function(){

        const new_pass = $('#change_user_pass_input').val();
        const new_pass_confirm = $('#change_user_pass_confirm_input').val();

        if (check_password_input(new_pass,new_pass_confirm)) {
          change_user_pass_ajax_request(new_pass);
          //console.log('yes');
        }
        else {
          alert('invalid pass')
        }
      });
    };
    // TODO:
  function check_password_input(new_pass,new_pass_confirm) {
      if (new_pass == new_pass_confirm &&  new_pass.length >= 3) {
        return true;
      }
      else {
        return false;
      }
    }

  function change_user_pass_ajax_request(new_pass) {
      $('div.Communication_Trigger_Div').trigger('central_actions',{
        sub_action: 'change_user_pass',
        trigger_div : trigger_div,
        sub_data:{
          new_pass: new_pass,
          user_id: User_Data.ID,
        },
      });
    }
  function change_user_pass_success(e,data) {
    $('div.Pop_Up_Trigger_Div').trigger('close_pop_up');
    log_out_handler();
    //console.log(data);

  }
  function change_user_pass_fail() {
    console.log('fail');
  }

  //Change User Email Routine
  function change_user_email_handler() {
    $('div.Pop_Up_Trigger_Div').trigger('display_pop_up');
    $(GLOBAL_POPUP_FRAME).append($('<h2>',{
      html: 'Nuevo Mail',
      class: 'w3-margin-top'
    }))
    $(GLOBAL_POPUP_FRAME).append($('<input>',{
      type: 'text',
      class: 'w3-theme-d4 w3-round w3-margin-bottom',
      id: 'change_user_email_input'
    }));
    $(GLOBAL_POPUP_FRAME).append($('<br>'))
    $(GLOBAL_POPUP_FRAME).append($('<button>',{
      class: ' w3-btn w3-teal w3-round-large  w3-margin-top',
      html: 'Validar',
      id: 'change_user_email_submit_button',
    }));
    $('#change_user_email_submit_button').off('click');
    $('#change_user_email_submit_button').on('click',function(){
      const new_email = $('#change_user_email_input').val();
      if (check_email(new_email)) {
        change_email_ajax_request(new_email);
      }
      else {
        alert('please type email')
      }
    });
  };
  // TODO: Check Email
  function check_email(new_email) {
    if (new_email.length <= 3) {
      return false
    }
    else {
      return true;
    }
  }
  function change_email_ajax_request(new_email) {
    $('div.Communication_Trigger_Div').trigger('central_actions',{
      sub_action: 'change_user_email',
      trigger_div : trigger_div,
      sub_data:{
        new_email: new_email,
        user_id: User_Data.ID,
      },
    });
  }
  function change_user_email_fail() {
    console.log('fail');
  }
  function change_user_email_success(e,data) {
    console.log(data);
    $('div.Pop_Up_Trigger_Div').trigger('close_pop_up');
  }

  //Change User Profile Picture Routine
  function change_user_profile_picture_handler () {
    //Open Popup
    $('div.Pop_Up_Trigger_Div').trigger('display_pop_up');
    $('div.Image_Preview_Trigger_Div').trigger('new_input_file_set',{
      input_id: 'Change_User_Profile_Picture_File_Input',
      trigger_frame: trigger_div,
      preview_frame: 'body',
    })
    //Routine goes on success_picture_preview_handler()
  }
  function fail_picture_preview_handler() {
    alert('invalid image');
    $('div.Pop_Up_Trigger_Div').trigger('close_pop_up');
  }
  function success_picture_preview_handler(e,image) {
    //console.log(image);
    $(GLOBAL_POPUP_FRAME).append($('<img>',{
      src: image.base64_img,
      style: 'width: 150px; height: 150px',
      class: 'w3-circle w3-border w3-margin',
      alt: 'fail'
    }));
    $(GLOBAL_POPUP_FRAME).append('<br>');
    $(GLOBAL_POPUP_FRAME).append($('<button>',{
      id: 'Submit_New_User_Profile_Pic_Button',
      html: 'Upload'
    }));
    $('#Submit_New_User_Profile_Pic_Button').off('click');
    $('#Submit_New_User_Profile_Pic_Button').on('click',function () {
      $('div.Communication_Trigger_Div').trigger('central_actions',{
        sub_action: 'change_user_profile_picture',
        trigger_div : trigger_div,
        sub_data:{
          image_data: image,
          user_id: User_Data.ID,
        }
      })
    });
  }
  //Ajax Handler
  function change_user_profile_picture_fail_handler() {
    console.log('fail');
    $('div.Pop_Up_Trigger_Div').trigger('close_pop_up');

  }
  function change_user_profile_picture_success_handler(e,data) {
    console.log(data);
    $('div.Pop_Up_Trigger_Div').trigger('close_pop_up');

  }
//End of Change User Profile Picture Routine

  function log_out_handler() {
    $('div.Main_App_Trigger_Div').trigger('log_out_user');
  }



}
