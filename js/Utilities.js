Utilities = {

  Time_Difference : function (Order_Time) {
      var Time = new Date();
      //var Order_Time = new Date(past_time_string);
      //get milliseconds from 1970
      //var Actual_Offset = Time.getTimezoneOffset() * 60 *1000;
      //var Actual_Time = Time.getTime() + Actual_Offset;
      //Order_Time = Order_Time.getTime();
      //Time Difference in seconds
      var Diff = (Time - Order_Time)/1000;
      //console.log(Diff);
      var return_string
      if (Diff < 60) {
        return_string =  Diff + " seconds"
      }
      else if ((Diff >= 60) && (Diff < 60*60) ) {
        return_string =  Math.round(Diff/60) + " min";
      }
      else if ( (Diff >= 60*60) &&  (Diff < 60*60*24)) {
        return_string =  Math.round(Diff/60/60) + " h";
      }
      else if (Diff > 60*60*24) {
        return_string =  Math.round(Diff/60/60/24) + " days";
      }
      else {
        return_string = "-";
      }
      //(console.log(return_string);
      return return_string;
    },
  setDefaultValue:  function(arg, value) {
      return arg === undefined ? value : arg;
    }
}
