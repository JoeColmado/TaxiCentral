function Image_Preview() {

  var image_name  ="";
  var image_data = "";

  this.init_image_preview = function () {
    //React on Change in Input field
    $('#Post_Image').on('change',function (e) {
      file = this.files[0];
      image_name = this.files[0].name;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      //Loading
      $('div.Loader_Trigger_Div').trigger('App_Loading');
      reader.onloadend = function (e) {
        image_data =  reader.result;
        display_image();
        $('div.Loader_Trigger_Div').trigger('App_Ready');
        }//onloadend
      });//onchange
    }
    var display_image = function () {
      $('img.temp_post_image').remove();
      $('div.temp_post_image_div').append($('<img>',{
        src: image_data,
        alt: 'file: ' + image_data,
        style: 'width: 100%; ',
        class: "temp_post_image",
        id: "temp_post_image",
        onload: 'IPRE.image_valide()',
        onerror: 'IPRE.image_fail()'
      }));
    }


    this.image_valide = function () {
      console.log("Image is valid");
    }
    this.image_fail = function () {
      file_name = null;
      console.log("Image fail");
    }

    this.return_file_name = function () {
      return image_name;
    }
    this.return_file_data = function () {
      return image_data;
    }

  }
