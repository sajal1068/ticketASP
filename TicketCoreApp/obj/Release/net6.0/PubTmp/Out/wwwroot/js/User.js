//Load Data in Table when documents is ready  
$(document).ready(function () {

    loadUserListData();
    $('#radio_box').change(function () {
        selected_value = $("input[name='usertype']:checked").val();
        if (selected_value == "5") {
            var $childUser = $('#childUser');
            $childUser.empty();
            $childUser.append($('<option></option>').val('').html('Please Wait...'));
            $.ajax({
                url: '../SuperAdmin/GetUserByRoleId?roleId=5',
                type: 'GET',
                success: function (d) {
                    $childUser.empty();
                    $childUser.append($('<option></option>').val('0').html('Select Seller'));
                    $.each(d, function (i, val) {
                        $childUser.append($('<option></option>').val(val.user_id).html(val.first_name + '-' + val.mobile));
                    });
                },
                error: function () {

                }
            });
            var $parentUser = $('#parentUser');
            $parentUser.empty();
            $parentUser.append($('<option></option>').val('').html('Please Wait...'));
            $.ajax({
                url: '../SuperAdmin/GetUserByRoleId?roleId=4',
                type: 'GET',
                success: function (d) {
                    $parentUser.empty();
                    $parentUser.append($('<option></option>').val('0').html('Select Agent'));
                    $.each(d, function (i, val) {
                        $parentUser.append($('<option></option>').val(val.user_id).html(val.first_name + '-' + val.mobile));
                    });
                },
                error: function () {

                }
            });
        }
        if (selected_value == "4") {
            var $childUser = $('#childUser');
            $childUser.empty();
            $childUser.append($('<option></option>').val('').html('Please Wait...'));
            $.ajax({
                url: '../SuperAdmin/GetUserByRoleId?roleId=4',
                type: 'GET',
                success: function (d) {
                    $childUser.empty();
                    $childUser.append($('<option></option>').val('0').html('Select Agent'));
                    $.each(d, function (i, val) {
                        $childUser.append($('<option></option>').val(val.user_id).html(val.first_name + '-' + val.mobile));
                    });
                },
                error: function () {

                }
            });
            var $parentUser = $('#parentUser');
            $parentUser.empty();
            $parentUser.append($('<option></option>').val('').html('Please Wait...'));
            $.ajax({
                url: '../SuperAdmin/GetUserByRoleId?roleId=2',
                type: 'GET',
                success: function (d) {
                    $parentUser.empty();
                    $parentUser.append($('<option></option>').val('0').html('Select Admin'));
                    $.each(d, function (i, val) {
                        $parentUser.append($('<option></option>').val(val.user_id).html(val.first_name + '-' + val.mobile));
                    });
                },
                error: function () {

                }
            });
        }
    });
});

