function Image_Processor() {

  //Input Data
  var image_src = "";

  //Outputdata
  var base64_data = "";

  this.src_to_base64 = function (image_source) {
    image_src = image_source;
    console.log(image_src);
    //src_to_img();
    base64_data = image_to_base64();
    //data get triggered back

  }

  var src_to_img = function () {
    $('img.temp_post_image').remove();
    $('div.temp_post_image_div').append($('<img>',{
      src: image_src,
      alt: image_src,
      style: 'width: 100%;',
      class: "temp_post_image",
      id: "temp_post_image",
      onload: 'IP.process_complete()'
    }));
  }

  this.process_complete = function () {
    image_to_base64();

    //different_base_64_converter("Profile_Icon.png");
  //  console.log(base64_data);
    trigger_complete_data()
  }

  var different_base_64_converter = function(URL) {
        //var canvas  = new fabric.Canvas('c');
        var img = new Image();
        img.onload = function() {
            var canvas1 = document.createElement("canvas");
            canvas1.width = this.width;
            canvas1.height = this.height;
            var ctx = canvas1.getContext('2d');
            ctx.drawImage(this, 0, 0);
            var dataURL = canvas1.toDataURL({format: "png"});
        };
        img.src = URL;
    }


  var image_to_base64 = function() {
     var img = document.getElementById('temp_post_image');
     img.setAttribute('crossOrigin', 'anonymous');
     var canvas = document.createElement("canvas");
     canvas.width = img.width;
     canvas.height = img.height;
     // Copy the image contents to the canvas
     var ctx = canvas.getContext("2d");
     ctx.drawImage(img, 0, 0);

     var dataURL = canvas.toDataURL("image/png");
     base64_data =  dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
     trigger_complete_data();

   }

   var trigger_complete_data = function () {
     $('div.base64_trigger_div').trigger('image_processed',base64_data)
   }



}
