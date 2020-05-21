function Local_Image_Storage() {

  var trigger_div = 'Local_Image_Storage_Trigger_Div';

  const Storage_Key = 'Local_Storage_Image_List';
  var Image_List = new Array();
  const Image_Stored_Dimension = 150;

  this.init_local_image_storage = function () {
    create_trigger_div();
    enable_trigger_events();

  }

  this.get_image_data_from_url  = function(url) {
    var Storage_List = get_image_list();
    var temp_image_list = new Array();

    //Case No Image List saved
    if (!Storage_List) {
      //console.log('empty');
      temp_image_list.push(url);
      //// TODO: Check if Local storage succesful
      store_image_data(url);
      set_image_list(temp_image_list);
      return url;
    }
    //Case Image List found
    else {
      // console.log('none empty');
      temp_image_list = Storage_List;
      //Case Item  not found in list
      if (temp_image_list.indexOf(url) == -1) {
        // console.log('new element');
        temp_image_list.push(url);
        temp_image_list = JSON.stringify(temp_image_list);
        localStorage.setItem(Storage_Key,temp_image_list);
        store_image_data(url)
        return url;
      }
      //case item found
      else {
        return  localStorage.getItem(url);
      }
    }
  }



  function enable_trigger_events () {
    $('div.' + trigger_div).on('get_image_from_url', get_image_from_url);
    $('div.' + trigger_div).on('remove_all_images', remove_all_images);
    $('div.' + trigger_div).on('show_image_list', show_image_list);
  }
  function create_trigger_div () {
    $('div.' + trigger_div ).remove();
    $('body').append($('<div>',{
      class: trigger_div,
    }));
  }

  function get_image_list() {
    return JSON.parse(localStorage.getItem(Storage_Key));
  }
  function set_image_list(image_array) {
    localStorage.setItem(Storage_Key,JSON.stringify(image_array));
  }

  function get_image_from_url (e,data) {
    var Storage_List = get_image_list();
    var temp_image_list = new Array();

    //Case No Image List saved
    if (!Storage_List) {
      console.log('empty');
      temp_image_list.push(data.url);
      set_image_list(temp_image_list);
      store_image_data(data.url)
    }
    //Case Image List found
    else {
      console.log('none empty');
      temp_image_list = Storage_List;
      //Case Item  not found in list
      if (temp_image_list.indexOf(data.url) == -1) {
        console.log('new element');
        temp_image_list.push(data.url);
        temp_image_list = JSON.stringify(temp_image_list);
        localStorage.setItem(Storage_Key,temp_image_list);
        store_image_data(data.url)

      }
      //case item found
      else {
        console.log('known element');
      }
    }

  }

  //Display
  function create_image_list() {
    var frame = 'div.temp_image_list';
    var temp_image_list = new Array();

    temp_image_list = get_image_list();
    if (temp_image_list == null || temp_image_list.length == 0 ) {
      return 'no elements found'
    }

    $(frame).remove();
    $('body').append($('<div>',{
      id: temp_image_list,
      class: 'temp_image_list'
    }))

    for (var i = 0; i < temp_image_list.length; i++) {

      $(frame).append($('<img>',{
        src: get_stored_image(temp_image_list[i]),
        style: 'height:75px; width: 75px',
        class: 'w3-circle w3-margin '
      }))

      $(frame).append($('<button>',{
        html: 'delete',
        class: 'delete_single_image_button w3-margin ',
        button_index: i,
      }))
      $(frame).append($('<br>'));
    }

    var temp_content =  $(frame).clone().wrap('<div>').parent().html();
    //console.log(temp_content);
    $(frame).remove();
    return   temp_content ;
  }
  function update_image_list() {
    $('div.Local_Image_Storage_Trigger_Div').trigger('show_image_list',{
      Frame_Id : 'Local_Storage_Image_List_div',
    });
  }
  function show_image_list(e,data) {

    $(GLOBAL_MAIN_FRAME).html(create_image_list());
    $('button.delete_single_image_button').off('click');

    $('button.delete_single_image_button').on('click',function (e) {
      //get Index of clicked button
      var index = e.target.getAttribute('button_index');
      remove_one_image(index);
    });
  }


  function remove_one_image(index) {
    //console.log(index);
    var temp_image_list = get_image_list();
    remove_image_data(temp_image_list[index]);
    temp_image_list.splice(index,1);
    set_image_list(temp_image_list);
    console.log(temp_image_list);
    update_image_list();
  }
  function remove_all_images () {
    var temp_image_list = get_image_list();
    if (temp_image_list && temp_image_list.length >= 1  ) {
      for (var i = 0; i < temp_image_list.length; i++) {
        remove_image_data(temp_image_list[i]);
      }
    }
    console.log('remove all');
    localStorage.removeItem(Storage_Key);
    update_image_list();
  }


  function get_stored_image(url) {
    return localStorage.getItem(url);
  }
  function store_image_data(url) {

    var img = new Image(Image_Stored_Dimension,Image_Stored_Dimension);
    var img_data;
    var file_ending = url.split('.').pop();
    //console.log(file_ending);
    img.crossOrigin = 'Anonymous';
    img.onload  = function () {
      var canvas = document.createElement("canvas");
      //canvas.width = '150';
      //canvas.height = '150px';

      canvas.width = img.width;
      canvas.height = img.height;
      // Copy the image contents to the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0,Image_Stored_Dimension,Image_Stored_Dimension);
      var dataURL = canvas.toDataURL("image/" + file_ending );
      img_data  = dataURL;
      console.log(img_data.length);
      //img_data =  dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      localStorage.setItem(url,img_data);
    }
    img.src = url;

  }
  function remove_image_data(url) {
    localStorage.removeItem(url);
  }


}
