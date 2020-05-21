user_data ={
  "term_id" : 57,
  "user_id" : 7,
  "vendor_id": 7,
}

communication_data = {
  "last_sucess_order_update" : "",
  "last_fail_order_update" : "",

  "last_sucess_product_update" : "",
  "last_fail_product_update" : "",
  //Order_Update Frequency in seconds
  "order_update_frequency" : 600,

  "all_vendor_product" : "",
  "all_vendor_product_last_sucess" : "",
  "all_vendor_product_last_fail" : "",

  "all_vendor_order" : "",
  "all_vendor_order_last_sucess" : "",
  "all_vendor_order_last_fail" : "",

  "all_vendor_info" : "",
  "all_vendor_info_last_sucess" : "",
  "all_vendor_info_last_fail" : "",

}

ajax_data = {
  "ajax_url" : "http://helmanito.space/wp-admin/admin-ajax.php",
  "ajax_update_actions" : ["All_Order_Request", "All_Product_Request","User_Info_Request","Set_Order_State_Request","Upload_New_Image"],
}
