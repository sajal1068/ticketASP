
$(document).ready(function () {

    BindSellerList($('#agentid').val());
    GetSellerTicketCollections();
});

function BindSellerList(parentId) {
    
    $("#agentSellerList").empty();
    $.ajax({
        url: "../Agent/GetSellerByParentId?parentId=" + parentId,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = jQuery.parseJSON(result);
            var html = '';
            $('#sellercount').val(json.data.length);
            if (json.data.length == 0) {
                html += '<tr>';
                html += '<td colspan="10" style="color:"red"">No Seller Found</td>';
                html += '</tr>';
            }
            else {
                $.each(json.data, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.user_id + '</td>';
                    html += '<td>' + item.first_name + ' ' + (item.last_name == null ? '' : item.last_name) + '</td>';
                    html += '<td>' + (item.mobile == "" ? 'Not Available' : item.mobile) + '</td>';
                    html += '<td>' + item.total_amount + '</td>';
                    html += '<td><button class="btn btn-warning btn-sm" id="btnShowCollection" onclick="SellerTicketCollectionModal(' + item.user_id + ');">Collection</button></td>';
                    html += '</tr>';
                });
            }
            $('#agentSellerList').html(html);
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function SellerTicketCollectionModal(userId) {
    $('#col_ticket_draw_date').val("");
    $('#SellerTicketCollection').empty();
    $("input[id=sellerid]").val(userId)
    var $ticketdrawtime = $('#col_ticket_draw_time');
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

    var $ticketsamtype = $('#col_ticket_sam_type');
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
    $('#CollectionModal').modal('show');
}

function ShowSellerTicketCollections() {
    var res = ValidateSellerTicketCollections();
    if (res == false) {
        return false;
    }
    $("#SellerTicketCollection").show();
    $.ajax({
        url: "../Seller/ViewBuyerTicketCollection?sellerId=" + $('#sellerid').val() + "&sam_type=" + $('#col_ticket_sam_type').val() + "&ticket_draw_date=" + $('#col_ticket_draw_date').val() + "&ticket_draw_time=" + $('#col_ticket_draw_time').val() + "",
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            var json = jQuery.parseJSON(result);
            var html = '';
            if (json.message == "data not found") {
                html += '<div class="column"> <div class="card"><h5>No Ticket Collection Found</h5></div></div>';
            }
            else {
                $.each(json.data, function (key, item) {
                    //var date = new Date(parseInt(item.ticket_draw_date.replace("/Date(", "").replace(")/", ""), 10)).toDateString();
                    html += '<div class="col-12"> <table class="table table-sm table-bordered"><tr><th>No of ticket: </th><td>' + item.no_of_ticket + '</td></tr><tr><th>Sam Type: </th><td>' + item.sam_typ + '</td></tr><tr><th>Amount: </th><td>' + item.total_amount + '</td></tr></table></div>';
                });
            }
            $('#SellerTicketCollection').html(html);
        },
        error: function (error) {
            console.log(error);
        }
    });
};



function ValidateSellerTicketCollections() {
    var isValid = true;
    if ($('#col_ticket_draw_date').val().trim() == "") {
        $('#col_ticket_draw_date').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#col_ticket_draw_date').css('border-color', 'lightgrey');
    }
    if ($('#col_ticket_sam_type').val().trim() == "0") {
        $('#col_ticket_sam_type').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#col_ticket_sam_type').css('border-color', 'lightgrey');
    }
    if ($('#col_ticket_draw_time').val().trim() == "0") {
        $('#col_ticket_draw_time').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#col_ticket_draw_time').css('border-color', 'lightgrey');
    }
    return isValid;
}

function GetSellerTicketCollections() {
    
    $.ajax({
        url: "../Agent/GetTotalSellerCollection",
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            var json = jQuery.parseJSON(result);
            var amount = 0;
            if (json.message == "data not found") {
                amount = 0;
            }
            else {
                $.each(json.data, function (key, item) {
                    amount += parseInt(item.total_amount);
                });
            }
            document.getElementById('totalCollection').innerHTML = amount;
        },
        error: function (error) {
            console.log(error);
        }
    });
};

