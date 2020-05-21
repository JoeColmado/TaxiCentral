function Geo_Map() {

  var trigger_div = 'Geo_Map_Trigger_Div';

  var create_trigger_div = function () {
    $('div.Geo_Map_Trigger_Div').remove();
    $('body').append($('<div>',{
      class: "Geo_Map_Trigger_Div",
      style: "display: none"
    }));
  }
  var enable_extern_triggers = function () {
    $('div.' + trigger_div).on('display_map_mode',display_map_mode);

    $('div.' + trigger_div).on('set_driver_data',set_driver_data);
    $('div.' + trigger_div).on('focus_on_driver',focus_on_driver);

  }


  var main_map = false;
  var home_icon;
  var color_icons = new Array();

  //States of Map
  var actual_zoom = false;
  var actual_center = false;

  //Data of Map
  var Driver_Data = '';
  var Driver_Markers = new Array();
  var Driver_Paths = new Array();

  //Array to find out which driver to display
  var Driver_Display = false;

  var focused_driver_index = 0 ;
  var drawn_path;
  var Arrow_Path;

  this.init_geo_map = function () {
    create_trigger_div();
    enable_extern_triggers();
    Add_Calculate_Distance_Method_To_Polyline();
  }
  function Add_Calculate_Distance_Method_To_Polyline() {
    L.Polyline = L.Polyline.include({
    getDistance: function(system) {
        // distance in meters
        var mDistanse = 0,
            length = this._latlngs.length;
        for (var i = 1; i < length; i++) {
            mDistanse += this._latlngs[i].distanceTo(this._latlngs[i - 1]);
        }
        // optional
        if (system === 'imperial') {
            return mDistanse / 1609.34;
        } else {
            return mDistanse / 1000;
        }
      }
    });
  }

  var define_Marker = function () {

    home_icon = L.icon({
    iconUrl: 'img/Home.png',
    iconSize: [50, 50],
    iconAnchor: [50, 25],
    popupAnchor: [-3, -76],

    });

    for (var i = 0; i < Driver_Data.length; i++) {
      color_icons[i] =  L.icon({
      iconUrl:  GLOBAL_LOCAL_IMAGE_STORAGE.get_image_data_from_url(Driver_Data[i].user_profile_image),
      //iconUrl: 'leaflet/images/' + color_icons_url_names[i] ,
      shadowUrl: 'leaflet/images/marker-shadow.png',
      iconSize: [75, 75],
      iconAnchor: [37.5, 37.5],
      });
    }


  }
  var set_driver_data =function (e,data) {
    //Comparison of Data as Strings
    //Refresh only if data is new
    const actual_data = JSON.stringify(Driver_Data);
    if (actual_data == data) {
      //console.log('same');
    }
    //Different Data
    else {

      Driver_Data = JSON.parse(data);
      //Update_Screen // TODO:
      if (main_map) {

      refresh_Markers();
      return_path(focused_driver_index);
      //if (focused_driver_index) {
      //}
    }
      //console.log('different');
    }
    //console.log(Driver_Data);
  }

  function refresh_Paths() {
    for (var i = 0; i < Driver_Markers.length; i++) {
      redraw_path(i);
    }
  }

  function refresh_Markers () {
    for (var i = 0; i < Driver_Markers.length; i++) {
      Driver_Markers[i].setLatLng([Driver_Data[i].user_position.lat,Driver_Data[i].user_position.long]);
    }

  }

  function create_pop_up_content(index) {
    const profile_image = GLOBAL_LOCAL_IMAGE_STORAGE.get_image_data_from_url(Driver_Data[index].user_profile_image);
    const profile_user_name  = Driver_Data[index].user_nicename;
    const wrap_div = 'div.Driver_Popup_Div';
    const wrap_div_class= 'Driver_Popup_Div';
    var temp_content;

    $(wrap_div).remove();
    $('body').append($('<div>',{
       class: wrap_div_class + ' w3-theme-d4 w3-center'  ,
    }))
    $(wrap_div).append($('<img>',{
      src: profile_image,
      class: 'w3-circle w3-margin Pop_Up_Driver_To_Profile_Link',
      style: 'width: 75px',
      button_index: index,
    }))
    $(wrap_div).append($('<br>'));

    $(wrap_div).append($('<a>',{
      html: profile_user_name,
    }))


    temp_content = $(wrap_div).clone().wrap('<div>').parent().html();

    $(wrap_div).remove();




    return temp_content;

  }
  function enable_popup_gui_handlers() {
    $('.Pop_Up_Driver_To_Profile_Link').off('click');
    $('.Pop_Up_Driver_To_Profile_Link').on('click',function (e) {
      $('div.Main_Menu_Trigger_Div').trigger('set_main_menu_mode',DRIVER_MAIN_MENU_MODE);
      const driver_index = e.target.getAttribute('button_index');
      //Display the Profile Of Indexed Driver
      $('div.Driver_Trigger_Div').trigger('display_driver_profile',driver_index)
    });


  }


//Draw Poly line of position history
  function draw_path(index) {
    var temp_latlng = {};
    var temp_latlngs = new Array();
    var temp_position_history = Driver_Data[index].user_position_history;
    for (var i = 0; i < temp_position_history.length; i++) {
      temp_latlng = {lat: "", lng:""};
      temp_latlng.lat = temp_position_history[i].lat;
      temp_latlng.lng = temp_position_history[i].long;
      temp_latlngs.push(temp_latlng);
    }
    Driver_Paths[index] = L.polyline(temp_latlngs, {color: color_array[index]});
    //console.log(polyline);
    //Driver_Paths[index].addTo(main_map);
  }
  function redraw_path(index) {
    //console.log('redraw_path');
    var temp_latlng = {};
    var temp_latlngs = new Array();
    console.log(index);
    var temp_position_history = Driver_Data[index].user_position_history;
    for (var i = 0; i < temp_position_history.length; i++) {
      temp_latlng = {lat: "", lng:""};
      temp_latlng.lat = temp_position_history[i].lat;
      temp_latlng.lng = temp_position_history[i].long;
      temp_latlngs.push(temp_latlng);
    }
    //Driver_Paths[index].setLatLngs(temp_latlngs);

      drawn_path.setLatLngs(temp_latlngs);

  }

  //Draw Markers of last_position
  function create_driver_markers () {
    //console.log(Driver_Data);
    for (var i = 0; i < Driver_Data.length; i++) {
      Driver_Markers[i] =  L.marker( [Driver_Data[i].user_position.lat,Driver_Data[i].user_position.long],{
        icon: color_icons[i],
        button_index: i,
      })
      Driver_Markers[i].bindPopup(create_pop_up_content(i));
      Driver_Markers[i].on('click', function (e) {
        var marker_index = e.target.options.button_index;
        focus_on_driver('e', marker_index );
      });
      Driver_Markers[i].on('popupopen ', function (e) {
        $('a.leaflet-popup-close-button').css('color','white')
        enable_popup_gui_handlers();
      });

      Driver_Markers[i].addTo(main_map);
      $(Driver_Markers[i]._icon).addClass('selectedMarker_' + i);

    }//For Loop over Drivers_Markers

  }

  //Delete Drawn Path and create new one
  function return_path(index) {
    //Delete Path
    if (drawn_path) {
      drawn_path.remove();
    }
    //Delete Arrow
    if (Arrow_Path) {
      Arrow_Path.remove();
    }
    var temp_latlng = {};
    var temp_latlngs = new Array();
    var new_path;
    var temp_position_history = Driver_Data[index].user_position_history;
    for (var i = 0; i < temp_position_history.length; i++) {
      temp_latlng = {lat: "", lng:""};
      temp_latlng.lat = temp_position_history[i].lat;
      temp_latlng.lng = temp_position_history[i].long;
      //temp_latlng = new Array();
      //temp_latlng = [parseFloat(temp_position_history[i].lat),parseFloat(temp_position_history[i].long)];
      temp_latlngs.push(temp_latlng);
    }
    //console.log(temp_latlngs);
    new_path = L.polyline(temp_latlngs, {color:'black'}).addTo(main_map);
    //new_path = L.polyline(temp_latlngs, {}).addTo(main_map);
    Arrow_Path = L.polylineDecorator(new_path, {
      patterns: [
        {offset: '0%', repeat: '30px' , symbol: L.Symbol.arrowHead({pixelSize: 7, polygon: false, pathOptions: {stroke: true}})}
      ]
    }).addTo(main_map);
    /*
    */
    drawn_path = new_path;

    //Driver_Paths[index].addTo(main_map);
    //return new_path;
  }

  function focus_on_driver(e,index) {

    //hide_all_drivers_paths();
    main_map.flyTo([Driver_Data[index].user_position.lat, Driver_Data[index].user_position.long],11);
    Driver_Display[index] = true;
    return_path(index);


    $('div.Geo_Map_Control_Trigger_Div').trigger('set_driver_index',index)
    //Driver_Markers[index].openPopup()



  //  main_map.setMinZoom();
  }
  function create_map () {
    const options ={
      maxBoundsViscosity: '1',
      zoom: '9',
      minZoom: '9',
      center: [18.698383, -69],
      maxBounds: [[19.88555748013722, -71.60339355468751],[17.361124500056253, -67.62084960937501]]
    }
    main_map = L.map('Main_Map',options);

    //lat: 19.88555748013722, lng: -71.60339355468751
    // lat: 17.361124500056253, lng: -67.62084960937501
    L.tileLayer('Atlas/Small_Dominicana/{z}/{x}/{y}.png',{ maxZoom: 11, minZoom: 8  }).addTo(main_map);
    create_driver_markers();
  }
  function save_load_set_map_state() {
    //Get Center and Zoom of Map
    main_map.on("moveend", function () {
      actual_zoom = main_map.getZoom();
      actual_center = main_map.getCenter();
    });

    if (actual_zoom && actual_center ) {
      main_map.setView(actual_center,actual_zoom);
      actual_zoom = false;
    }

  }
  function display_map_mode (e,frame) {
    define_Marker();
    $(GLOBAL_MAIN_FRAME).html('');
    $('#Main_Map').remove();
    $(GLOBAL_MAIN_FRAME).append($('<div>',{
      id: 'Main_Map',
      style: ' margin: 1%; box-sizing: border-box; height: 90%; width: 100%; z-index: 2; ',
    }));


    $('div.Geo_Map_Control_Trigger_Div').trigger('display_controls',GLOBAL_MAIN_FRAME);
    create_map();
    $('img.leaflet-marker-icon').addClass('w3-circle w3-opacity ');

    save_load_set_map_state();
    $('div.Geo_Map_Control_Trigger_Div').trigger('set_driver_index',focused_driver_index);
    focus_on_driver('e',focused_driver_index);

    //console.log(main_map);
  }

}
