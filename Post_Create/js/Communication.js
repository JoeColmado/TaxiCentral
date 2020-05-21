function Communication() {

    var Order_Request_Time = new Array();
    var Product_Request_Time = new Array();
    var User_Info_Request_Time = new Array();

    //var Trigger_Div = $('div.Communication_Data_Div');
    //if (Trigger_Div.length != 1) {
      //console.log("Error: Trigger element not found");
    //}
    //Input Daten
    var get_user_id= function () {
      return user_data.user_id;
    }
    var get_term_id= function () {
      return user_data.term_id;
    }
    var get_vendor_id= function () {
      return user_data.vendor_id;
    }
    var get_ajax_url = function () {
      return ajax_data.ajax_url;
    }
    var get_ajax_action = function (ii) {
      return ajax_data.ajax_update_actions[ii]
    }



    // Ajax Post_Request Mode 0 => Order_Update, Mode 1 => Product_Update
    var ajax_post_request = function (mode = -1,request_data) {
      if (mode == -1) {
        console.log(fail_mode);
        return 0;
      }

      //Add Login Data
      request_data.username = "Funky_Joe";
      request_data.userpass = "default"
      //console.log(request_data);

      jQuery.ajax({
          url : get_ajax_url() ,
          type : 'post',
          data : request_data,

          success : function(response) {
            var response_data = JSON.parse(response);
            switch (mode) {
              case 0:
                Order_Request_Sucess_Handler(response_data);
              break;
              case 1:
                Product_Request_Sucess_Handler(response_data);
              break;
              case 2:
                User_Info_Request_Sucess_Handler(response_data)
              break;
              case 3:
                Set_Order_State_Request_Sucess_Handler(response_data)
              break;
              case 4:
                Create_Test_Order_Request_Sucess_Handler(response_data)
              break;
              case 5:
                  Upload_New_Media_Sucess_Handler(response_data);
              break;
              case 6:
                  Update_User_Geo_Data_Sucess_Handler(response_data);
                break;

              default:
            }
          },
          error: function (xHR,textStatus, errorThrown) {
            switch (mode) {
              case 0:
                Order_Request_Fail_Handler(xHR,textStatus,errorThrown);
              break;
              case 1:
                Product_Request_Fail_Handler(xHR,textStatus,errorThrown);
              break;
              case 2:
                User_Info_Request_Fail_Handler(xHR,textStatus, errorThrown)
              break;
              case 3:
                Set_Order_State_Request_Fail_Handler(xHR,textStatus, errorThrown)
              break;
              case 4:
                Create_Test_Order_Request_Fail_Handler(xHR,textStatus, errorThrown)
              break;
              case 5:
                  Upload_New_Media_Fail_Handler(xHR,textStatus, errorThrown)
              break;
              case 6:
                  Update_User_Geo_Data_Fail_Handler(xHR,textStatus, errorThrown);
                break;
              default:
            }
          }
      });
    }

    this.Order_Request = function () {
      var mode =0;
      var request_data = {
        action : get_ajax_action(mode),
        term_id : get_term_id(),
      }
      //Time difference
      Order_Request_Time = new Array();
      Order_Request_Time[0] = new Date();
      ajax_post_request(mode,request_data);
      }
    var Order_Request_Sucess_Handler = function (response_data) {
      Order_Request_Time.push(new Date());
      var delta_T = (Order_Request_Time[1] - Order_Request_Time[0]) /1000;
      console.log("Sucess_Order  in:  " + delta_T);
      //console.log(response_data);
      communication_data.last_sucess_order_update = Order_Request_Time[1];
      communication_data.all_vendor_order = response_data;
      Trigger_Div.trigger("update_order_data");

      }
    var Order_Request_Fail_Handler = function (xHR,textStatus, errorThrown) {
      console.log(xHR);
      console.log(textStatus);
      console.log(errorThrown);
      communication_data.last_fail_order_update = Order_Request_Time[0];
      Trigger_Div.trigger("update_order_data_fail");
    }

    this.Product_Request = function () {
      var mode = 1;
      var request_data = {
        action : get_ajax_action(mode),
        term_id : get_term_id(),
      }
      Product_Request_Time = new Array();
      Product_Request_Time[0] = new Date();
      ajax_post_request(mode,request_data);
      }
    var Product_Request_Sucess_Handler = function (response_data) {
      Product_Request_Time.push(new Date());
      var delta_T = (Product_Request_Time[1] - Product_Request_Time[0]) /1000;
      console.log("Sucess_Product in:  " +  delta_T);
      //console.log(response_data);
      communication_data.last_sucess_product_update=Product_Request_Time[1];
      communication_data.all_vendor_product=response_data;
      Trigger_Div.trigger("update_product_data");
    }
    var Product_Request_Fail_Handler = function (xHR,textStatus, errorThrown) {
      console.log(xHR);
      console.log(textStatus);
      console.log(errorThrown);
      Trigger_Div.trigger("update_product_data_fail");
    }

    this.Set_Order_State_Request = function () {
      //possible States : "cancelled", "completed","on-hold","processing"
      console.log("Set State");
      var mode = 3;
      var request_data = {
        action : get_ajax_action(mode),
        term_id : get_term_id(),
        user_id : get_user_id(),
        vendor_id : get_vendor_id(),
        order_id: 275,
        order_state: 'cancelled'
      }
      //Product_Request_Time = new Array();
      //Product_Request_Time[0] = new Date();
      ajax_post_request(mode,request_data);
      }
    var Set_Order_State_Request_Sucess_Handler = function (response_data) {
      console.log(response_data);
      }
    var Set_Order_State_Request_Fail_Handler = function (xHR,textStatus, errorThrown) {
      console.log(xHR);
      console.log(textStatus);
      console.log(errorThrown);
    }

    this.User_Info_Request = function () {
      var mode = 2;
      var request_data = {
        action : get_ajax_action(mode),
        term_id : get_term_id(),
        user_id : get_user_id(),
        vendor_id : get_vendor_id(),
        customer_ids: [1,6,7,8],

      }
      User_Info_Request_Time = new Array();
      User_Info_Request_Time[0] = new Date();
      ajax_post_request(mode,request_data);
    }
    var User_Info_Request_Sucess_Handler = function (response_data) {
      User_Info_Request_Time.push(new Date());
      var delta_T = (User_Info_Request_Time[1] - User_Info_Request_Time[0]) /1000;
      console.log("Sucess_User_Info in:  " + delta_T);
      console.log(response_data);
      communication_data.all_vendor_info_last_sucess = Order_Request_Time[1];
      communication_data.all_vendor_info = response_data;
      Trigger_Div.trigger("update_user_info_data");
    }
    var User_Info_Request_Fail_Handler = function (xHR,textStatus, errorThrown) {
      console.log(xHR);
      console.log(textStatus);
      console.log(errorThrown);
      Trigger_Div.trigger("update_user_info_data_fail");
    }

    this.Create_Test_Order_Request = function (cart_data) {
      var mode = 4;
      var request_data = {
        action : "Create_Test_Order",
        term_id : get_term_id(),
        user_id : get_user_id(),
        vendor_id : get_vendor_id(),
        products : cart_data,
        customer_ids: [6,8],
      }
      ajax_post_request(mode,request_data);
    }

    var Create_Order_Request = function (cart_data) {
      var mode = 4;
      var request_data = {
        action : "Create_Test_Order",
        term_id : get_term_id(),
        user_id : get_user_id(),
        vendor_id : get_vendor_id(),
        products : cart_data,
        customer_ids: [6,8],
      }
      ajax_post_request(mode,request_data);
    }
    var Create_Test_Order_Request_Sucess_Handler = function (response_data) {
      console.log(response_data);
    }
    var Create_Test_Order_Request_Fail_Handler = function (xHR,textStatus, errorThrown) {
      console.log(xHR);
      console.log(textStatus);
      console.log(errorThrown);
    }

//------------------------------------------------------------------------------
//Upload_New MediaFile
    this.extern_upload_media = function () {
      var test_data = {title: 'Abs', base64_img: '001001'};
      Upload_New_Media(test_data);

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
//Authentication_Debug
    var Authentication_Request = function (data) {
      jQuery.ajax({
          url: get_ajax_url(),
          type: 'post',
          data : {
              username: data.user_name,
              userpass: data.user_pass,
              action : "Authentication_Request"

            },
          success: function( data, txtStatus, xhr ) {
              console.log( data );
              console.log( xhr.status );
          },
          fail: function (txtStatus, xhr ) {
            console.log(txtStatus);
            console.log(xhr);
          }

        });
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
      $('div.Loader_Trigger_Div').trigger('App_Loading');

      ajax_post_request(mode,request_data);
    }
    var Update_User_Geo_Data_Sucess_Handler = function (response_data) {
      console.log(response_data);
      $('div.Loader_Trigger_Div').trigger('App_Ready');
      alert('success');
    }
    var Update_User_Geo_Data_Fail_Handler = function (xHR,textStatus, errorThrown) {
      $('div.Loader_Trigger_Div').trigger('App_Ready');
      alert('Fail');
      console.log(xHR);
      console.log(textStatus);
      console.log(errorThrown);
    }

    //Externer Funktionsaufruf an Live_Store_Data Objekt
    var  extern_trigger_handler = function () {

      $('div.Communication_Data_Div').on("confirm_order",function (e,data) {
        Create_Order_Request(data);
      });
      $('div.Communication_Data_Div').on("upload_new_media",function (e,data) {
        //console.log(data);
        Upload_New_Media(data);
      });
      $('div.Communication_Data_Div').on("authentication",function (e,data) {
        Authentication_Request(data);
        //console.log(data);
      });
      $('div.Communication_Data_Div').on("update_user_geo_data",function (e,data) {
        Update_User_Geo_Data(data);
        //console.log(data);
      });

    }
    var create_trigger_div = function () {
      $('div.Communication_Data_Div').remove();
      $('body').append($('<div>',{
        class: 'Communication_Data_Div',
      }));
    }

    this.init_communication = function () {
      create_trigger_div();
      extern_trigger_handler();
    }
    //this.init_communication();

  }
