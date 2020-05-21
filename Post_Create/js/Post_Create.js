

function Post_Create() {
  //Settings
  var min_post_title_length = 5;
  var min_post_description_length = 15;


  //User Input
  var post_title = "";
  var post_description = "";
  var post_image = "";
  var post_alter = "";
  var post_caption = "";

  //Output Data
  var output_post_data = { base64_img: "" , image_title: "", image_description : "", image_alter : "" , image_caption : ""};


  //Init Functionality
  this.init_post_creator = function () {
    init_triggers();
  }
    var init_triggers = function () {
    $('div.base64_trigger_div').on('image_processed',process_complete)
  }
  //when user pushes confirm button
  this.confirm_post = function () {
    get_data();
    if (!check_user_input()) {
      console.log("fail");
      return 0;

    }

    process_data();
    //console.log("Im here");
  }



  var get_data = function () {
    post_title = $('#Post_Title').val();
    post_description = $('#Post_Description').val();
    post_image = IPRE.return_file_name();
    post_alter =  $('#Post_Alter').val();
    post_caption =  $('#Post_Caption').val();
    //console.log(post_image);

  }
  //check lenngth of input fields
  var check_user_input = function () {
    if (post_title.length >= min_post_title_length) {
      //console.log("Title okay");
    }
    else {
      alert('Title  has to be at least ' +  min_post_title_length + ' signs long'  );
      return 0 ;
    }
    if (post_description.length >= min_post_description_length) {
      //console.log("Description okay");
    }
    else {
      alert('Description  has to be at least ' +  min_post_description_length + ' signs long'  );
      return 0 ;
    }

    if (post_image.length >= 0) {
      //console.log("Description okay");
    }
    else {
      alert('Select Picture');
      return 0 ;
    }
    return 1;

  }
  var process_data = function () {
    var temp_img_data = "";
    output_post_data.image_title = post_title;
    output_post_data.base64_img = IPRE.return_file_data();
    output_post_data.image_description = post_description;
    output_post_data.image_caption = post_caption;
    output_post_data.image_alter = post_alter;

    trigger_data_to_communication();

    //console.log(output_post_data);
  }

  //Image Processor return base 64 complete
  var process_complete = function (e,data) {
    console.log("complete");
    output_post_data.base64_img = data;
    output_post_data.image_title = new Date().getTime();


    console.log(output_post_data);
  }
  var trigger_data_to_communication = function () {
    $('div.Communication_Data_Div').trigger('upload_new_media',output_post_data);
  }


}
