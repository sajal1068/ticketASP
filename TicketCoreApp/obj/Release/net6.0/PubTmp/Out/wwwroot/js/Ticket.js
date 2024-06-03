//Load Data in Table when documents is ready  

$(document).ready(function () {
    loadTickets();
    //$("#ticket_draw_date").datepicker({
    //    dateFormat: "dd-mm-yyyy",
    //    changemonth: true,
    //    changeyear: true
    //});
});


//Load Data function
//function loadTickets() {
//    
//    $.ajax({
//        url: "../SuperAdmin/GetMasterTicketList",
//        method: "GET",
//        success: function (result) {
//            $('#ticketlist').empty();
//            var json = jQuery.parseJSON(result);
//            var html = '';

//            if (json.message == "no data found") {
//                document.getElementById('ticketcount').innerHTML = '0';
//                html += '<tr>';
//                html += '<td colspan="10" style="color:"red"">no ticket found</td>';
//                html += '</tr>';
//            }
//            else {
//                document.getElementById('ticketcount').innerHTML = json.data.length;
//                $.each(json.data, function (key, item) {
//                    html += '<tr>';
//                    html += '<td>' + item.ticket_id + '</td>';
//                    html += '<td>' + item.ticket_serial_no + '</td>';
//                    html += '<td>' + item.no_of_ticket + '</td>';
//                    html += '<td>' + item.ticket_draw_date.substring(0, 10) + '</td>';
//                    html += '<td>' + item.ticket_draw_time + '</td>';
//                    html += '<td>' + item.ticket_draw_no + '</td>'
//                    html += '<td>' + item.ticket_code + '</td>';
//                    html += '<td>' + item.sam_type + '</td>';
//                    html += '<td>' + item.no_of_available_ticket + '</td>';
//                    html += '</tr>';
//                });
//            }
//            $('#ticketlist').html(html);
//        },
//        error: function (error) {
//            console.log(error);
//        }
//    });
//}

