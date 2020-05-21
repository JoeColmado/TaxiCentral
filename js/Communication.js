function Communication() {
  var trigger_div = "Communication_Trigger_Div";

  this.init_communication = function () {
    create_trigger_div();
    enable_trigger_events();
  }

 function create_trigger_div() {
    $('div.' + trigger_div).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }
function enable_trigger_events() {


    $('div.' + trigger_div).on('delete_position_history',Delete_Position_History);
    $('div.' + trigger_div).on('central_actions',Central_Actions);
  }

  function Central_Actions(e,com_data) {
    com_data.async = Utilities.setDefaultValue(com_data.async,false);
    //console.log(com_data.async);

    //Do Ajax Call without using the Loader
    if (!com_data.async) {
      $('div.Loader_Trigger_Div').trigger('App_Loading');
    }
    jQuery.ajax({
        url: get_ajax_url(),
        type: 'post',
        data : {
          action : "central_actions",
          sub_action: com_data.sub_action,
          sub_data: com_data.sub_data,
        },
        success: function( data, txtStatus, xhr ) {
          var response_data = JSON.parse(data);
          console.log(data);
          $('div.' + com_data.trigger_div).trigger(com_data.sub_action + '_success', response_data);
        },
        fail: function (txtStatus, xhr ) {
          console.log('fail');
          $('div.Loader_Trigger_Div').trigger('App_Ready');
          $('div.' + com_data.trigger_div).trigger(com_data.sub_action + '_fail', {txtStatus: txtStatus, xhr: xhr} );
        },

        complete: function(txtStatus, xhr ) {
          if (!com_data.async) {
            $('div.Loader_Trigger_Div').trigger('App_Ready');
          }
          $('div.' + com_data.trigger_div).trigger(com_data.sub_action + '_complete', {txtStatus: txtStatus, xhr: xhr} );

        },
      });
  }


// Delete_Position_History
    var Delete_Position_History = function (e,id) {
      console.log(id);
    //$('div.Loader_Trigger_Div').trigger('App_Loading');
    var mode = 1;
    var request_data = {
      action : "Delete_Position_History",
      identification: id,
    }
    ajax_post_request(mode,request_data);
    }
    var Delete_Position_History_Sucess_Handler = function (response) {
      console.log(response);

    }
    var Delete_Position_History_Handler = function (xHR,textStatus, errorThrown) {
      console.log('fail_delete_procedure');

    }


    var get_ajax_url = function () {
      return ajax_data.ajax_url;
    }
    var get_ajax_username = function () {
      return "Colombia";
    }
    var get_ajax_userpass  = function () {
      return "default";
    }



    // Ajax Post_Request Mode 0 => Order_Update, Mode 1 => Product_Update
    var ajax_post_request = function (mode ,request_data) {
      if (mode == -1) {
        console.log(fail_mode);
        return 0;
      }

      //Add Login Data
      request_data.username = get_ajax_username();
      request_data.userpass = get_ajax_userpass();
      //console.log(request_data);

      jQuery.ajax({
          url : get_ajax_url() ,
          type : 'post',
          data : request_data,

          success : function(response) {
            var response_data = JSON.parse(response);
            switch (mode) {
              case 0:
                I_Am_Online_Request_Sucess_Handler(response_data)
              break;
              case 1:
                Delete_Position_History_Sucess_Handler(response_data);
              break;
              case 2:

              break;
              case 3:

              break;
              case 4:

              break;
              case 5:

              break;
              case 6:

              break;

              default:
            }
          },
          error: function (xHR,textStatus, errorThrown) {
            switch (mode) {
              case 0:
                I_Am_Online_Request_Fail_Handler(xHR,textStatus, errorThrown);
              break;
              case 1:
                Delete_Position_History_Handler(xHR,textStatus, errorThrown);
              break;
              case 2:

              break;
              case 3:

              break;
              case 4:

              break;
              case 5:

              break;
              case 6:

                break;
              default:
            }
          }
      });
    }

    var Upload_New_Media = function (media_data) {
      var mode = 5;
      var request_data = {
        action : "Upload_New_Image",
        title : media_data.image_title,
        base64_img: media_data.base64_img,
        description: media_data.image_description,
        caption : media_data.image_caption,
        alter: media_data.image_alter,
      }

      //console.log(request_data);
      $('div.Loader_Trigger_Div').trigger('App_Loading');

      ajax_post_request(mode,request_data);
    }


    var Upload_New_Media_Sucess_Handler = function (response_data) {
      console.log(response_data);
      $('div.Loader_Trigger_Div').trigger('App_Ready');
      alert('success');

    }
    var Upload_New_Media_Fail_Handler = function (xHR,textStatus, errorThrown) {
      $('div.Loader_Trigger_Div').trigger('App_Ready');
      alert('Fail');
      console.log(xHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
//------------------------------------------------------------------------------
//User Geo Data


    var Update_User_Geo_Data =function (data) {
      mode =6;
      var request_data = {
        action : "Update_User_Geo_Data",
        lat: data.lat,
        long: data.long,
      }
      //console.log(request_data);
      //$('div.Loader_Trigger_Div').trigger('App_Loading');

      ajax_post_request(mode,request_data);
    }
    var Update_User_Geo_Data_Sucess_Handler = function (response_data) {
      //console.log(response_data);
      //$('div.Loader_Trigger_Div').trigger('App_Ready');
      //alert('success');
      BackgroundGeolocation.endTask(background_task_key);
    }
    var Update_User_Geo_Data_Fail_Handler = function (xHR,textStatus, errorThrown) {
      $('div.Loader_Trigger_Div').trigger('App_Ready');
      BackgroundGeolocation.endTask(background_task_key);

      //alert('Fail');
      //console.log(xHR);
      //console.log(textStatus);
      //console.log(errorThrown);
    }

    //Externer Funktionsaufruf an Live_Store_Data Objekt

  }
