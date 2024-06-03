using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Data;
using TicketCoreApp.Models;
using Microsoft.AspNetCore.Http;
using static TicketCoreApp.Controllers.AgentController;
using Microsoft.Extensions.Hosting;

namespace TicketCoreApp.Controllers
{
    public class AdminController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration config;
        private readonly string apiBaseUrl;

        public AdminController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            config = configuration;
            apiBaseUrl = config.GetSection("ApiConfiguration").GetSection("ApiBaseUrl").Value;
        }
        public IActionResult Dashboard()
        {
            if (HttpContext.Session.GetString("UserId") == null && Convert.ToString(HttpContext.Session.GetString("UserId")) != "1")
            {
                //FormsAuthentication.SignOut();
                //Session.Abandon();
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public IActionResult Dashboard2()
        {
            if (HttpContext.Session.GetString("UserId") == null && Convert.ToString(HttpContext.Session.GetString("UserId")) != "1")
            {
                //FormsAuthentication.SignOut();
                //Session.Abandon();
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public IActionResult Create()
        {
            if (HttpContext.Session.GetString("UserId") == null && Convert.ToString(HttpContext.Session.GetString("UserId")) != "1")
            {
                //FormsAuthentication.SignOut();
                //Session.Abandon();
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public IActionResult CreateUser()
        {
            if (HttpContext.Session.GetString("UserId") == null && Convert.ToString(HttpContext.Session.GetString("UserId")) != "1")
            {
                //FormsAuthentication.SignOut();
                //Session.Abandon();
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> CreateUser([FromBody] CreateUser reqObj)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, apiBaseUrl + "api/v1/user/create");
            var serializeContent = JsonConvert.SerializeObject(reqObj);
            var content = new StringContent(serializeContent, null, "application/json");
            request.Content = content;
            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                return Json(true);

            }
            else
            {
                return Json(false);
            }
        }


        public IActionResult AssignRole()
        {
            if (HttpContext.Session.GetString("UserId") == null && Convert.ToString(HttpContext.Session.GetString("UserId")) != "1")
            {
                //FormsAuthentication.SignOut();
                //Session.Abandon();
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public IActionResult CreateTicket()
        {
            if (HttpContext.Session.GetString("UserId") == null && Convert.ToString(HttpContext.Session.GetString("UserId")) != "1")
            {
                //FormsAuthentication.SignOut();
                //Session.Abandon();
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> CreateTicket([FromBody] CreateTicketMaster reqObj)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, apiBaseUrl + "api/v1/ticket/create");
            var serializeContent = JsonConvert.SerializeObject(reqObj);
            var content = new StringContent(serializeContent, null, "application/json");
            request.Content = content;
            var response = await client.SendAsync(request);
            var result = await response.Content.ReadAsStringAsync();
            return Json(result);
        }


        #region #Master Data
        public async Task<JsonResult> GetRoles()
        {
            List<Role> roles = new List<Role>();
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/role/get");
            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                JObject joResponse = JObject.Parse(result);
                var jsonArr = joResponse["data"].ToString();
                roles = JsonConvert.DeserializeObject<List<Role>>(jsonArr);
                return Json(roles);
            }
            else
            {
                return Json(roles);
            }
        }

        public async Task<JsonResult> GetDrawTimes()
        {
            List<DrawTime> times = new List<DrawTime>();
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/draw-time/get");
            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                JObject joResponse = JObject.Parse(result);
                var jsonArr = joResponse["data"].ToString();
                times = JsonConvert.DeserializeObject<List<DrawTime>>(jsonArr);
                return Json(times);
            }
            else
            {
                return Json(times);
            }
        }

        public async Task<JsonResult> GetSamTypes()
        {
            List<DrawTime> times = new List<DrawTime>();
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/sam-type/get");
            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                JObject joResponse = JObject.Parse(result);
                var jsonArr = joResponse["data"].ToString();
                times = JsonConvert.DeserializeObject<List<DrawTime>>(jsonArr);
                return Json(times);
            }
            else
            {
                return Json(times);
            }
        }
        #endregion
        public class TicketDetails
        {
            public string status { get; set; }
            public string message { get; set; }
            public TicketMasterDetail[] data { get; set; }
        }
        public class TicketMasterDetail
        {
            public Int64 ticket_id { get; set; }
            public int? ticket_serial_no { get; set; }
            public int? no_of_ticket { get; set; }
            public DateTime? ticket_draw_date { get; set; }
            public string ticket_draw_time { get; set; }
            public string ticket_draw_no { get; set; }
            public string ticket_code { get; set; }
            public string sam_type { get; set; }
            public int? no_of_available_ticket { get; set; }
            public int? ticket_sold { get; set; }
        }

        public async Task<JsonResult> GetMasterTicketList()
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/ticket/master/list");
            var response = await client.SendAsync(request);
            var result = await response.Content.ReadAsStringAsync();
            var ticketMasterDetailList = new List<TicketMasterDetail>().ToArray();
            var ticketMasterDetail = JsonConvert.DeserializeObject<TicketDetails>(result);
            //ViewBag.ticketcount = 0;
            TempData["ticketcount"] = 0;
            if (ticketMasterDetail.status == "200" && ticketMasterDetail.message == "data found")
            {
                //ViewBag.ticketcount = ticketMasterDetail.data.Count();
                TempData["ticketcount"] = ticketMasterDetail.data.Count(); ;
                ticketMasterDetailList = ticketMasterDetail.data;
            }

            return Json(ticketMasterDetailList);
        }



        public async Task<JsonResult> GetUserList()
        {
            List<UserDetail> users = new List<UserDetail>();
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/user/get");
            var response = await client.SendAsync(request);
            var result = await response.Content.ReadAsStringAsync();
            return Json(result);
        }

        public async Task<JsonResult> GetUserById(Int64 user_id)
        {
            try
            {
                var users = new List<UserDetailById>();
                var user = new UserDetailById();
                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/user/get-by-id?user_id=" + user_id + "");
                var response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    JObject joResponse = JObject.Parse(result);
                    var jsonArr = joResponse["data"].ToString();
                    users = JsonConvert.DeserializeObject<List<UserDetailById>>(jsonArr);
                    user = (UserDetailById)users.FirstOrDefault();
                    return Json(user);
                }
                else
                {
                    return Json(user);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public async Task<JsonResult> GetUserByRoleId(Int64 roleId)
        {
            try
            {
                var users = new List<UserDetailById>();
                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/user/get-by-role?role_id=" + roleId + "");
                var response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    JObject joResponse = JObject.Parse(result);
                    var jsonArr = joResponse["data"].ToString();
                    users = JsonConvert.DeserializeObject<List<UserDetailById>>(jsonArr);
                    return Json(users);
                }
                else
                {
                    return Json(users);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }


        public async Task<JsonResult> GetUserByParentId(Int64 parentId)
        {
            try
            {
                var users = new List<UserDetailById>();
                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/user/get-by-parentId?parentId=" + parentId + "");
                var response = await client.SendAsync(request);

                var result = await response.Content.ReadAsStringAsync();
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public async Task<JsonResult> GetTotalCollection(DateTime ticket_draw_date)
        {
            try
            {
                var users = new List<UserDetailById>();
                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/ticket/getCollection?ticket_draw_date=" + ticket_draw_date + "");
                var response = await client.SendAsync(request);

                var result = await response.Content.ReadAsStringAsync();
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public async Task<JsonResult> SearchTicketNumberSellerInfo(DateTime ticket_draw_date_from, DateTime ticket_draw_date_to, string ticket_serial_no_from, string ticket_serial_no_to)
        {
            try
            {

                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/ticket/searchTicketNumberSeller?ticket_draw_date_from=" + ticket_draw_date_from + "&ticket_draw_date_to=" + ticket_draw_date_to + "&ticket_serial_no_from=" + ticket_serial_no_from + "&ticket_serial_no_to=" + ticket_serial_no_to + "");
                var response = await client.SendAsync(request);

                var result = await response.Content.ReadAsStringAsync();
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }



        //public async Task<JsonResult> CreateUser([FromBody] CreateUser reqObj)
        //{
        //    var client = new HttpClient();
        //    var request = new HttpRequestMessage(HttpMethod.Post, apiBaseUrl + "api/v1/user/create");
        //    var serializeContent = JsonConvert.SerializeObject(reqObj);
        //    var content = new StringContent(serializeContent, null, "application/json");
        //    request.Content = content;
        //    var response = await client.SendAsync(request);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        return Json(true);

        //    }
        //    else
        //    {
        //        return Json(false);
        //    }
        //}

       
        public async Task<JsonResult> AssignUserRoles([FromBody] AssignRole reqObj)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, apiBaseUrl + "api/v1/role-user/create");
            var serializeContent = JsonConvert.SerializeObject(reqObj);
            var content = new StringContent(serializeContent, null, "application/json");
            request.Content = content;
            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                return Json(true);

            }
            else
            {
                return Json(false);
            }
        }


        public async Task<JsonResult> AssignParentRoles([FromBody] AssignParentRole reqObj)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, apiBaseUrl + "api/v1/role-user/assign-parent-role");
            var serializeContent = JsonConvert.SerializeObject(reqObj);
            var content = new StringContent(serializeContent, null, "application/json");
            request.Content = content;
            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                return Json(true);

            }
            else
            {
                return Json(false);
            }
        }
    }
}
