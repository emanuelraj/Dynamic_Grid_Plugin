 $.fn.dynamicGrid = function(parameters) {
     this.parent().append('<table id="' + this.attr("id") + '" class="wizard-table"></table>');
     //this = this.siblings();
     var deletedIds = [];
     var duplicateValues = [];
     var tableElement = this.siblings();
     this.remove();
     var tableHeader = '<thead><tr class="wizard-table-header table-row-custom">' +
         '<input type="hidden" class="deleted-id"/>';
     if (parameters.index_label) {
         tableHeader += '<td width="60px" class="dynamic-table-cells-border slno"><label>' + parameters.index_label + '</label></td>';
     }
     for (i = 0; i < parameters.cols.length; i++) {
         if (parameters.cols[i].type != "hidden") {
             if (parameters.cols[i].column_override) {
                 tableHeader += '<td data-override="' + parameters.cols[i].column_override + '" class="dynamic-table-cells-border" width="' + parameters.cols[i].width + 'px"><label>' + parameters.cols[i].label + '</label></td>';
             } else {
                 if (parameters.cols[i].required) {
                     tableHeader += '<td class="dynamic-table-cells-border" width="' + parameters.cols[i].width + 'px"><label>' + parameters.cols[i].label + '<span class="is-reqd">*</span></label></td>';
                 } else if (parameters.cols[i].atleastOne) {
                     tableHeader += '<td class="dynamic-table-cells-border" width="' + parameters.cols[i].width + 'px"><label>' + parameters.cols[i].label + '<span class="atleast-one">*</span></label></td>';
                 } else {
                     tableHeader += '<td class="dynamic-table-cells-border" width="' + parameters.cols[i].width + 'px"><label>' + parameters.cols[i].label + '</label></td>';
                 }

             }
         }
     }
     if (parameters.actions) {
         tableHeader += '<td class="dynamic-table-cells-border" width="93px"><label>Delete</label></td>';
     }
     tableHeader += '</tr></thead>';
     tableElement.append(tableHeader);
     tableElement.append('<tbody></tbody>');
     if (parameters.draggable == 'true') {
         tableElement.find('tbody').sortable({
             start: function(event, ui) {
                 ui.item.startPos = ui.item.index();
             },
             stop: function(event, ui) {
                 console.log("Start position: " + ui.item.startPos);
                 console.log("New position: " + ui.item.index());
                 $(this).find('tr td.senior-index').each(function(index) {
                     $(this).text(index + 1);
                 }); 
             }
         });
     }

     if (parameters.data) {
         console.log(parameters.data);
         for (i = 0; i < parameters.data.length; i++) {
             var rowIndex = i + 1;
             var newRow = '<tr id="' + tableElement.attr('id') + '-row-' + rowIndex + '" class="table-row-custom ui-sortable-handle">' +
                 '<input type="hidden" class="inserted-id" value="' + parameters.data[i].id + '"/>';
             if (parameters.index_label) {
                 newRow += '<td class="senior-index">' + rowIndex + '</td>';
             }
             for (j = 0; j < parameters.cols.length; j++) {
                 var label = parameters.cols[j].value;
                 if(parameters.cols[j].no_duplicate == true){
                     newRow += '<td width="' + parameters.cols[j].width + 'px" class="' + parameters.cols[j].type + '-dynamic-grid ' + parameters.cols[j].type + '-dynamic-grid-' + parameters.cols[j].label + ' column-editable dynamic-table-cells-border padd-lft check-duplicate">';
                 }else{
                     newRow += '<td width="' + parameters.cols[j].width + 'px" class="' + parameters.cols[j].type + '-dynamic-grid ' + parameters.cols[j].type + '-dynamic-grid-' + parameters.cols[j].label + ' column-editable dynamic-table-cells-border padd-lft">';
                 }
                 //newRow += '<td width="' + parameters.cols[j].width + 'px" class="' + parameters.cols[j].type + '-dynamic-grid ' + parameters.cols[j].type + '-dynamic-grid-' + parameters.cols[j].label + ' column-editable dynamic-table-cells-border padd-lft">';
                 if (parameters.cols[j].type == "checkbox") {
                     if (parameters.data[i][label] == true) {
                         if(parameters.cols[j].prop == "disabled"){
                             newRow += '<input class="styled-checkbox editableColumnsStyle" id="' + parameters.cols[j].label + rowIndex + '" type="checkbox" name="' + parameters.cols[i].value + '" value="' + parameters.data[i][label] + '" checked disabled><label for="' + parameters.cols[j].label+ rowIndex + '">&nbsp;</label>'
                         }else{
                             newRow += '<input class="styled-checkbox editableColumnsStyle" id="' + parameters.cols[j].label + rowIndex + '" type="checkbox" name="' + parameters.cols[i].value + '" value="' + parameters.data[i][label] + '" checked><label for="' + parameters.cols[j].label+ rowIndex + '">&nbsp;</label>'
                         }
                          
                         //newRow += '<input class="editableColumnsStyle" type="checkbox" name="' + parameters.cols[i].value + '" value="' + parameters.data[i][label] + '" checked/>';
                     } else {
                         if(parameters.cols[j].prop == "disabled"){
                         	newRow += '<input class="styled-checkbox editableColumnsStyle" id="' + parameters.cols[j].label + rowIndex + '" type="checkbox" name="' + parameters.cols[i].value + '" value="' + parameters.data[i][label] + '" disabled><label for="' + parameters.cols[j].label+ rowIndex + '">&nbsp;</label>'
                         }else{
                             newRow += '<input class="styled-checkbox editableColumnsStyle" id="' + parameters.cols[j].label + rowIndex + '" type="checkbox" name="' + parameters.cols[i].value + '" value="' + parameters.data[i][label] + '"><label for="' + parameters.cols[j].label+ rowIndex + '">&nbsp;</label>'
                         }   
                         //newRow += '<input class="editableColumnsStyle" type="checkbox" name="' + parameters.cols[i].value + '" value="' + parameters.data[i][label] + '"/>';
                     }

                 } else if (parameters.cols[j].type == "dob") {
                     var newDate = "";
                     console.log(parameters.data[i]);
                     if (parameters.data[i][label] && parameters.data[i][label] != " ") {
                         date = new Date(parameters.data[i][label]);
                         var year = date.getFullYear();
                         var month = (1 + date.getMonth()).toString();
                         month = month.length > 1 ? month : '0' + month;
                         var day = date.getDate().toString();
                         day = day.length > 1 ? day : '0' + day;
                         newDate = month + "/" + day + "/" + year;
                     } else {
                         newDate = '';
                     }
                     newRow += '<i class="fa fa-calendar"></i><span class="date-val">' + newDate + '</span>';
                 } else if (parameters.cols[j].type == "phone-type") {
                     var phone = parameters.data[i][label].split(" ");
                     var phone_number = phone[0];
                     var phone_type = phone[1];
                     newRow += '<span class="entered-phone-number">' + phone_number + '</span> <span class="entered-phone-type">' + phone_type.substr(0, 1).toUpperCase() + phone_type.substr(1) + '</span>'
                 } else {
                     newRow += parameters.data[i][label];
                 }
                 newRow += '</td>';
             }
             if (parameters.actions) {
                 newRow += '<td><i class="fa fa-trash-o" id="senior-del-' + rowIndex + '" aria-hidden="true"></i></td>';
             }
             newRow += '</tr>';
             $('#' + tableElement.attr('id') + ' tbody').append(newRow);
             $('#' + tableElement.attr('id') + ' tbody').find(".table-datepicker").datepicker({
                 maxDate: new Date(),
                 changeMonth: true,
                 changeYear: true,
                 yearRange: "-100:+30"
             });
             if (parameters.actions) {
                 $('#' + tableElement.attr('id') + ':last tr:last').bind("click", editRow);
                 $('#' + tableElement.attr('id') + ':last tr:last td i.fa-trash-o').bind("click", deleteRow);
             }
         }
     }
     if(typeof parameters.label != 'undefined'){
         tableElement.parent().append('<a class="add-link">' + parameters.label + '</a>');
         tableElement.parent().find('a').bind("click", addNewRow);
     }
     //this.css( "color", "green" );

     function addNewRow() {
         //(tableElement, parameters.cols)
         //console.log(parameters.cols);
         //console.log("Add New Row");
         var rowIndex = tableElement.find('tr').length;
         if (rowIndex == 0) {
             rowIndex = 1;
         }
         //console.log(tableElement.attr('id'));
         if ($('#' + tableElement.attr('id') + ' tr').find('td.column-editable input.duplicate-error').length > 0) {
             var markup = 'Please Check for Duplicate Errors.';
             var title = 'Warning';
             var page = '';
             dynamicAlert(title, markup, page);
             return null;
         }
         
         if ($('#' + tableElement.attr('id') + ' tr').find('input.table-text-validation.required-field').length > 0) {
             var p = $('#' + tableElement.attr('id') + ' tr').find('input.table-text-validation.required-field').val();
             if (p == '') {
                 var markup = 'Name cannot be empty.';
                 var title = 'Warning';
                 var page = '';
                 dynamicAlert(title, markup, page);
                 $('#' + tableElement.attr('id') + ' tr').find('input.table-text-validation.required-field').addClass("errorClass");
                 isValid = false;
                 
                 return null;
             }
         }
         
         if ($('#' + tableElement.attr('id') + ' tr').find('input.table-email-validation.required-field').length > 0) {
             if ($('#' + tableElement.attr('id') + ' tr').find('input.table-email-validation.required-field').val() == '') {
                 var markup = 'Email cannot be empty.';
                 var title = 'Warning';
                 var page = '';
                 dynamicAlert(title, markup, page);
                 $('#' + tableElement.attr('id') + ' tr').find('input.table-email-validation.required-field').addClass("errorClass");
                 isValid = false;
                 
                 return null;
             }
             if (!validateEmail($('#' + tableElement.attr('id') + ' tr').find('input.table-email-validation.required-field').val())) {
                 var markup = 'Not a valid email address.';
                 var title = 'Warning';
                 var page = '';
                 dynamicAlert(title, markup, page);
                 $('#' + tableElement.attr('id') + ' tr').find('input.table-email-validation.required-field').addClass("errorClass");
                 isValid = false;
                 
                 return null;
             }
         }
         
         if ($('#' + tableElement.attr('id') + ' tr').find('input.table-phone-validation.required-field').length >= 1) {
             if ($('#' + tableElement.attr('id') + ' tr').find('input.table-phone-validation.required-field').val() == '') {
                 $('#' + tableElement.attr('id') + ' tr').find('input.table-phone-validation.required-field').addClass("errorClass");
                 isValid = false;
                 
                 var markup = 'Contact Number cannot be empty.';
                 var title = 'Warning';
                 var page = '';
                 dynamicAlert(title, markup, page);
                 return null;
             }
             
             var p = $('#' + tableElement.attr('id') + ' tr').find('input.table-phone-validation.required-field').val().replace(/[^0-9]/g, '');
             if (p.length != 10) {
                 $('#' + tableElement.attr('id') + ' tr').find('input.table-phone-validation.required-field').addClass("errorClass");
                 isValid = false;
                 
                 var markup = 'Not a valid contact number.';
                 var title = 'Warning';
                 var page = '';
                 dynamicAlert(title, markup, page);
                 return null;
             }
         }
         
         
         
         if ($('#' + tableElement.attr('id') + ' tr').find('div.phone-input input.required-field').length >= 1) {
            // $('#' + tableElement.attr('id') + ' tr').find('td.column-editable.phone-type-dynamic-grid div.phone-input ').each(function() {
                 if ($('#' + tableElement.attr('id') + ' tr').find('input.phone-number-input.required-field').val() == '') {
                     console.log("Phone Number Type Required Check");
                     $('#' + tableElement.attr('id') + ' tr').find('input.phone-number-input.required-field').addClass("errorClass");
                     isValid = false;
                     var markup = 'Contact Number cannot be empty.';
                     var title = 'Warning';
                     var page = '';
                     dynamicAlert(title, markup, page);
                     return null;
                 }
                 
                 var p = $('#' + tableElement.attr('id') + ' tr').find('input.phone-number-input.required-field').val().replace(/[^0-9\.]+/g, '');
                 if (p.length != 10) {
                     $('#' + tableElement.attr('id') + ' tr').find('input.phone-number-input.required-field').addClass("errorClass");
                     isValid = false;
                     var markup = 'Not a valid contact number.';
                     var title = 'Warning';
                     var page = '';
                     dynamicAlert(title, markup, page);
                     return null;
                 }
           //  });
         }

         $('#' + tableElement.attr('id') + ' tr').find('td.column-editable input.table-input-text').each(function(index) {
             var text = $(this).val();
             if($(this).hasClass('required-field')){
                 if($(this).hasClass('check-duplicate')){
             		$(this).parent().text(text).addClass('padd-lft required-field check-duplicate');
                 }else{
                    $(this).parent().text(text).addClass('padd-lft required-field'); 
                 }
             }else{
                if($(this).hasClass('check-duplicate')){
                	$(this).parent().text(text).addClass('padd-lft check-duplicate'); 
                }else{
                    $(this).parent().text(text).addClass('padd-lft'); 
                }
             }
         });
         
         
         
         $('#' + tableElement.attr('id') + ' tr').find('td.column-editable.dob-dynamic-grid input.table-datepicker').each(function() {
             var text = $(this).val();
             if($(this).hasClass('required-field')){
                 if($(this).hasClass('check-duplicate')){
             		$(this).parent().text('').append('<i class="fa fa-calendar"></i><span class="date-val"> ' + text + '</span>').addClass('padd-lft required-field check-duplicate');
                 }else{
                    $(this).parent().text('').append('<i class="fa fa-calendar"></i><span class="date-val"> ' + text + '</span>').addClass('padd-lft required-field'); 
                 }
             }else{
                if($(this).hasClass('check-duplicate')){
                	$(this).parent().text('').append('<i class="fa fa-calendar"></i><span class="date-val"> ' + text + '</span>').addClass('padd-lft check-duplicate'); 
                }else{
                    $(this).parent().text('').append('<i class="fa fa-calendar"></i><span class="date-val"> ' + text + '</span>').addClass('padd-lft');
                }
             }
         });

         $('#' + tableElement.attr('id') + ' tr').find('td.column-editable.select-dynamic-grid select.table-select-option').each(function() {
             var text = $(this).val();
             //$(this).parent().text(text).addClass('padd-lft');
             if($(this).hasClass('required-field')){
                 if($(this).hasClass('check-duplicate')){
             		$(this).parent().text(text).addClass('padd-lft required-field check-duplicate');
                 }else{
                    $(this).parent().text(text).addClass('padd-lft required-field'); 
                 }
             }else{
                if($(this).hasClass('check-duplicate')){
                	$(this).parent().text(text).addClass('padd-lft check-duplicate'); 
                }else{
                    $(this).parent().text(text).addClass('padd-lft'); 
                }
             }
         });


         $('#' + tableElement.attr('id') + ' tr').find('td.column-editable.phone-type-dynamic-grid div.phone-input').each(function() {
             //console.log($(this).find('input.phone-number-input').val());
             var phone_number = $(this).find('input.phone-number-input').val();
             var phone_type = $(this).find('input.type-input').val();
             if (typeof phone_number != 'undefined' && typeof phone_type != 'undefined') {
                 if($(this).find('input.phone-number-input.required-field')){
                     console.log("Required True");
                     if($(this).find('input.phone-number-input.check-duplicate')){
                         console.log("Duplicate True");
                         $(this).parent().text('').append('<span class="entered-phone-number">' + phone_number + '</span> <span class="entered-phone-type">' + phone_type.substr(0, 1).toUpperCase() + phone_type.substr(1) + '</span>').addClass('padd-lft required-field check-duplicate');
                     }else{
                         console.log("Duplicate Flase");
                         $(this).parent().text('').append('<span class="entered-phone-number">' + phone_number + '</span> <span class="entered-phone-type">' + phone_type.substr(0, 1).toUpperCase() + phone_type.substr(1) + '</span>').addClass('padd-lft required-field'); 
                     }
                 }else{
					 console.log("Required False");
                     if($(this).find('input.phone-number-input.check-duplicate')){
						 console.log("Duplicate Flase");
                         $(this).parent().text('').append('<span class="entered-phone-number">' + phone_number + '</span> <span class="entered-phone-type">' + phone_type.substr(0, 1).toUpperCase() + phone_type.substr(1) + '</span>').addClass('padd-lft check-duplicate'); 
                     }else{
                         console.log("Duplicate Flase");
                         $(this).parent().text('').append('<span class="entered-phone-number">' + phone_number + '</span> <span class="entered-phone-type">' + phone_type.substr(0, 1).toUpperCase() + phone_type.substr(1) + '</span>').addClass('padd-lft');
                     }
                 }
             } else {
                 if($(this).hasClass('required-field')){
                     if($(this).hasClass('check-duplicate')){
                         $(this).parent().text('').append('<span class="entered-phone-number"></span> <span class="entered-phone-type">Mobile</span>').addClass('padd-lft required-field check-duplicate');
                     }else{
                         $(this).parent().text('').append('<span class="entered-phone-number"></span> <span class="entered-phone-type">Mobile</span>').addClass('padd-lft required-field'); 
                     }
                 }else{
                     if($(this).hasClass('check-duplicate')){
                         $(this).parent().text('').append('<span class="entered-phone-number"></span> <span class="entered-phone-type">Mobile</span>').addClass('padd-lft check-duplicate'); 
                     }else{
                         $(this).parent().text('').append('<span class="entered-phone-number"></span> <span class="entered-phone-type">Mobile</span>').addClass('padd-lft');
                     }
                 }
             }
         });

         $('#' + tableElement.attr('id') + ' tr').find('td.edited-column').removeClass('edited-column');
         $('#' + tableElement.attr('id') + ' tr').removeClass('current-edited-row');

         var newRow = '<tr id="' + tableElement.attr('id') + '-row-' + rowIndex + '" class="table-row-custom ui-sortable-handle current-edited-row">';
         if (parameters.index_label) {
             newRow += '<td class="senior-index">' + rowIndex + '</td>';
         }

         for (i = 0; i < parameters.cols.length; i++) {

             newRow += '<td width="' + parameters.cols[i].width + 'px" class="' + parameters.cols[i].type + '-dynamic-grid ' + parameters.cols[i].type + '-dynamic-grid-' + parameters.cols[i].label + ' column-editable dynamic-table-cells-border">';

             if (parameters.cols[i].type == "text") {
                 if (parameters.cols[i].required) {
                 	newRow += '<input class="editableColumnsStyle table-input-text table-text-validation required-field" type="text"></input>';    
                 }else{
                     newRow += '<input class="editableColumnsStyle table-input-text table-text-validation" type="text"></input>';
                 }
                 
             } else if (parameters.cols[i].type == "email") {
                 if(parameters.cols[i].no_duplicate == true){
                     if (parameters.cols[i].required) {
                 		newRow += '<input class="editableColumnsStyle table-input-text table-email-validation check-duplicate required-field" type="text"></input>';    
                     }else{
                        newRow += '<input class="editableColumnsStyle table-input-text table-email-validation check-duplicate" type="text"></input>';     
                     }
                 }else{
                    if (parameters.cols[i].required) { 
                    	newRow += '<input class="editableColumnsStyle table-input-text table-email-validation required-field" type="text"></input>';     
                    }else{
                        newRow += '<input class="editableColumnsStyle table-input-text table-email-validation" type="text"></input>';     
                    }
                 }
             } else if (parameters.cols[i].type == "phone") {
                 if(parameters.cols[i].no_duplicate == true){
                     if (parameters.cols[i].required) {
                 		newRow += '<input class="editableColumnsStyle table-input-text table-phone-validation check-duplicate required-field" type="text"></input>';
                     }else{
                        newRow += '<input class="editableColumnsStyle table-input-text table-phone-validation check-duplicate" type="text"></input>'; 
                     }
                 }else{
                    if (parameters.cols[i].required) { 
                    	newRow += '<input class="editableColumnsStyle table-input-text table-phone-validation required-field" type="text"></input>'; 
                    }else{
                        newRow += '<input class="editableColumnsStyle table-input-text table-phone-validation" type="text"></input>'; 
                    }
                 }
             } else if (parameters.cols[i].type == "dob") {
                 if (parameters.cols[i].required) {
                 	newRow += '<i class="fa fa-calendar"></i><input type="text" class="table-datepicker senior-col-4-input required-field"/>';
                 }else{
                    newRow += '<i class="fa fa-calendar"></i><input type="text" class="table-datepicker senior-col-4-input"/>'; 
                 }
             } else if (parameters.cols[i].type == "checkbox") {
                 if (parameters.cols[i].required) {
                 	newRow += '<input class="styled-checkbox required-field" id="' + parameters.cols[i].value + rowIndex + '" type="checkbox" name="' + parameters.cols[i].value + '" value="' + parameters.cols[i].value + '"><label for="' + parameters.cols[i].value + rowIndex + '">&nbsp;</label>'
                 }else{
                    newRow += '<input class="styled-checkbox" id="' + parameters.cols[i].value + rowIndex + '" type="checkbox" name="' + parameters.cols[i].value + '" value="' + parameters.cols[i].value + '"><label for="' + parameters.cols[i].value + rowIndex + '">&nbsp;</label>' 
                 }
                 //newRow += '<input class="editableColumnsStyle" type="checkbox" name="' + parameters.cols[i].value + '" value="' + parameters.cols[i].value + '"/>';
             } else if (parameters.cols[i].type == "phone-type") {
                 newRow += '<div class="phone-list phone-input">' +
                     '<div class="input-group input-text-width" style="width:' + parameters.cols[i].width + 'px">' ;
                 
                 	 if(parameters.cols[i].no_duplicate == true){
                         if (parameters.cols[i].required) {
                             newRow += '<input type="text" class="form-control input-text-phone phone-number-input check-duplicate required-field" required="required" id="phone" name="phone" placeholder="Enter Phone" maxlength="10"/> ' ;     
                         }else{
                             newRow += '<input type="text" class="form-control input-text-phone phone-number-input check-duplicate" required="required" id="phone" name="phone" placeholder="Enter Phone" maxlength="10"/> ' ;     
                         }
                     }else{
                         if (parameters.cols[i].required) { 
                             newRow += '<input type="text" class="form-control input-text-phone phone-number-input required-field" required="required" id="phone" name="phone" placeholder="Enter Phone" maxlength="10"/> ' ;     
                         }else{
                             newRow += '<input type="text" class="form-control input-text-phone phone-number-input" required="required" id="phone" name="phone" placeholder="Enter Phone" maxlength="10"/> ' ;     
                         }
                     }
                     newRow += '<span class="input-group-btn">' +
                     '<button type="button" class="btn btn-default phone-type-custom dropdown-toggle type-text" data-toggle="dropdown" aria-expanded="false"><span class="type-text">' + parameters.cols[i].options[0] + '</span><span class="caret"></span></button>' +
                     '<ul class="dropdown-menu" role="menu">';
                 for (j = 0; j < parameters.cols[i].options.length; j++) {
                     newRow += '<li><a class="changeType" href="javascript:;" data-type-value="' + parameters.cols[i].options[j].toLowerCase() + '">' + parameters.cols[i].options[j] + '</a></li>';
                 }
                 newRow += '</ul>' +
                     '</span>' +
                     '<input type="hidden" name="type" class="type-input" value="" />' +
                     '</div>' +
                     '</div>';
             } else if (parameters.cols[i].type == "select") {
                 if (parameters.cols[i].required) {
                 	newRow += '<select class="editableColumnsStyle table-select-option required-field">';
                 }else{
                    newRow += '<select class="editableColumnsStyle table-select-option">'; 
                 }
                 for (j = 0; j < parameters.cols[i].options.length; j++) {
                     newRow += '<option value="' + parameters.cols[i].options[j] + '">' + parameters.cols[i].options[j] + '</option>';
                 }
                 newRow += '</select>';
             }

             newRow += '</td>';
         }
         if (parameters.actions) {
             newRow += '<td><i class="fa fa-trash-o" id="senior-del-' + rowIndex + '" aria-hidden="true"></i></td>';
         }
         $('#' + tableElement.attr('id') + ' tbody').append(newRow);
         $('#' + tableElement.attr('id') + ' tbody').find(".table-datepicker").datepicker({
             maxDate: new Date(),
             dateFormat: "mm/dd/yy",
             changeMonth: true,
             changeYear: true,
             yearRange: "-100:+30"
         });
         $('#' + tableElement.attr('id') + ':last tr:last').bind("click", editRow);
         $('#' + tableElement.attr('id') + ':last tr:last td input.check-duplicate').bind("focusout", checkDuplicate);
         $('#' + tableElement.attr('id') + ':last tr:last td i.fa-trash-o').bind("click", deleteRow);
     }

     function checkDuplicate(event){
        console.log("Duplicate Check");
        var checkDuplicateArray = [];
         $(".wizard-table tbody tr").find('td.check-duplicate').each(function(){
             if($(this).find('span.entered-phone-number').length > 0){
                checkDuplicateArray.push($(this).find('span.entered-phone-number').html()); 
             }else{
             	checkDuplicateArray.push($(this).html());    
             }
             
         });
         console.log(checkDuplicateArray);
         
        if(jQuery.inArray( $(this).val(), checkDuplicateArray ) != -1){
             console.log("Duplicate Value");
             //event.cancelable;
             $(this).addClass("errorClass duplicate-error");
             var markup = "Email Or Phone Number is Already Entered for Another Contact";
             var title = 'Warning';
             var page = '';
             dynamicAlert(title, markup, page);
             return null;
        }else{
            $(this).removeClass("errorClass duplicate-error"); 
        } 
     }
    
     function dynamicAlert(title, markup, pageRedirect) {
            $('<div></div>').dialog({
                title: title,
                dialogClass: 'no-close',
                closeOnEscape: false,
                open: function() {
                    //var markup = 'Atleast one care giver should be added.';
                    $(this).html(markup);
                },
                modal: true,
                buttons: {
                    Ok: function() {
                        $(this).dialog("close");
                        if (pageRedirect != '') {
                            location.href = pageRedirect;
                        }
                    }
                },
                create: function() {
                    $(".ui-dialog").find(".ui-dialog-titlebar").css({
                        'background-image': 'none',
                        'background-color': 'white',
                        'border': 'none'
                    });
                    $(".ui-dialog").find(".ui-dialog-titlebar-close").css({
                        'display': 'none'
                    });
                    $(".ui-dialog").find(".ui-dialog-buttonpane button:contains(Ok)").css({
                        'border': 'none',
                        'border-radius': '3px',
                        'color': 'white',
                        'width': '77px',
                        'padding-top': '2px',
                        'padding-bottom': '2px',
                        'background-color': '#1c84c6 !important',
                    });
                }
            });

        }
    
     function editRow() {
         if (!$(this).hasClass('current-edited-row')) {
             console.log("Entered Custom Edit Row");
             $(this).removeClass('padd-lft');
             console.log($(this).children('td').removeClass('padd-lft'));
             
             //console.log(tableElement.attr('id'));
             if ($('#' + tableElement.attr('id') + ' tr').find('td.column-editable input.duplicate-error').length > 0) {
                 var markup = 'Please Check for Duplicate Errors.';
                 var title = 'Warning';
                 var page = '';
                 dynamicAlert(title, markup, page);
                 return null;
             }
             
             if ($('#' + tableElement.attr('id') + ' tr').find('input.table-text-validation.required-field').length > 0) {
                 var p = $('#' + tableElement.attr('id') + ' tr').find('input.table-text-validation.required-field').val();
                 if (p == '') {
                     var markup = 'Name cannot be empty.';
                     var title = 'Warning';
                     var page = '';
                     dynamicAlert(title, markup, page);
                     $('#' + tableElement.attr('id') + ' tr').find('input.table-text-validation.required-field').addClass("errorClass");
                     isValid = false;
                     
                     return null;
                 }
             }
             
             if ($('#' + tableElement.attr('id') + ' tr').find('input.table-email-validation.required-field').length > 0) {
                 if ($('#' + tableElement.attr('id') + ' tr').find('input.table-email-validation.required-field').val() == '') {
                     var markup = 'Email cannot be empty.';
                     var title = 'Warning';
                     var page = '';
                     dynamicAlert(title, markup, page);
                     $('#' + tableElement.attr('id') + ' tr').find('input.table-email-validation.required-field').addClass("errorClass");
                     isValid = false;
                     
                     return null;
                 }
                 if (!validateEmail($('#' + tableElement.attr('id') + ' tr').find('input.table-email-validation.required-field').val())) {
                     var markup = 'Not a valid email address.';
                     var title = 'Warning';
                     var page = '';
                     dynamicAlert(title, markup, page);
                     $('#' + tableElement.attr('id') + ' tr').find('input.table-email-validation.required-field').addClass("errorClass");
                     isValid = false;
                     
                     return null;
                 }
             }
             
             if ($('#' + tableElement.attr('id') + ' tr').find('input.table-phone-validation.required-field').length >= 1) {
                 if ($('#' + tableElement.attr('id') + ' tr').find('input.table-phone-validation.required-field').val() == '') {
                     $('#' + tableElement.attr('id') + ' tr').find('input.table-phone-validation.required-field').addClass("errorClass");
                     isValid = false;
                     
                     var markup = 'Contact Number cannot be empty.';
                     var title = 'Warning';
                     var page = '';
                     dynamicAlert(title, markup, page);
                     return null;
                 }
                 
                 var p = $('#' + tableElement.attr('id') + ' tr').find('input.table-phone-validation.required-field').val().replace(/[^0-9]/g, '');
                 if (p.length != 10) {
                     $('#' + tableElement.attr('id') + ' tr').find('input.table-phone-validation.required-field').addClass("errorClass");
                     isValid = false;
                     
                     var markup = 'Not a valid contact number.';
                     var title = 'Warning';
                     var page = '';
                     dynamicAlert(title, markup, page);
                     return null;
                 }
             }
             
             
             
             if ($('#' + tableElement.attr('id') + ' tr').find('div.phone-input input.required-field').length >= 1) {
                // $('#' + tableElement.attr('id') + ' tr').find('td.column-editable.phone-type-dynamic-grid div.phone-input ').each(function() {
                     if ($('#' + tableElement.attr('id') + ' tr').find('input.phone-number-input.required-field').val() == '') {
                         console.log("Phone Number Type Required Check");
                         $('#' + tableElement.attr('id') + ' tr').find('input.phone-number-input.required-field').addClass("errorClass");
                         isValid = false;
                         var markup = 'Contact Number cannot be empty.';
                         var title = 'Warning';
                         var page = '';
                         dynamicAlert(title, markup, page);
                         return null;
                     }
                     
                     var p = $('#' + tableElement.attr('id') + ' tr').find('input.phone-number-input.required-field').val().replace(/[^0-9\.]+/g, '');
                     if (p.length != 10) {
                         $('#' + tableElement.attr('id') + ' tr').find('input.phone-number-input.required-field').addClass("errorClass");
                         isValid = false;
                         var markup = 'Not a valid contact number.';
                         var title = 'Warning';
                         var page = '';
                         dynamicAlert(title, markup, page);
                         return null;
                     }
               //  });
             }

             
             $('#' + tableElement.attr('id') + ' tr').find('td.column-editable input.table-input-text').each(function() {
                 var text = $(this).val();
                 if($(this).hasClass('required-field')){
                     if($(this).hasClass('check-duplicate')){
                         $(this).parent().text(text).addClass('padd-lft required-field check-duplicate');
                         
                     }else{
                         $(this).parent().text(text).addClass('padd-lft required-field'); 
                     }
                 }else{
                     if($(this).hasClass('check-duplicate')){
                         $(this).parent().text(text).addClass('padd-lft check-duplicate'); 
                     }else{
                         $(this).parent().text(text).addClass('padd-lft'); 
                     }
                 }
             });

             $('#' + tableElement.attr('id') + ' tr').find('td.column-editable.select-dynamic-grid select.table-select-option').each(function() {
                 var text = $(this).val();
                 if($(this).hasClass('required-field')){
                     if($(this).hasClass('check-duplicate')){
                         $(this).parent().text(text).addClass('padd-lft required-field check-duplicate');
                     }else{
                         $(this).parent().text(text).addClass('padd-lft required-field'); 
                     }
                 }else{
                     if($(this).hasClass('check-duplicate')){
                         $(this).parent().text(text).addClass('padd-lft check-duplicate'); 
                     }else{
                         $(this).parent().text(text).addClass('padd-lft'); 
                     }
                 }
                 
                 /*if($(this).find('.required-field')){
                 	$(this).parent().removeClass('padd-lft required-field');
                 }else{
                 	$(this).parent().text(text).addClass('padd-lft');    
                 }*/
                 
             });

             $('#' + tableElement.attr('id') + ' tr').find('td.column-editable.dob-dynamic-grid input.table-datepicker').each(function() {
                 var text = $(this).val();
                 if($(this).hasClass('required-field')){
                     if($(this).hasClass('check-duplicate')){
                         $(this).parent().text('').append('<i class="fa fa-calendar"></i> <span class="date-val">' + text + '</span>').addClass('padd-lft required-field check-duplicate');
                     }else{
                         $(this).parent().text('').append('<i class="fa fa-calendar"></i> <span class="date-val">' + text + '</span>').addClass('padd-lft required-field'); 
                     }
                 }else{
                     if($(this).hasClass('check-duplicate')){
                         $(this).parent().text('').append('<i class="fa fa-calendar"></i> <span class="date-val">' + text + '</span>').addClass('padd-lft check-duplicate'); 
                     }else{
                         $(this).parent().text('').append('<i class="fa fa-calendar"></i> <span class="date-val">' + text + '</span>').addClass('padd-lft'); 
                     }
                 }
             });

             $('#' + tableElement.attr('id') + ' tr').find('td.column-editable.phone-type-dynamic-grid div.phone-input').each(function() {
                 //console.log($(this).find('input.phone-number-input').val());
                 var phone_number = $(this).find('input.phone-number-input').val();
                 var phone_type = $(this).find('input.type-input').val();
                 if (typeof phone_number != 'undefined' && typeof phone_type != 'undefined') {
                     $(this).parent().removeClass('padd-lft');
                     if($(this).hasClass('required-field')){
                         if($(this).hasClass('check-duplicate')){
                             $(this).parent().text('').append('<span class="entered-phone-number">' + phone_number + '</span> <span class="entered-phone-type">' + phone_type.substr(0, 1).toUpperCase() + phone_type.substr(1) + '</span>').addClass('padd-lft required-field check-duplicate');
                         }else{
                             $(this).parent().text('').append('<span class="entered-phone-number">' + phone_number + '</span> <span class="entered-phone-type">' + phone_type.substr(0, 1).toUpperCase() + phone_type.substr(1) + '</span>').addClass('padd-lft required-field'); 
                         }
                     }else{
                         if($(this).hasClass('check-duplicate')){
                             $(this).parent().text('').append('<span class="entered-phone-number">' + phone_number + '</span> <span class="entered-phone-type">' + phone_type.substr(0, 1).toUpperCase() + phone_type.substr(1) + '</span>').addClass('padd-lft check-duplicate'); 
                         }else{
                             $(this).parent().text('').append('<span class="entered-phone-number">' + phone_number + '</span> <span class="entered-phone-type">' + phone_type.substr(0, 1).toUpperCase() + phone_type.substr(1) + '</span>').addClass('padd-lft');
                         }
                     }
                 } else {
                     $(this).parent().removeClass('padd-lft');
                     if($(this).hasClass('required-field')){
                         if($(this).hasClass('check-duplicate')){
                             $(this).parent().text('').append('<span class="entered-phone-number"></span> <span class="entered-phone-type"></span>').addClass('padd-lft required-field check-duplicate');
                         }else{
                             $(this).parent().text('').append('<span class="entered-phone-number"></span> <span class="entered-phone-type"></span>').addClass('padd-lft required-field'); 
                         }
                     }else{
                         if($(this).hasClass('check-duplicate')){
                             $(this).parent().text('').append('<span class="entered-phone-number"></span> <span class="entered-phone-type"></span>').addClass('padd-lft check-duplicate'); 
                         }else{
                             $(this).parent().text('').append('<span class="entered-phone-number"></span> <span class="entered-phone-type"></span>').addClass('padd-lft');
                         }
                     }
                     
                     /*if($(this).find('input.phone-number-input.required-field')){
                     	$(this).parent().text('').append('<span class="entered-phone-number"></span> <span class="entered-phone-type"></span>').addClass('padd-lft required-field');
                     }else{
                         $(this).parent().text('').append('<span class="entered-phone-number"></span> <span class="entered-phone-type"></span>').addClass('padd-lft');
                     }*/
                 }
             });

             $('#' + tableElement.attr('id') + ' tr').find('td.edited-column').removeClass('edited-column');
             $('#' + tableElement.attr('id') + ' tr').removeClass('current-edited-row');

             if ($(this).find('td.edited-column').length <= 0) {

                 //Dob
                 $(this).find('td.column-editable.dob-dynamic-grid').each(function(index) {
                     var html = $(this).html();
                     var input = '';
                     console.log("Dob Default");
                     console.log(html);
                     var res = $(this).find('.date-val').text();
                     console.log(res);
                     $(this).text('').append('<i class="fa fa-calendar"></i><input type="text" class="table-datepicker"/>');
                     $(this).find(".table-datepicker").datepicker({
                         maxDate: new Date(),
                         dateFormat: "mm/dd/yy",
                         changeMonth: true,
                         changeYear: true,
                         yearRange: "-100:+30"});   
                     $(".table-datepicker").datepicker({
                         maxDate: new Date(),
                         dateFormat: "mm/dd/yy",
                         changeMonth: true,
                         changeYear: true,
                         yearRange: "-100:+30"
                     });
                     if (res != '') {
                         var d = res.split("/");
                         $(this).find(".table-datepicker").datepicker("setDate", new Date(d[2], (d[0] - 1), d[1]));
                     }                     
                 });

                 //Select Dropdown
                 $(this).find('td.column-editable.select-dynamic-grid').each(function(index) {
                     var className = this.className.match(/select-dynamic-grid-\w+/);
                     var selectOptions = $.grep(parameters.cols, function(element, index) {
                         console.log(className[0].substr(20));
                         return element.label == className[0].substr(20);
                     });
                     console.log('selectOptions[0].options');
                     console.log(selectOptions[0].options);
                     var html = $(this).html();
                     var input = '';
                     console.log(html);
                     newRow = '';
                     newRow += '<select class="editableColumnsStyle table-select-option">';
                     for (j = 0; j < selectOptions[0].options.length; j++) {
                         newRow += '<option value="' + selectOptions[0].options[j] + '">' + selectOptions[0].options[j] + '</option>';
                     }
                     newRow += '</select>';
                     $(this).html(newRow);
                     $(this).find('.table-select-option').val(html);
                 });

                 $(this).find('td.column-editable.text-dynamic-grid').each(function(index) {
                     var html = $(this).html();
                     if($(this).hasClass('required-field')){
                         if($(this).hasClass('check-duplicate')){
                             input = $('<input class="editableColumnsStyle table-input-text table-text-validation required-field check-duplicate" type="text"/>');
                         }else{
                             input = $('<input class="editableColumnsStyle table-input-text table-text-validation required-field" type="text"/>');
                         }
                     }else{
                         if($(this).hasClass('check-duplicate')){
                             input = $('<input class="editableColumnsStyle table-input-text table-text-validation check-duplicate" type="text"/>');
                         }else{
                             input = $('<input class="editableColumnsStyle table-input-text table-text-validation" type="text"/>');
                         }
                     }
                     
                     /*if($(this).find('.required-field')){
                     	input = $('<input class="editableColumnsStyle table-input-text table-text-validation required-field" type="text"/>');    
                     }else{
                         input = $('<input class="editableColumnsStyle table-input-text table-text-validation" type="text"/>');
                     }*/
                     
                     input.val(html);
                     $(this).html(input);
                 });

                 $(this).find('td.column-editable.email-dynamic-grid').each(function(index) {
                     var html = $(this).html();
                     
                     if($(this).hasClass('required-field')){
                         if($(this).hasClass('check-duplicate')){
                             input = $('<input class="editableColumnsStyle table-input-text table-email-validation required-field check-duplicate" type="text"/>');
                         }else{
                             input = $('<input class="editableColumnsStyle table-input-text table-email-validation required-field" type="text"/>');
                         }
                     }else{
                         if($(this).hasClass('check-duplicate')){
                             input = $('<input class="editableColumnsStyle table-input-text table-email-validation check-duplicate" type="text"/>');
                         }else{
                             input = $('<input class="editableColumnsStyle table-input-text table-email-validation" type="text"/>');
                         }
                     }
                     
                     input.val(html);
                     $(this).html(input);
                 });

                 $(this).find('td.column-editable.phone-dynamic-grid').each(function(index) {
                     var html = $(this).html();
                     
                     if($(this).hasClass('required-field')){
                         if($(this).hasClass('check-duplicate')){
                             input = $('<input class="editableColumnsStyle table-input-text table-phone-validation required-field check-duplicate" type="text"></input>'); 
                         }else{
                             input = $('<input class="editableColumnsStyle table-input-text table-phone-validation required-field" type="text"></input>'); 
                         }
                     }else{
                         if($(this).hasClass('check-duplicate')){
                             input = $('<input class="editableColumnsStyle table-input-text table-phone-validation check-duplicate" type="text"></input>');
                         }else{
                             input = $('<input class="editableColumnsStyle table-input-text table-phone-validation" type="text"></input>'); 
                         }
                     }
                     
                     input.val(html);
                     $(this).html(input);
                 });

                 //Select Dropdown
                 $(this).find('td.column-editable.phone-type-dynamic-grid').each(function() {
                     var className = this.className.match(/phone-type-dynamic-grid-\w+/);
                     var selectOptions = $.grep(parameters.cols, function(element, index) {
                         console.log(className[0].substr(24));
                         return element.label == className[0].substr(24);
                     });
                     console.log(selectOptions[0].options);
                     var html = $(this).text();
                     var phone_number_split = html.split(" ");
                     var phone_numer = phone_number_split[0];
                     var phone_type = phone_number_split[1];
                     console.log(html);
                     var input = '';
                     newRow = '';
                     var currentType = "";

                     var currentSelectedValue = $.grep(selectOptions[0].options, function(element, index) {
                         if (element.toLowerCase() == phone_type.toLowerCase()) {
                             return element;
                         }
                     });
                     
                     var currentSelValue = 'Mobile';
                     if(typeof currentSelectedValue[0] != 'undefined'){
                         currentSelValue = currentSelectedValue[0];
                     }

                     newRow += '<div class="phone-list phone-input">' +
                         '<div class="input-group input-text-width" style="width:' + selectOptions[0].width + 'px">';
                     	  if($(this).hasClass('required-field')){
                             if($(this).hasClass('check-duplicate')){
                                 newRow +=  '<input type="text" class="form-control input-text-phone phone-number-input required-field check-duplicate" required="required" id="phone" name="phone" placeholder="Enter Phone" maxlength="10"/> ' ;
                             }else{
                                 newRow +=  '<input type="text" class="form-control input-text-phone phone-number-input required-field" required="required" id="phone" name="phone" placeholder="Enter Phone" maxlength="10"/> ' ;
                             }
                         }else{
                             if($(this).hasClass('check-duplicate')){
                                 newRow +=  '<input type="text" class="form-control input-text-phone phone-number-input check-duplicate" required="required" id="phone" name="phone" placeholder="Enter Phone" maxlength="10"/> ' ;
                             }else{
                                 newRow +=  '<input type="text" class="form-control input-text-phone phone-number-input" required="required" id="phone" name="phone" placeholder="Enter Phone" maxlength="10"/> ' ;
                             }
                         }
                         
                         newRow += '<span class="input-group-btn">' +
                         '<button type="button" class="btn btn-default phone-type-custom dropdown-toggle type-text" data-toggle="dropdown" aria-expanded="false"><span class="type-text">' + currentSelValue + '</span><span class="caret"></span></button>' +
                         '<ul class="dropdown-menu" role="menu">';
                     for (j = 0; j < selectOptions[0].options.length; j++) {
                         newRow += '<li><a class="changeType" href="javascript:;" data-type-value="' + selectOptions[0].options[j].toLowerCase() + '">' + selectOptions[0].options[j] + '</a></li>';
                     }
                     newRow += '</ul>' +
                         '</span>' +
                         '<input type="hidden" name="type" class="type-input" value="" />' +
                         '</div>' +
                         '</div>';


                     $(this).html(newRow);
                     if (typeof phone_numer != 'undefined' && typeof phone_type != 'undefined') {
                         $(this).find('.phone-number-input').val(phone_numer);
                         $(this).find('.type-input').val(phone_type);
                     }
                 });

                 $(this).find('td.column-editable').addClass('edited-column');
                 $(this).addClass('current-edited-row');
                 $(this).find('td.column-editable input.check-duplicate').bind("focusout", checkDuplicate);
                 //$('#' + tableElement.attr('id') + ':last tr:last td input.check-duplicate').bind("focusout", checkDuplicate);
             }
         }
     }

     function deleteRow() {
         $(this).closest('tr').nextAll().find('td.senior-index').each(function(index) {
             var text = $(this).text();
             console.log(text);
             $(this).text(parseInt(text) - 1);
         });
         deletedIds.push($(this).closest('tr').find('input.inserted-id').val());
         console.log(deletedIds);
         $('#' + tableElement.attr('id') + ' tr').find('.deleted-id').val(deletedIds);
         $(this).closest('tr').remove();
     }

     function getDeletedRow() {
         return deletedIds;
     }

     $(".table-row-custom.ui-sortable-handle.current-edited-row").click(function() {
         console.log("OnClick");
         if (!$(this).hasClass('current-edited-row')) {
             console.log("Entered Custom Edit Row");

             $('#' + tableElement.attr('id') + ' tr').find('td.column-editable input.table-input-text').each(function() {
                 var text = $(this).val();
                 $(this).parent().text(text);
             });

             $('#' + tableElement.attr('id') + ' tr').find('td.column-editable.select-dynamic-grid select.table-select-option').each(function() {
                 var text = $(this).val();
                 $(this).parent().text(text);
             });

             $('#' + tableElement.attr('id') + ' tr').find('td.column-editable.dob-dynamic-grid input.table-datepicker').each(function() {
                 var text = $(this).val();
                 $(this).parent().text('').append('<i class="fa fa-calendar"></i> ' + text);
             });

             $('#' + tableElement.attr('id') + ' tr').find('td.column-editable.phone-type-dynamic-grid div.phone-input').each(function() {
                 //console.log($(this).find('input.phone-number-input').val());
                 var phone_number = $(this).find('input.phone-number-input').val();
                 var phone_type = $(this).find('input.type-input').val();
                 if (typeof phone_number != 'undefined' && typeof phone_type != 'undefined') {
                     $(this).parent().text('').append('<span class="entered-phone-number">' + phone_number + '</span> <span class="entered-phone-type">' + phone_type.substr(0, 1).toUpperCase() + phone_type.substr(1) + '</span>');
                 } else {
                     $(this).parent().text('').append('<span class="entered-phone-number"></span> <span class="entered-phone-type"></span>');
                 }
             });

             $('#' + tableElement.attr('id') + ' tr').find('td.edited-column').removeClass('edited-column');
             $('#' + tableElement.attr('id') + ' tr').removeClass('current-edited-row');

             if ($(this).find('td.edited-column').length <= 0) {

                 //Dob
                 $(this).find('td.column-editable.dob-dynamic-grid').each(function(index) {
                     var html = $(this).html();
                     var input = '';
                    /* var res = html.substr(31).split("/");
                     $(this).text('').append('<i class="fa fa-calendar"></i><input type="text" class="table-datepicker"/>');
                     $(this).find(".table-datepicker").datepicker({
                         maxDate: new Date(),
                         changeMonth: true,
                         changeYear: true,
                         dateFormat: "mm/dd/yy",
                         yearRange: "-100:-10"
                     });
                     $(".table-datepicker").datepicker({
                         maxDate: new Date(),
                         changeMonth: true,
                         changeYear: true,
                         dateFormat: "mm/dd/yy",
                         yearRange: "-100:-10"
                     });
                     $(".table-datepicker").datepicker("setDate", new Date(res[2], (res[0] - 1), res[1]));
                      $(this).find(".table-datepicker").datepicker("setDate", new Date(res[2], (res[0] - 1), res[1]));*/
                     
                     var res = $(this).find('.date-val').text();
                     console.log(res);
                     $(this).text('').append('<i class="fa fa-calendar"></i><input type="text" class="table-datepicker"/>');
                     $(this).find(".table-datepicker").datepicker({
                         maxDate: new Date(),
                         dateFormat: "mm/dd/yy",
                         changeMonth: true,
                         changeYear: true,
                         yearRange: "-100:+30"}); 
                     $(".table-datepicker").datepicker({
                         maxDate: new Date(),
                         dateFormat: "mm/dd/yy",
                         changeMonth: true,
                         changeYear: true,
                         yearRange: "-100:+30"
                     });
                     if (res != '') {
                         var d = res.split("/");
                         $(this).find(".table-datepicker").datepicker("setDate", new Date(d[2], (d[0] - 1), d[1]));
                     }   
                     
                     
                 });

                 //Select Dropdown
                 $(this).find('td.column-editable.select-dynamic-grid').each(function(index) {
                     var className = this.className.match(/select-dynamic-grid-\w+/);
                     var selectOptions = $.grep(parameters.cols, function(element, index) {
                         console.log(className[0].substr(20));
                         return element.label == className[0].substr(20);
                     });
                     console.log(selectOptions[0].options);
                     var html = $(this).html();
                     var input = '';
                     console.log(html);
                     newRow = '';
                     newRow += '<select class="editableColumnsStyle table-select-option">';
                     for (j = 0; j < selectOptions[0].options.length; j++) {
                         newRow += '<option value="' + selectOptions[0].options[j] + '">' + selectOptions[0].options[j] + '</option>';
                     }
                     newRow += '</select>';
                     $(this).html(newRow);
                     $(this).find('.table-select-option').val(html);
                 });

                 $(this).find('td.column-editable.text-dynamic-grid').each(function(index) {
                     var html = $(this).html();
                     input = $('<input class="editableColumnsStyle table-input-text table-text-validation" type="text"/>');
                     input.val(html);
                     $(this).html(input);
                 });

                 $(this).find('td.column-editable.email-dynamic-grid').each(function(index) {
                     var html = $(this).html();
                     input = $('<input class="editableColumnsStyle table-input-text table-email-validation" type="text"/>');
                     input.val(html);
                     $(this).html(input);
                 });

                 $(this).find('td.column-editable.phone-dynamic-grid').each(function(index) {
                     var html = $(this).html();
                     input = $('<input class="editableColumnsStyle table-input-text table-phone-validation" type="text"></input>');
                     input.val(html);
                     $(this).html(input);
                 });

                 //Select Dropdown
                 $(this).find('td.column-editable.phone-type-dynamic-grid').each(function() {
                     var className = this.className.match(/phone-type-dynamic-grid-\w+/);
                     var selectOptions = $.grep(parameters.cols, function(element, index) {
                         console.log(className[0].substr(24));
                         return element.label == className[0].substr(24);
                     });
                     console.log(selectOptions[0].options);
                     var html = $(this).text();
                     var phone_number_split = html.split(" ");
                     var phone_numer = phone_number_split[0];
                     var phone_type = phone_number_split[1];
                     console.log(html);
                     var input = '';
                     newRow = '';
                     var currentType = "";

                     var currentSelectedValue = $.grep(selectOptions[0].options, function(element, index) {
                         if (element.toLowerCase() == phone_type.toLowerCase()) {
                             return element;
                         }
                     });
                     
                     var currentSelValue = 'Mobile';
                     if(typeof currentSelectedValue[0] != 'undefined'){
                         currentSelValue = currentSelectedValue[0];
                     }

                     newRow += '<div class="phone-list phone-input">' +
                         '<div class="input-group input-text-width" style="width:' + selectOptions[0].width + 'px">' +
                         '<input type="text" class="form-control input-text-phone phone-number-input" required="required" id="phone" name="phone" placeholder="Enter Phone" maxlength="10"/> ' +
                         '<span class="input-group-btn">' +
                         '<button type="button" class="btn btn-default phone-type-custom dropdown-toggle type-text" data-toggle="dropdown" aria-expanded="false"><span class="type-text">' + currentSelValue + '</span><span class="caret"></span></button>' +
                         '<ul class="dropdown-menu" role="menu">';
                     for (j = 0; j < selectOptions[0].options.length; j++) {
                         newRow += '<li><a class="changeType" href="javascript:;" data-type-value="' + selectOptions[0].options[j].toLowerCase() + '">' + selectOptions[0].options[j] + '</a></li>';
                     }
                     newRow += '</ul>' +
                         '</span>' +
                         '<input type="hidden" name="type" class="type-input" value="" />' +
                         '</div>' +
                         '</div>';


                     $(this).html(newRow);
                     if (typeof phone_numer != 'undefined' && typeof phone_type != 'undefined') {
                         $(this).find('.phone-number-input').val(phone_numer);
                         $(this).find('.type-input').val(phone_type);
                     }
                 });

                 $(this).find('td.column-editable').addClass('edited-column');
                 $(this).addClass('current-edited-row');
             }
         }
     });
     
     return {
        validationEdit: function() {
            editRow();
        }
    }
 };
 
 
 
 
 
 //
 
 ops_senior_grid_map = $("#ops-senior-grid").dynamicGrid({
                "data": result.senior,
                "cols": [{
                    "label": "Name",
                    "width": 182.5,
                    "type": "text",
                    "value": "name",
                    "required": true
                }, {
                    "label": "Email",
                    "width": 234.5,
                    "type": "email",
                    "value": "email",
                    "required": true,
                    "no_duplicate": true
                }, {
                    "label": "Phone",
                    "width": 179,
                    "type": "phone",
                    "value": "phone",
                    "required": true,
                    "no_duplicate": true
                }, {
                    "label": "DOB",
                    "width": 154,
                    "type": "dob",
                    "required": true,
                    "value": "dob"
                }, {
                    "label": "Gender",
                    "width": 138,
                    "type": "select",
                    "required": true,
                    "options" : ["Select","Male","Female"],
                    "value": "gender"
                }],
                "input_type": "inline",
                "sortable": "false",
                "index_label": "#",
                "label": "Add New Senior",
                "actions": ["Delete"]
            });
			
			
			ops_senior_grid_map.validationEdit();