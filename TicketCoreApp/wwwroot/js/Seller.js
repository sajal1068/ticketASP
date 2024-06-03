//Load Data in Table when documents is ready  
$(document).ready(function () {
    $('#divBuyTicket').hide();
    $('#divPurchasedTicket').hide();
    $('#divTicketCollection').hide();
    $('#divPrintableArea').hide();

    var $ticketdrawtime = $('#ticket_draw_time');
    $ticketdrawtime.empty();
    $ticketdrawtime.append($('<option></option>').val('').html('Please Wait...'));
    $.ajax({
        url: '../Admin/GetDrawTimes',
        type: 'GET',
        success: function (d) {
            $ticketdrawtime.empty();
            $ticketdrawtime.append($('<option></option>').val('0').html('--Select--'));
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
        url: '../Admin/GetSamTypes',
        type: 'GET',
        success: function (d) {
            $ticketsamtype.empty();
            $ticketsamtype.append($('<option></option>').val('0').html('--Select--'));
            $.each(d, function (i, val) {
                $ticketsamtype.append($('<option></option>').val(val.id).html(val.name));
            });
        },
        error: function () {

        }
    });

    $("#buyTickets").hide();

    $("#btnSearchTicket").click(function (e) {

        var res = ValidateSearchTicket();
        if (res == false) {
            return false;
        }
        e.preventDefault();
        $('#divBuyTicket').show();
        $('#divPurchasedTicket').hide();
        $('#divTicketCollection').hide();
        $('#buyTickets').empty();
        $("#buyTickets").show();
        $('#divPrintableArea').hide();
        $.ajax({
            url: "../Seller/ViewTicketList?sam_type=" + $('#ticket_sam_type').val() + "&ticket_draw_date=" + $('#ticket_draw_date').val() + "&ticket_draw_time=" + $('#ticket_draw_time').val() + "&sellerId=" + $('#sellerId').val() + "&ticketSerialNoFrom=" + $('#ticket_serial_no_from').val() + "&ticketSerialNoTo=" + $('#ticket_serial_no_to').val() + "",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                var html = '';
                var ticketCountHtml = '';
                var json = jQuery.parseJSON(result);
                if (json.message == "ticket not found") {
                    $('#TotalSearchedBuyTicketCount').hide();
                    html += '<div class="column"><p>No Ticket Found</p></div > ';
                }
                else {
                    $.each(json.data, function (key, item) {
                        $("#ticketMasterId").val(item.ticket_master_id);
                        html += '<li>';
                        html += '<div class="checkbox">';
                        html += '<label class="checkbox-wrapper">';
                        html += '<input type="checkbox" class="checkbox-input" id = "' + item.ticket_serial_no + '"  value = "' + item.ticket_serial_no + '||' + item.ticket_html + '" name="ticketserialno" />';
                        html += '<span class="checkbox-tile">';
                        html += '<span class="checkbox-icon">';
                        html += '<div class="tickets-container">';
                        html += '<div class="item">';
                        html += '<div class="item-right">';
                        html += '<span class="up-border"></span>';
                        html += '<span class="down-border" ></span>';
                        html += '</div>';
                        html += '<div class="item-left">';
                        html += '<div class="countData"> ' + item.ticket_serial_no + '</div>';
                        html += ' </div>';
                        html += '</div>';
                        html += '</span>';
                        html += '</span>';
                        html += '</label>';
                        html += '</div>';
                        html += '</li>';
                    });
                    $('#TotalSearchedBuyTicketCount').show();
                    ticketCountHtml += 'Total Ticket: ' + json.data.length + '</label>';
                    $('#TotalSearchedBuyTicketCount').html(ticketCountHtml);
                }
                $('#buyTickets').html(html);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
    $("#btnRefreshTicket").click(function (e) {
        
        var res = ValidateSearchTicket();
        if (res == false) {
            return false;
        }
        e.preventDefault();
        $('#divBuyTicket').show();
        $('#divPurchasedTicket').hide();
        $('#divTicketCollection').hide();
        $('#buyTickets').empty();
        $("#buyTickets").show();
        $('#divPrintableArea').hide();
        $.ajax({
            url: "../Seller/ViewTicketList?sam_type=" + $('#ticket_sam_type').val() + "&ticket_draw_date=" + $('#ticket_draw_date').val() + "&ticket_draw_time=" + $('#ticket_draw_time').val() + "&sellerId=" + $('#sellerId').val() + "&ticketSerialNoFrom=" + $('#ticket_serial_no_from').val() + "&ticketSerialNoTo=" + $('#ticket_serial_no_to').val() + "",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                var html = '';
                var ticketCountHtml = '';
                var json = jQuery.parseJSON(result);
                if (json.message == "ticket not found") {
                    $('#TotalSearchedBuyTicketCount').hide();
                    html += '<div class="column"><p>No Ticket Found</p></div > ';
                }
                else {
                    $.each(json.data, function (key, item) {
                        $("#ticketMasterId").val(item.ticket_master_id);
                        html += '<li>';
                        html += '<div class="checkbox">';
                        html += '<label class="checkbox-wrapper">';
                        html += '<input type="checkbox" class="checkbox-input" id = "' + item.ticket_serial_no + '"  value = "' + item.ticket_serial_no + '||' + item.ticket_html + '" name="ticketserialno" />';
                        html += '<span class="checkbox-tile">';
                        html += '<span class="checkbox-icon">';
                        html += '<div class="tickets-container">';
                        html += '<div class="item">';
                        html += '<div class="item-right">';
                        html += '<span class="up-border"></span>';
                        html += '<span class="down-border" ></span>';
                        html += '</div>';
                        html += '<div class="item-left">';
                        html += '<div class="countData"> ' + item.ticket_serial_no + '</div>';
                        html += ' </div>';
                        html += '</div>';
                        html += '</span>';
                        html += '</span>';
                        html += '</label>';
                        html += '</div>';
                        html += '</li>';
                    });

                    $('#TotalSearchedBuyTicketCount').show();
                    ticketCountHtml += 'Total Ticket: ' + json.data.length + '</label>';
                    $('#TotalSearchedBuyTicketCount').html(ticketCountHtml);
                }
                $('#buyTickets').html(html);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $("#btnSearchPurchasedTicket").click(function (e) {
        e.preventDefault();
        var res = ValidatePurchaseTicket();
        if (res == false) {
            return false;
        }
        $('#divBuyTicket').hide();
        $('#divPurchasedTicket').show();
        $('#divTicketCollection').hide();
        $('#purchasedTicket').empty();
        $("#purchasedTicket").show();
        $('#divPrintableArea').hide();

        $.ajax({
            url: "../Seller/ViewPurchasedTicket?sellerId=" + $('#sellerId').val() + "&sam_type=" + $('#ticket_sam_type').val() + "&ticket_draw_date=" + $('#ticket_draw_date').val() + "&ticket_draw_time=" + $('#ticket_draw_time').val() + "&ticketSerialNoFrom=" + $('#ticket_serial_no_from').val() + "&ticketSerialNoTo=" + $('#ticket_serial_no_to').val() + "",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var json = jQuery.parseJSON(result);
                var html = '';
                var ticketCountHtml = '';
                if (json.message == "ticket not found") {
                    $('#TotalSearchedPurchaseTicketCount').hide();
                    html += '<div class="column"><p>No Purchased Ticket Found</p></div > ';
                }
                else {
                    $.each(json.data, function (key, item) {
                        html += '<li>';
                        html += '<div class="checkbox">';
                        html += '<label class="checkbox-wrapper">';
                        html += '<input type="checkbox" class="checkbox-input" id = "' + item.ticket_serial_no + '"  value = "' + item.ticket_serial_no + '||' + item.ticket_html + '" name="ticketserialno" />';
                        html += '<span class="checkbox-tile">';
                        html += '<span class="checkbox-icon">';
                        html += '<div class="tickets-container">';
                        html += '<div class="item">';
                        html += '<div class="item-right">';
                        html += '<span class="up-border"></span>';
                        html += '<span class="down-border" ></span>';
                        html += '</div>';
                        html += '<div class="item-left">';
                        html += '<div class="countData"> ' + item.ticket_serial_no + '</div>';
                        html += ' </div>';
                        html += '</div>';
                        html += '</span>';
                        html += '</span>';
                        html += '</label>';
                        html += '</div>';
                        html += '</li>';
                    });
                    $('#TotalSearchedPurchaseTicketCount').show();
                    ticketCountHtml += 'Total Purchased Ticket: ' + json.data.length + '</label>';
                    $('#TotalSearchedPurchaseTicketCount').html(ticketCountHtml);
                }
                $('#purchasedTicket').html(html);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $("#btnTicketCollection").click(function (e) {

        e.preventDefault();
        //var res = ValidateCollectionTicket();
        //if (res == false) {
        //    return false;
        //} 
        $('#divBuyTicket').hide();
        $('#divPurchasedTicket').hide();
        $('#divTicketCollection').show();
        $('#TicketCollection').empty();
        $("#TicketCollection").show();
        $('#divPrintableArea').hide();

        $.ajax({
            url: "../Seller/ViewBuyerTicketCollection?sellerId=" + $('#sellerId').val() + "&sam_type=" + $('#ticket_sam_type').val() + "&ticket_draw_date=" + $('#ticket_draw_date').val() + "&ticket_draw_time=" + $('#ticket_draw_time').val() + "",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var json = jQuery.parseJSON(result);
                var html = '';
                var ticketCollectionHtml = '';
                var totalAmount = 0;
                if (json.message == "data not found") {
                    $('#TotalSearchedCollectionTicketCount').hide();
                    html += '<div class="col-12 border border-danger p-3 h5 rounded-2 text-danger"><p>No Ticket Collection Found</p></div > ';
                }
                else {

                    $.each(json.data, function (key, item) {
                        html += '<div class="col-12 col-sm-2 col-md-4 col-lg-3"> <table class="table table-bordered table-sm"><tr><th>No of ticket:</th><td> ' + item.no_of_ticket + '</td></tr><tr><th>Draw date: </th><td>' + item.ticket_draw_date.substring(0, 10) + '</td></tr><th>Sam Type: </th><td>' + item.sam_typ + '</td></tr><th>Amount: </th><td>' + item.total_amount + '</td></tr></table></div>';
                        totalAmount = (parseInt(totalAmount) + parseInt(item.total_amount))
                    });
                    $('#TotalSearchedCollectionTicketCount').show();
                    ticketCollectionHtml += 'Total Ticket Collection : ' + totalAmount + '</label>';
                    $('#TotalSearchedCollectionTicketCount').html(ticketCollectionHtml);
                }
                $('#TicketCollection').html(html);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

//Valdidation using jquery  
function ValidateSearchTicket() {
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
    if ($('#ticket_sam_type').val().trim() == "0") {
        $('#ticket_sam_type').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ticket_sam_type').css('border-color', 'lightgrey');
    }
    return isValid;
}

function ValidatePurchaseTicket() {
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
    if ($('#ticket_sam_type').val().trim() == "0") {
        $('#ticket_sam_type').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ticket_sam_type').css('border-color', 'lightgrey');
    }
    return isValid;
}

//function ValidateCollectionTicket() {
//    var isValid = true;
//    if ($('#ticket_draw_date').val().trim() == "") {
//        $('#ticket_draw_date').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#ticket_draw_date').css('border-color', 'lightgrey');
//    }
//    return isValid;
//}

$('#btnTicket').click(function () {
    $('#TicketModal').modal('show');
});

//Add Data Function   
function buyTicket() {

    var array = $.map($('input[name="ticketserialno"]:checked'), function (c) { return c.value; });
    var noOfTkt = array.length;
    if (noOfTkt > 0) {
        var tktSrnoArr = [];
        var tktHtmlArr = [];
        $.each(array, function (index, value) {
            const myArray = value.split('||');
            tktSrnoArr.push(myArray[0]);
            tktHtmlArr.push(myArray[1]);
        });
        var ticketObj = {
            ticket_master_id: $('#ticketMasterId').val(),
            seller_id: $('#sellerId').val(),
            no_of_ticket: noOfTkt,
            ticket_serialno: tktSrnoArr,
        };
        $.ajax({
            url: "../Seller/BuyBuyerTicket",
            data: JSON.stringify(ticketObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var json = jQuery.parseJSON(result);
                if (json.status == "403") {
                    alert(json.message);
                }
                else if (json.status == "401") {
                    alert(json.message);
                }
                else if (json.status == "201") {
                    alert('ticket purchased')
                    $('#divBuyTicket').hide();
                    $('#divPurchasedTicket').hide();
                    $('#divTicketCollection').hide();
                    $('#divPrintableArea').show();
                    var html = '';
                    /*$.each(tktHtmlArr, function (index, value) {*/
                    $.each(array, function (index, value) {
                        const myArray = value.split('||');

                        html += '<li>';
                        html += '<div  id="print_' + myArray[0] + '">';
                        html += myArray[1];
                        html += '</div>';
                        html += '<div class="w-100 text-center py-1"><button type="button" class="btn btn-success singlePrint" onclick="PrintTicket(print_' + myArray[0] + ');">Print</button></div>';
                        html += "</li>";
                    });

                    //});
                    $('#tktHtml').html(html);
                }
                else if (json.message == "buyer ticket master not created") {
                    alert(json.message);
                }
                else {
                    alert('failed to buy ticket');
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
    else {
        alert("Please select ticket to buy");
    }
}

//Function for getting the Data Based upon Employee ID  
function getbyID(EmpID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $.ajax({
        url: "../Admin/getbyID/" + EmpID,
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
        url: "../Admin/Update",
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
            url: "../Admin/Delete/" + ID,
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
