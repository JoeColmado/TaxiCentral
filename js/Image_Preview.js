function Image_Preview() {

  var image_name  ="";
  var image_data = "";
  var image_type = "";

  var trigger_div = 'Image_Preview_Trigger_Div';

  this.init_image_preview = function () {
    create_trigger_div ();
    enable_trigger_events();

  }

  function create_trigger_div () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }

  function enable_trigger_events () {
    $('div.' + trigger_div).on('new_input_file_set', new_input_file_set_handler);
  }

  function new_input_file_set_handler(e,data) {
    const input_field = $('#' + data.input_id )[0];
    const file =  input_field.files[0];
    image_name  = file.name;
    image_type =  file.type;
    console.log(file.size/1024/1024 + 'MB');

    var reader = new FileReader();
    reader.readAsDataURL(file);
    //Loading
    $('div.Loader_Trigger_Div').trigger('App_Loading');
    //File Reader Success Fail?????
    reader.onloadend = function (e) {
      $('div.Loader_Trigger_Div').trigger('App_Ready');
      //console.log(reader.result);
      image_data =  reader.result;
      display_image(data.trigger_frame, data.preview_frame );
    }
  }

  // Danger triggerframe => class name preview_frame =>id

    var display_image = function (trigger_frame,preview_frame) {
      $('img.temp_post_image').remove();
      $(preview_frame).append($('<img>',{
        src: image_data,
        alt: 'file: ' + 'image_data',
        style: 'width: 100%; height:100%; display:none ',
        class: "temp_post_image",
        id: "temp_post_image",
        //onload: 'IPRE.image_valide()',
        //onerror: 'IPRE.image_fail()'
      }));
      //console.log($('#temp_post_image'));
      $('#temp_post_image').off('error');
      $('#temp_post_image').on('error', function () {
        $('div.' + trigger_frame).trigger('invalid_picture_selected');
      });

      $('#temp_post_image').off('load');
      $('#temp_post_image').on('load', function () {
        $('div.' + trigger_frame).trigger('valid_picture_selected',{
          base64_img: image_data,
          image_name: image_name,
          image_type: image_type,
          description: 'default',
          caption: 'default',
          alter: 'default'

        })
        $('img.temp_post_image').remove();
      })


      /*
      $('#temp_post_image').error(function () {
        console.log("Image Not  valid");
      })
      */
    }



  }