function loadTickets() {

    $.ajax({
        url: "../SuperAdmin/GetMasterTicketList",
        method: "GET",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
};
function OnSuccess(response) {
    $("#myTable").DataTable(
        {
            bLengthChange: true,
            lengthMenu: [[10, 20, -1], [10, 20, "All"]],
            bFilter: true,
            bSort: true,
            bPaginate: true,
            bDestroy: true,
            data: response,
            columns: [
                /* { 'data': 'ticket_id' },*/
                { 'data': 'ticket_serial_no' },
                { 'data': 'no_of_ticket' },
                /*{ 'data': 'ticket_draw_date' },*/
                { 'data': 'ticket_draw_time' },
                //{ 'data': 'ticket_draw_no' },
                //{ 'data': 'ticket_code' },
                { 'data': 'sam_type' }
                /* { 'data': 'no_of_available_ticket' }*/
            ]
        });
};
$('#btnTicket').click(function () {
    clearTicketFields();
    $('#TicketModal').modal('show');
});

//Add Data Function   
function AddTicket() {

    var res = validateAddTicket();
    if (res == false) {
        return false;
    }
    var ticketObj = {
        ticket_draw_date: $('#ticket_draw_date').val(),
        ticket_draw_time: $('#ticket_draw_time').val(),
        no_of_ticket: $('#no_of_ticket').val(),
        ticket_serial_no: $('#ticket_serial_no').val(),
        ticket_draw_no: $('#ticket_draw_no').val(),
        ticket_code: $('#ticket_code').val(),
        ticket_sam_type: $('#ticket_sam_type').val()
    };
    $.ajax({
        url: "../SuperAdmin/CreateTicket",
        data: JSON.stringify(ticketObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = jQuery.parseJSON(result);
            if (json.message == "ticket created") {
                $('#TicketModal').modal('hide');
                alert('Ticket Created')
                loadTickets();
            }
            else if (json.message == "ticket already exists") {
                alert('ticket already exists')
            }
            else if (json.message == "government holidays, ticket can't be create") {
                alert('government holidays, ticket cannot be create')
            }
            else if (json.message == "time is over, ticket can't be create") {
                alert('time is over, ticket cannot be create')
            }
            else if (json.message == "ticket can't be create for back dates or future dates") {
                alert("ticket can't be create for back dates or future dates")
            }
            else {
                alert('falied to created ticket')
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function clearTicketFields() {
    $('#ticket_draw_date').val("");
    $('#ticket_draw_time').val("0");
    $('#no_of_ticket').val("0");
    $('#ticket_serial_no').val("");
    $('#ticket_draw_no').val("");
    $('#ticket_code').val("");
    $('#ticket_sam_type').val("");
    $('#ticket_draw_date').css('border-color', 'lightgrey');
    $('#ticket_draw_time').css('border-color', 'lightgrey');
    $('#no_of_ticket').css('border-color', 'lightgrey');
    $('#ticket_serial_no').css('border-color', 'lightgrey');
    $('#ticket_draw_no').css('border-color', 'lightgrey');
    $('#ticket_code').css('border-color', 'lightgrey');
    $('#ticket_sam_type').css('border-color', 'lightgrey');
    $("#checkTicketSerialNo").hide();
    $("#checkTicketDrawNo").hide();
    $("#checkTicketCode").hide();
    $("#checkTicketCode").hide();
}

function validateAddTicket() {
    var isValid = true;
    if ($('#ticket_draw_date').val().trim() == "") {
        $('#ticket_draw_date').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ticket_draw_date').css('border-color', 'lightgrey');
    }
    if ($('#ticket_draw_time').val().trim() == "0") {
        $('#ticket_draw_time').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ticket_draw_time').css('border-color', 'lightgrey');
    }
    if ($('#no_of_ticket').val().trim() == "0") {
        $('#no_of_ticket').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#no_of_ticket').css('border-color', 'lightgrey');
    }
    if ($('#ticket_serial_no').val().trim() == "") {
        $('#ticket_serial_no').css('border-color', 'Red');
        isValid = false;
    }
    else {
        var regex = /^[0-9]{5}$/;
        if (regex.test($("#ticket_serial_no").val())) {
            $("#checkTicketSerialNo").hide();
            $('#ticket_serial_no').css('border-color', 'lightgrey');
        } else {
            $("#checkTicketSerialNo").show();
            $("#checkTicketSerialNo").html(
                "**enter 5 digit numeric serial no."
            );
            $("#checkTicketSerialNo").css("color", "red");
            isValid = false;
        }
    }
    if ($('#ticket_draw_no').val().trim() == "") {
        $('#ticket_draw_no').css('border-color', 'Red');
        isValid = false;
    }
    else {
        var regex = /^[0-9]{3}$/;
        if (regex.test($("#ticket_draw_no").val())) {
            $("#checkTicketDrawNo").hide();
            $('#ticket_draw_no').css('border-color', 'lightgrey');
        } else {
            $("#checkTicketDrawNo").show();
            $("#checkTicketDrawNo").html(
                "**enter 3 digit numeric ticket draw no."
            );
            $("#checkTicketDrawNo").css("color", "red");
            isValid = false;
        }
    }
    if ($('#ticket_code').val().trim() == "") {
        $('#ticket_code').css('border-color', 'Red');
        isValid = false;
    }
    else {
        //var regex = /^[a-zA-Z0-9-]{5}$/;
        //if (regex.test($("#ticket_code").val())) {
        $("#checkTicketCode").hide();
        $('#ticket_draw_no').css('border-color', 'lightgrey');
        //} else {
        //    $("#checkTicketCode").show();
        //    $("#checkTicketCode").html(
        //        "**enter 5 digit alphanumeric ticket  code"
        //    );
        //    $('#checkTicketCode').css('border-color', 'lightgrey');
        //    isValid = false;
        //}
    }
    if ($('#ticket_sam_type').val().trim() == "0") {
        $('#ticket_sam_type').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ticket_sam_type').css('border-color', 'lightgrey');
    }
    return isValid;
}

//Function for getting the Data Based upon Employee ID  
function getbyID(EmpID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $.ajax({
        url: "../SuperAdmin/getbyID/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#EmployeeID').val(result.EmployeeID);
            $('#Name').val(result.Name);
            $('#Age').val(result.Age);
            $('#State').val(result.State);
            $('#Country').val(result.Country);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmployeeID: $('#EmployeeID').val(),
        Name: $('#Name').val(),
        Age: $('#Age').val(),
        State: $('#State').val(),
        Country: $('#Country').val(),
    };
    $.ajax({
        url: "../SuperAdmin/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#EmployeeID').val("");
            $('#Name').val("");
            $('#Age').val("");
            $('#State').val("");
            $('#Country').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record  
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "../SuperAdmin/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes  
function clearTicketTextBox() {
    var $ticketdrawtime = $('#ticket_draw_time');
    $ticketdrawtime.empty();
    $ticketdrawtime.append($('<option></option>').val('').html('Please Wait...'));
    $.ajax({
        url: '../SuperAdmin/GetDrawTimes',
        type: 'GET',
        success: function (d) {
            $ticketdrawtime.empty();
            $ticketdrawtime.append($('<option></option>').val('0').html('Select'));
            $.each(d, function (i, val) {
                $ticketdrawtime.append($('<option></option>').val(val.id).html(val.name));
            });
        },
        error: function () {

        }
    });

    var $ticketsamtype = $('#ticket_sam_type');
    $ticketsamtype.empty();
    $ticketsamtype.append($('<option></option>').val('').html('Please Wait...'));
    $.ajax({
        url: '../SuperAdmin/GetSamTypes',
        type: 'GET',
        success: function (d) {
            $ticketsamtype.empty();
            $ticketsamtype.append($('<option></option>').val('0').html('Select'));
            $.each(d, function (i, val) {
                $ticketsamtype.append($('<option></option>').val(val.id).html(val.name));
            });
        },
        error: function () {

        }
    });
    //$("#ticket_draw_date").datepicker({
    //    dateFormat: "dd-mm-yyyy",
    //    changemonth: true,
    //    changeyear: true
    //});
    //$('#userFirstName').val("");
    //$('#userLastName').val("");
    //$('#userMobile').val("");
    //$('#userPassword').val("");
    //$('#userCity').val("");
    //$('#btnAddUser').show();
    //$('#userFirstName').css('border-color', 'lightgrey');
    //$('#userLastName').css('border-color', 'lightgrey');
    //$('#userMobile').css('border-color', 'lightgrey');
    //$('#userPassword').css('border-color', 'lightgrey');
    //$('#userCity').css('border-color', 'lightgrey');
}
//Valdidation using jquery
//function validateUser() {
//    var isValid = true;
//    if ($('#userFirstName').val().trim() == "") {
//        $('#userFirstName').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#userFirstName').css('border-color', 'lightgrey');
//    }
//    if ($('#userLastName').val().trim() == "") {
//        $('#userLastName').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#userLastName').css('border-color', 'lightgrey');
//    }
//    if ($('#userMobile').val().trim() == "") {
//        $('#userMobile').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#userMobile').css('border-color', 'lightgrey');
//    }
//    if ($('#userPassword').val().trim() == "") {
//        $('#userPassword').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#userPassword').css('border-color', 'lightgrey');
//    }
//    if ($('#userCity').val().trim() == "") {
//        $('#userCity').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#userCity').css('border-color', 'lightgrey');
//    }
//    return isValid;
//}  
