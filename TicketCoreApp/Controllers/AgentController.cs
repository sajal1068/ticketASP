using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TicketCoreApp.Models;

namespace TicketCoreApp.Controllers
{
    public class AgentController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration config;
        private readonly string apiBaseUrl;

        public AgentController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            config = configuration;
            apiBaseUrl = config.GetSection("ApiConfiguration").GetSection("ApiBaseUrl").Value;
        }
        public IActionResult Dashboard()
        {
            return View();
        }

        public class SellerDetails
        {
            public string status { get; set; }
            public string message { get; set; }
            public Sellers[] data { get; set; }
        }

        public class Sellers
        {
            public Int64 user_id { get; set; }
            public string email { get; set; }
            public string mobile { get; set; }
            public string first_name { get; set; }
            public string last_name { get; set; }
            public Int64 role_users_id { get; set; }
            public int role_id { get; set; }
            public string role_name { get; set; }
            public Int64 parent_id { get; set; }
            public double total_amount { get; set; }
        }

        public class sellerCollection
        { 
            public Int64 seller_id { get; set; } 
            public double total_amount { get; set; }
        }

        public async Task<JsonResult> GetSellerByParentId(Int64 parentId)
        {
            try
            {
                var users = new List<UserDetailById>();
                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/user/get-by-parentId?parentId=" + parentId + "");
                var response = await client.SendAsync(request);

                var result = await response.Content.ReadAsStringAsync();
                JObject joResponse = JObject.Parse(result);
                if (Convert.ToString(joResponse["status"]) == "200")
                {
                    var sellers= JsonConvert.DeserializeObject<SellerDetails>(result);
                    foreach (var item in sellers.data)
                    {
                        var clientColl = new HttpClient();
                        var requestColl = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/buyer/get/master/ticket/list/bysam?sellerId=" + item.user_id);
                        var responseColl = await clientColl.SendAsync(requestColl);

                        double amount = 0;
                        var resultColl = await responseColl.Content.ReadAsStringAsync();
                        JObject joResponseColl = JObject.Parse(resultColl);
                        if (Convert.ToString(joResponseColl["status"]) == "200" && Convert.ToString(joResponseColl["message"]) == "data found")
                        {
                            foreach (var col in joResponseColl["data"].ToArray())
                            {
                                amount = amount + Convert.ToDouble(col["total_amount"]);
                            }
                        }
                        sellers.data.Where(w => w.user_id == item.user_id).ToList().ForEach(i => i.total_amount = amount);
                    }
                    var jsonString = JsonConvert.SerializeObject(sellers);
                    return Json(jsonString);
                }
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        [HttpGet]
        public async Task<JsonResult> GetTotalSellerCollection()
        {
            try
            {
                var dateString = DateTime.Now.ToString("yyyy-MM-dd");
                var users = new List<UserDetailById>();
                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/buyer/get/master/ticket/collection/by/role?userId="+ HttpContext.Session.GetString("UserId") + "&ticket_draw_date="+ dateString + "");
                var response = await client.SendAsync(request);

                var result = await response.Content.ReadAsStringAsync();
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

     
    }
}