//Load Data function  
function loadUserListData() {
    $.ajax({
        url: "../SuperAdmin/GetUserList",
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //$("#UserList").empty();
            //var json = jQuery.parseJSON(result);
            //var html = '';
            //$("#usercount").text(json.data.length);
            //$.each(json.data, function (key, item) {
            //    html += '<div class="col-lg-3 col-md-6"><div class="pricingTable"><div class="pricingTable-header"><div class="price-value">#' + item.user_id + '</div></div><h3 class="heading">' + (item.name == null ? 'Not Define' : item.name) + '</h3><div class="pricing-content"><ul><li>Name : ' + item.first_name + ' ' + (item.last_name == null ? '' : item.last_name) + '</li><li>Mobile : ' + (item.mobile == "" ? 'Not Available' : item.mobile) + '</li><li>Email : ' + (item.email == "" ? 'Not Available' : item.email) + '</li></ul>';
            //    if (item.role_id == null) {
            //        html += '<button class="btn btn-info btn-sm" id="btnAssignRole"  onclick="AssignUserRole(' + item.user_id + ');">Assign Role</button>'
            //    }
            //    if (item.role_id == 1) {
            //        html += '<div class="pricingTable-signup"><button  id="btnUser" onclick="clearTextBox();">Admin List</button></div>'
            //    }
            //    if (item.role_id == 2) {
            //        html += '<div class="pricingTable-signup"><button  id="btnUser" onclick="clearTextBox();">Agent List</button></div>'
            //    }
            //    if (item.role_id == 4) {
            //        html += '<div class="pricingTable-signup"><button  id="btnUser" onclick="clearTextBox();">Seller List</button></div>'
            //    }
            //    if (item.role_id == 5) {
            //        html += '<div class="pricingTable-signup"><button  id="btnShowCollection" onclick="ShowCollection(' + item.user_id + ');">Collection</button></div>'
            //    }
            //    html += '</div></div></div></div>';
            //});
            //$('#UserList').html(html);


            $('#userlist').empty();
            var json = jQuery.parseJSON(result);
            var html = '';
            document.getElementById('usercount').innerHTML = json.data.length;
            if (json.message == "no data found") {
                html += '<tr>';
                html += '<td colspan="10" style="color:"red"">no user found</td>';
                html += '</tr>';
            }
            else {

                $.each(json.data, function (key, item) {
                    html += '<tr>';
                    /*html += '<td>' + item.user_id + '</td>';*/
                    html += '<td>' + (item.name == null ? 'Not Define' : item.name) + '</td>';
                    html += '<td>' + getUserStatus(item.role_id, item.user_id) + '</td>'
                    html += '<td>' + item.first_name + ' ' + (item.last_name == null ? '' : item.last_name) + '</td>';
                    html += '<td>' + (item.mobile == "" ? 'Not Available' : item.mobile) + '</td>';
                  /*  html += '<td>' + (item.email == "" ? 'Not Available' : item.email) + '</td>';*/
                    html += '</tr>';
                });
            }
            $('#userlist').html(html);
        },
        error: function (error) {
            console.log(error);
        }
    });

    function getUserStatus(role_id, user_id) {
        var html = '';
        if (role_id == null) {
            html += '<button class="btn btn-info btn-sm" id="btnAssignRole"  onclick="AssignUserRole(' + user_id + ');">Assign Role</button>'
        }
        if (role_id == 1) {
            html += '<div class="pricingTable-signup"><button class="btn btn-primary btn-sm"  id="btnUser" onclick="ShowAdminListModal(' + user_id + ');">Admin List</button></div>'
        }
        if (role_id == 2) {
            html += '<div class="pricingTable-signup"><button class="btn btn-info btn-sm" id="btnAgentList" onclick="ShowAgentListModal(' + user_id + ');">Agent List</button></div>'
        }
        if (role_id == 4) {
            html += '<div class="pricingTable-signup"><button class="btn btn-success btn-sm" id="btnSellerList" onclick="ShowSellerListModal(' + user_id + ');">Seller List</button></div>'
        }
        if (role_id == 5) {
            html += '<div class="pricingTable-signup"><button class="btn btn-warning btn-sm" id="btnShowCollection" onclick="ShowCollection(' + user_id + ');">Collection</button></div>'
        }
        return html;
    }
}

$('#btnAddUser').click(function () {
    clearTextBox();
    $('#UserModal').modal('show');
});

$('#btnAssignRole').click(function () {
    $('#childUser').val("0");
    $('#parentUser').val("0");
    $('#AssignRoleModal').modal('show');
});

