function Grid_View(id ) {

            var content = new Array();
            var amount_of_rows = 2;
            var amount_of_cells_per_row = 3;
            var index  = 0;

            var set_row_cell = function (row_cell) {
              amount_of_cells_per_row = row_cell[0];
              amount_of_rows = row_cell[1];
              //console.log("amount_of_rows" + amount_of_rows);
            }

            var additional_class = Math.round(12/amount_of_cells_per_row);
              additional_class = "s" + additional_class;
              //console.log(additional_class);

            var prepare_main_frame = function (parent_frame ) {
              //console.log("prepare");
                $('#' + parent_frame).append($('<div>',{
                class: ' Main_Grid_Frame' + id ,
              }));
              index = 0;
              for (var i = 0; i < amount_of_rows; i++) {
                $('div.Main_Grid_Frame' + id).append($('<div>',{
                  class: 'w3-row  Main_Frame_Row Main_Frame_Row_' +id + i,
                  style: 'width: 100%',
                }));

                for (var j = 0; j < amount_of_cells_per_row; j++) {
                  $('div.Main_Frame_Row_' +id + i).append($('<div>',{
                    class: 's' + Math.round(12/amount_of_cells_per_row) + '  w3-center w3-col   Main_Frame_Col Main_Frame_Col_' + id + index,

                  }));
                  index++;
                }//amount cells
              }//amount_Rows
            }//prepare_main_frame
              var set_content = function () {

                for (var i = 0; i < content.length; i++) {
                  $('div.Main_Frame_Col_' + id + i ).append($('<div>',{
                    class: '',
                    html: content[i],
                  }));
                }
                /*
                */
              }
                var prepare_content = function (parent_frame,content_input) {
                  content  = new Array();
                  $('#' + parent_frame).append($('<div>',{
                    class: 'hidden_content_main_nav_' + id,
                  }))

                  for (var i = 0; i < content_input.length; i++) {
                    $('div.hidden_content_main_nav_' + id).append($('<div>',{
                      class: ' Main_Nav_Symbol Main_Nav_Symbol_' + i,
                      html: content_input[i],
                    }))
                    var temp_content = $('div.hidden_content_main_nav_' +id).clone().wrap('<div>').parent().html();
                    content.push(temp_content);
                    $('div.hidden_content_main_nav_' + id).html('');
                  }
                  $('div.hidden_content_main_nav_' + id).remove();

                  //console.log(content);
                }


              this.Cell_Click_Handler = function (index) {
                $(parent_frame).trigger('main_nav_set_modus',index);
              }
              this.display_main_navigation = function (parent_frame , content , row_cell ) {
                set_row_cell(row_cell);
                prepare_main_frame(parent_frame);
                prepare_content(parent_frame,content);
                set_content();
              }
              //this.display_main_navigation();
          }
