using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using TicketCoreApp.Models;

namespace TicketCoreApp.Controllers
{
    public class SellerController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration config;
        private readonly string apiBaseUrl;

        public SellerController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            config = configuration;
            apiBaseUrl = config.GetSection("ApiConfiguration").GetSection("ApiBaseUrl").Value;
        }
        public ActionResult Dashboard()
        {
            if (HttpContext.Session.GetString("UserId") == null && Convert.ToString(HttpContext.Session.GetString("UserId")) != "5")
            {
                //FormsAuthentication.SignOut();
                //Session.Abandon();
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult BuyTicket()
        {
            return View();
        }

        public ActionResult PurchasedTicket()
        {
            return View();
        }

        public ActionResult BuyerTicketCollection()
        {
            return View();
        }

        public async Task<JsonResult> ViewTicketList(int sam_type, DateTime ticket_draw_date, string ticket_draw_time, Int64 sellerId, string ticketSerialNoFrom = "", string ticketSerialNoTo = "")
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/ticket/get-by-srno?sam_type=" + sam_type + "&ticket_draw_date=" + ticket_draw_date + "&ticket_draw_time=" + ticket_draw_time + "&sellerId=" + sellerId + "&ticketSerialNoFrom=" + ticketSerialNoFrom + "&ticketSerialNoTo=" + ticketSerialNoTo + "");
            var response = await client.SendAsync(request);
            var result = await response.Content.ReadAsStringAsync();
            return Json(result);
        }

        public async Task<JsonResult> ViewPurchasedTicket(Int64 sellerId, int? sam_type = null, DateTime? ticket_draw_date = null, string ticket_draw_time = "", string ticketSerialNoFrom = "", string ticketSerialNoTo = "")
        {
            List<PurchasedTicketHtml> tickets = new List<PurchasedTicketHtml>();
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/buyer/get/ticket/by/srno?sellerId=" + sellerId + "&sam_type=" + sam_type + "&ticket_draw_date=" + ticket_draw_date + "&ticket_draw_time=" + ticket_draw_time + "&ticketSerialNoFrom=" + ticketSerialNoFrom + "&ticketSerialNoTo=" + ticketSerialNoTo + "");
            var response = await client.SendAsync(request);
            var result = await response.Content.ReadAsStringAsync();
            return Json(result);
        }


        public async Task<JsonResult> ViewBuyerTicketCollection(Int64 sellerId, int? sam_type = null, DateTime? ticket_draw_date = null, string ticket_draw_time = "")
        {
            if (Convert.ToString(sam_type) == "0" || Convert.ToString(sam_type) == "")
            {
                sam_type = null;
            }
            if (Convert.ToString(ticket_draw_date) == "0" || Convert.ToString(ticket_draw_date) == "")
            {
                ticket_draw_date = null;
            }
            if (Convert.ToString(ticket_draw_time) == "0" || Convert.ToString(ticket_draw_time) == "")
            {
                ticket_draw_time = null;
            }
            List<TicketCollection> tickets = new List<TicketCollection>();
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, apiBaseUrl + "api/v1/buyer/get/master/ticket/list/bysam?sellerId=" + sellerId + "&sam_type=" + sam_type + "&ticket_draw_date=" + ticket_draw_date + "&ticket_draw_time=" + ticket_draw_time + "");
            var response = await client.SendAsync(request);
            var result = await response.Content.ReadAsStringAsync();
            return Json(result);
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

        public async Task<JsonResult> BuyBuyerTicket([FromBody] CreateBuyerTicketMaster reqObj)
        {
            var ticketHtmls = new List<TicketHtmlDetail>();
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, apiBaseUrl + "api/v1/buyer/buy/ticket");
            var serializeContent = JsonConvert.SerializeObject(reqObj);
            var content = new StringContent(serializeContent, null, "application/json");
            request.Content = content;
            var response = await client.SendAsync(request);
            var result = await response.Content.ReadAsStringAsync();
            return Json(result);
        }
    }
}