//Add Data Function   
function AddUser() {
    
    var res = validateUser();
    if (res == false) {
        return false;
    }
    var userObj = {
        first_name: $('#userFirstName').val(),
        last_name: $('#userLastName').val(),
        gender: "male",
        email: "not available",
        mobile: $('#userMobile').val(),
        password: $('#userPassword').val(),
        city: $('#userCity').val()
    };
    $.ajax({
        url: "../SuperAdmin/CreateUser",
        data: JSON.stringify(userObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#UserModal').modal('hide');
            loadUserListData();
            alert("User Created");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
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



function AssignUserRole(id) {

    $.ajax({
        url: "../SuperAdmin/GetUserById?user_id=" + id + "",
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            document.getElementById("ar_userid").innerHTML = result.user_id;
            document.getElementById("ar_username").innerHTML = result.first_name + " " + result.last_name;
            document.getElementById("ar_mobile").innerHTML = (result.mobile == "" ? "Not Available" : result.mobile);
            document.getElementById("ar_email").innerHTML = (result.email == "" ? "Not Available" : result.email);
        },
        error: function (error) {
            console.log(error);
        }
    });

    var $role = $('#ar_role');
    $role.empty();
    $role.append($('<option></option>').val('').html('Please Wait...'));
    $.ajax({
        url: '../SuperAdmin/GetRoles',
        type: 'GET',
        success: function (d) {
            $role.empty();
            $role.append($('<option></option>').val('0').html('Select'));
            $.each(d, function (i, val) {
                $role.append($('<option></option>').val(val.role_id).html(val.name));
            });
        },
        error: function () {

        }
    });

    $('#AssignRoleModal').modal('show');
}

function AssignUserRoles() {
    
    var res = validateAssignRole();
    if (res == false) {
        return false;
    }
    var roleObj = {
        user_id: $('#ar_userid').text(),
        role_id: $('#ar_role').val()
    };
    $.ajax({

        url: "../SuperAdmin/AssignUserRoles",
        data: JSON.stringify(roleObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadUserListData();
            $('#AssignRoleModal').modal('hide');
            alert('User Role Assigned');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function validateAssignRole() {
    var isValid = true;

    if ($('#ar_role').val().trim() == "0") {
        $('#ar_role').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ar_role').css('border-color', 'lightgrey');
    }
    return isValid;
}

function AssignParentUserRole() {
    var res = validateAssignParentUserRole();
    if (res == false) {
        return false;
    }
    var roleObj = {
        user_id: $('#childUser').val(),
        parent_id: $('#parentUser').val()
    };
    $.ajax({
        url: "../SuperAdmin/AssignParentRoles",
        data: JSON.stringify(roleObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#ParentRoleModal').modal('hide');
            alert('Parent Role Assigned');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function validateAssignParentUserRole() {
    var isValid = true;
    if (!$("input[name='usertype']").is(':checked')) {
        alert('Select Agent or Seller');
        isValid = false;
    }
    else {
        if ($('#childUser').val().trim() == "0") {
            $('#childUser').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#childUser').css('border-color', 'lightgrey');
        }
        if ($('#parentUser').val().trim() == "0") {
            $('#parentUser').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#parentUser').css('border-color', 'lightgrey');
        }
    }
    return isValid;
}

function ShowCollection(userId) {
    $('#col_ticket_draw_date').val("");
    $('#TicketCollection').empty();
    $('#SellerListModal').modal('hide');
    $("#SellerList").hide();
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

function ShowSellerListModal(parentId) {
    debugger;
    $('#AgentListModal').modal('hide');
    $("#AgentList").hide();
    $('#SellerListModal').modal('show');
    $("#SellerList").show();
    $.ajax({
        url: "../SuperAdmin/GetUserByParentId?parentId=" + parentId,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = jQuery.parseJSON(result);
            var html = '';
            if (json.data.length == 0) {
                html += '<div class="column"> <div class="card"><h5>No Seller Found</h5></div></div>';
            }
            else {
                $.each(json.data, function (key, item) {
                    html += '<div class="col-12"> <table class="table table-sm table-bordered"><tr><th>ID: </th><td>' + item.user_id + '</td></tr><tr><th>Name: </th><td>' + item.first_name + ' ' + (item.last_name == null ? '' : item.last_name) + '</td></tr><tr><th>Mobile: </th><td>' + item.mobile + '</td></tr><tr><th></th><td><button class="btn btn-warning btn-sm" id="btnShowCollection" onclick="ShowCollection(' + item.user_id + ');">Collection</button></td></tr></table></div>';
                });
            }
            $('#SellerList').html(html);
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function ShowAgentListModal(parentId) {
    debugger;
    $('#AdminListModal').modal('hide');
    $("#AdminList").hide();
    $('#AgentListModal').modal('show');
    $("#AgentList").show();
    $.ajax({
        url: "../SuperAdmin/GetUserByParentId?parentId=" + parentId,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = jQuery.parseJSON(result);
            var html = '';
            if (json.data.length == 0) {
                html += '<div class="column"> <div class="card"><h5>No Agent Found</h5></div></div>';
            }
            else {
                $.each(json.data, function (key, item) {
                    html += '<div class="col-12"> <table class="table table-sm table-bordered"><tr><th>Id: </th><td>' + item.user_id + '</td></tr><tr><th>Name: </th><td>' + item.first_name + ' ' + (item.last_name == null ? '' : item.last_name) + '</td></tr><tr><th>Mobile: </th><td>' + item.mobile + '</td></tr><tr></tr><tr><th></th><td><button class="btn btn-warning btn-sm" id="btnSellerListModal" onclick="ShowSellerListModal(' + item.user_id + ');">Seller List</button></td></tr></table></div>';
                });
            }
            $('#AgentList').html(html);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function ShowAdminListModal(parentId) {
    
    $('#AdminListModal').modal('show');
    $("#AdminList").show();
    $.ajax({
        url: "../SuperAdmin/GetUserByParentId?parentId=" + parentId,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = jQuery.parseJSON(result);
            var html = '';
            if (json.data.length == 0) {
                html += '<div class="column"> <div class="card"><h5>No Admin Found</h5></div></div>';
            }
            else {
                $.each(json.data, function (key, item) {
                    //html += '<div class="col-12"> <table class="table table-sm table-bordered"><tr><th>id: </th><td>' + item.user_id + '</td></tr><tr><th>name: </th><td>' + item.first_name + ' ' + (item.last_name == null ? '' : item.last_name) + '</td></tr><tr><th>mobile: </th><td>' + item.mobile + '</td></tr><tr></tr></table></div>';
                    html += '<div class="col-12"> <table class="table table-sm table-bordered"><tr><th>Id: </th><td>' + item.user_id + '</td></tr><tr><th>Name: </th><td>' + item.first_name + ' ' + (item.last_name == null ? '' : item.last_name) + '</td></tr><tr><th>Mobile: </th><td>' + item.mobile + '</td></tr><tr></tr><tr><th></th><td><button class="btn btn-warning btn-sm" id="btnAgentListModal" onclick="ShowAgentListModal(' + item.user_id + ');">Admin List</button></td></tr></table></div>';
                });
            }
            $('#AdminList').html(html);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function btnShowTicketCollections() {
    var res = ValidateShowTicketCollections();
    if (res == false) {
        return false;
    }
    $("#TicketCollection").show();
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
            $('#TicketCollection').html(html);
        },
        error: function (error) {
            console.log(error);
        }
    });
};

function ValidateShowTicketCollections() {
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
function ShowTotalCollection() {

    
    $.ajax({
        url: "../SuperAdmin/GetTotalCollection?ticket_draw_date=" + $('#total_col_ticket_draw_date').val() + "",
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = jQuery.parseJSON(result);
            var html = '';
            var tot_col = 0;
            if (json.message == "ticket collecton not found") {
                html += '<div class="column" style="display:block"> <div class="card"><h5>Ticket Collection Not Found</h5></div></div>';
            }
            else {

                $.each(json.data, function (key, item) {
                    html += '<div class="col-12"> <table class="table table-sm table-bordered"><tr><th>Sam Type: </th><th>' + item.sam_type + '</th></tr><tr><th>No of Ticket Created: </th><td>' + item.no_of_ticket_created + '</td></tr><tr><th>Total Amount: </th><td>' + item.total_amount + '</td></tr><tr><th>No. of Ticket Sold: </th><td>' + item.no_of_ticket_sold + '</td></tr><tr><th>Total Collection: </th><th>' + item.total_collection_recieved + '</th></tr></table></div>';
                    tot_col += item.total_collection_recieved;
                });
            }
            document.getElementById("divTotalCollection").style.display = "block";
            document.getElementById('lblTotalCollection').innerHTML = tot_col;
            $('#TotalTicketCollection').html(html);
        },
        error: function (error) {
            console.log(error);
        }
    });
};

$('#btnAssignParentRole').click(function () {
    $('#ParentRoleModal').modal('show');
    var today = new Date();
    $('#ticket_draw_date').datepicker({
        uiLibrary: 'bootstrap5',
        autoclose: true,
        format: 'yyyy-mm-dd',
        endDate: "today",
        maxDate: today
    });
});

$('#btnTotalCollection').click(function () {

    $('#total_col_ticket_draw_date').val('');
    $('#TotalTicketCollection').html('');
    $('#TotalCollectionModal').modal('show');
    document.getElementById("divTotalCollection").style.display = "none";
});

function clearTextBox() {
    $('#userFirstName').val("");
    $('#userLastName').val("");
    $('#userMobile').val("");
    $('#userPassword').val("");
    $('#userCity').val("");
    $('#btnAddUser').show();
    $('#userFirstName').css('border-color', 'lightgrey');
    $('#userLastName').css('border-color', 'lightgrey');
    $('#userMobile').css('border-color', 'lightgrey');
    $('#userPassword').css('border-color', 'lightgrey');
    $('#userCity').css('border-color', 'lightgrey');
    $("#checkFirstName").hide();
    $("#checkLastName").hide();
    $("#checkMobile").hide();
    $("#checkPassword").hide();
    $("#checkCity").hide();
}
//Valdidation using jquery  
function validateUser() {
    var isValid = true;
    if ($('#userFirstName').val().trim() == "") {
        $('#userFirstName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        let usernameValue = $("#userFirstName").val();
        if (usernameValue.length < 3 || usernameValue.length > 50) {
            $('#userFirstName').css('border-color', 'Red');
            $("#checkFirstName").show();
            $("#checkFirstName").html("Length of First Name must be between 3 and 50");
            isValid = false;
        } else {
            var letters = /^[A-Za-z ]+$/;
            if (usernameValue.match(letters)) {
                $("#checkFirstName").hide();
                $('#userFirstName').css('border-color', 'lightgrey');
            }
            else {
                $('#userFirstName').css('border-color', 'Red');
                $("#checkFirstName").show();
                $("#checkFirstName").html("Please enter alphabet characters only");
                isValid = false;
            }
        }
    }

    if ($('#userLastName').val().trim() == "") {
        $('#userLastName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        let usernameValue = $("#userLastName").val();
        if (usernameValue.length < 3 || usernameValue.length > 50) {
            $('#userLastName').css('border-color', 'Red');
            $("#checkLastName").show();
            $("#checkLastName").html("Length of Last Name must be between 3 and 50");
            isValid = false;
         } else {
             var letters = /^[A-Za-z ]+$/;
             if (usernameValue.match(letters)) {
                 $("#checkLastName").hide();
                 $('#userLastName').css('border-color', 'lightgrey');
             }
             else {
                 $('#userLastName').css('border-color', 'Red');
                 $("#checkLastName").show();
                 $("#checkLastName").html("Please enter alphabet characters only");
                 isValid = false;
             }
        }
    }
    if ($('#userMobile').val().trim() == "") {
        $('#userMobile').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#userMobile').css('border-color', 'lightgrey');
        let mobile = $("#userMobile").val();
        if (mobile.length == "") {
            $("#checkMobile").show();
            isValid = false;
        }
        if (mobile.length < 10 || mobile.length > 10) {
            $('#userMobile').css('border-color', 'Red');
            $("#checkMobile").show();
            $("#checkMobile").html(
                "Please enter correct mobile no."
            );
            $("#checkMobile").css("color", "red");
            isValid = false;
        } else {
            var regex = /^[6-9][0-9]{9}$/;
            if (regex.test($("#userMobile").val())) {
                $("#checkMobile").hide();
                $('#userMobile').css('border-color', 'lightgrey');
            } else {
                $('#userMobile').css('border-color', 'Red');
                $("#checkMobile").show();
                $("#checkMobile").html(
                    "Please enter correct mobile no."
                );
                $("#checkMobile").css("color", "red");
                isValid = false;
            }

        }
    }
    if ($('#userPassword').val().trim() == "") {
        $('#userPassword').css('border-color', 'Red');
        isValid = false;
    }
    else {

        let passwordValue = $("#userPassword").val();
        if (passwordValue.length < 8 || passwordValue.length > 15) {
            $('#userPassword').css('border-color', 'Red');
            $("#checkPassword").show();
            $("#checkPassword").html(
                "Length of password must be between 8 and 15"
            );
            $("#checkPassword").css("color", "red");
            isValid = false;
        } else {
            $("#checkPassword").hide();
            $('#userPassword').css('border-color', 'lightgrey');
        }

    }
    if ($('#userCity').val().trim() == "") {
        $('#userCity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        let city = $("#userCity").val();
        if (city.length < 2 || city.length > 50) {
            $('#userCity').css('border-color', 'Red');
            $("#checkCity").show();
            $("#checkCity").html(
                "Length of city must be between 2 and 50"
            );
            $("#checkCity").css("color", "red");
            isValid = false;
        } else {
            $("#checkCity").hide();
            $('#userCity').css('border-color', 'lightgrey');
        }
    }
    return isValid;
}

$('#btnSellerTicketInformation').click(function () {

    $('#selInfo_ticket_draw_date').val('');
    $('#selInfo_ticket_serial_no_from').val('');
    $('#selInfo_ticket_serial_no_to').val('');
    $('#SellerTicketInfo').html('');
    $('#SellerTicketInfoModal').modal('show');
    //document.getElementById("divTotalCollection").style.display = "none";
});

function ShowTicketSellerInfo() {
    
    $("#SellerTicketInfo").show();
    var res = validateSellerTicketInformation();
    if (res == false) {
        return false;
    }
    var ticket_draw_date_from = $('#selInfo_ticket_draw_date').val();
    var ticket_draw_date_to = $('#selInfo_ticket_draw_date').val();
    var ticket_serial_no_from = $('#selInfo_ticket_serial_no_from').val();
    var ticket_serial_no_to = $('#selInfo_ticket_serial_no_to').val();
    $.ajax({
        url: "../SuperAdmin/SearchTicketNumberSellerInfo?ticket_draw_date_from=" + ticket_draw_date_from + "&ticket_draw_date_to=" + ticket_draw_date_to + "&ticket_serial_no_from=" + ticket_serial_no_from + "&ticket_serial_no_to=" + ticket_serial_no_to,
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = jQuery.parseJSON(result);
            var html = '';
            if (json.message == "data not found") {
                html += '<div class="column"> <div class="card"><h5>record not found</h5></div></div>';
            }
            else {
                $.each(json.data, function (key, item) {
                    html += '<div class="col-12"> <table class="table table-sm table-bordered"><tr><th>Seller ID: </th><td>' + item.seller_id + '</td></tr><tr><th>Seller Name: </th><td>' + item.seller_name + '</td></tr><tr><th>Agent Name: </th><td>' + item.agent_name + '</td></tr><tr><th>Sam Type: </th><td>' + item.sam_type + '</td></tr><tr><th>Ticket Serial No </th><td>' + item.ticket_serial_no + '</td></tr><tr><th>Draw Time: </th><td>' + item.ticket_draw_time + '</td></tr></table></div>';
                });
            }
            $('#SellerTicketInfo').html(html);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function validateSellerTicketInformation() {
    var isValid = true;
    if ($('#selInfo_ticket_draw_date').val().trim() == "") {
        $('#selInfo_ticket_draw_date').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#selInfo_ticket_draw_date').css('border-color', 'lightgrey');
    }
    if ($('#selInfo_ticket_serial_no_from').val().trim() == "") {
        $('#selInfo_ticket_serial_no_from').css('border-color', 'Red');
        isValid = false;
    }
    else {
        var regex = /^[0-9]{5}$/;
        if (regex.test($("#selInfo_ticket_serial_no_from").val())) {
            $("#check_selInfo_ticket_serial_no_from").hide();
            $('#selInfo_ticket_serial_no_from').css('border-color', 'lightgrey');
        } else {
            $("#check_selInfo_ticket_serial_no_from").show();
            $("#check_selInfo_ticket_serial_no_from").html(
                "**enter 5 digit numeric serial no."
            );
            $("#check_selInfo_ticket_serial_no_from").css("color", "red");
            isValid = false;
        }
    }
    if ($('#selInfo_ticket_serial_no_to').val().trim() == "") {
        $('#selInfo_ticket_serial_no_to').css('border-color', 'Red');
        isValid = false;
    }
    else {
        var regex = /^[0-9]{5}$/;
        if (regex.test($("#selInfo_ticket_serial_no_to").val())) {
            $("#check_selInfo_ticket_serial_no_to").hide();
            $('#selInfo_ticket_serial_no_to').css('border-color', 'lightgrey');
        } else {
            $("#check_selInfo_ticket_serial_no_to").show();
            $("#check_selInfo_ticket_serial_no_to").html(
                "**enter 5 digit numeric serial no."
            );
            $("#check_selInfo_ticket_serial_no_to").css("color", "red");
            isValid = false;
        }
    }
    return isValid;
}  
