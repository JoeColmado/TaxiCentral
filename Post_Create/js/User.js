function User() {
  var user_name = "";
  var user_pass = "";

  this.init_user = function () {
  }

  this.log_in = function () {
    get_user_data();
    //console.log(Base64.encode(user_pass));
    send_data_to_communication();

  }
  var get_user_data = function () {
    user_name  = $('#User_Name').val();
    user_pass  = $('#User_Pass').val();
  }

  var send_data_to_communication = function () {
      $('div.Communication_Data_Div').trigger("authentication",{user_name: user_name, user_pass: user_pass });
  }

}
