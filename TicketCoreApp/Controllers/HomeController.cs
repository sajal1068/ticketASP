using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Diagnostics;
using TicketCoreApp.Models;
using Microsoft.Extensions.Configuration;
using System.Text.RegularExpressions;

namespace TicketCoreApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration config;
        private readonly string apiBaseUrl;

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            config = configuration;
            apiBaseUrl = config.GetSection("ApiConfiguration").GetSection("ApiBaseUrl").Value;
        }


        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string username, string password)
        {
            try
            {
                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Post, apiBaseUrl + "api/v1/login");

                string serializedContent;
                if (Regex.IsMatch(username, @"^\d+$"))
                {
                    var obj = new
                    {
                        mobile = username,
                        password = password
                    };
                    serializedContent = JsonConvert.SerializeObject(obj);
                }
                else
                {
                    var obj = new
                    {
                        email = username,
                        password = password
                    };
                    serializedContent = JsonConvert.SerializeObject(obj);
                }
                var content = new StringContent(serializedContent, null, "application/json");
                request.Content = content;
                var response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    JObject joResponse = JObject.Parse(result);
                    if (Convert.ToString(joResponse["status"]) == "401")
                    {
                        ViewBag.message = string.Format("Login Failed ");
                        return View();
                    }
                    else if (Convert.ToString(joResponse["status"]) == "200")
                    {
                        HttpContext.Session.SetString("UserId", Convert.ToString(joResponse["data"]["user_id"]));
                        HttpContext.Session.SetString("UserName", Convert.ToString(joResponse["data"]["first_name"]) + " " + Convert.ToString(joResponse["data"]["last_name"]));
                        HttpContext.Session.SetString("RoleId", Convert.ToString(joResponse["data"]["role_id"]));
                        HttpContext.Session.SetString("RoleName", Convert.ToString(joResponse["data"]["role_name"]));

                        if (Convert.ToString(joResponse["data"]["role_id"]) == "1")
                        {
                            return RedirectToAction("Dashboard", "Admin");
                        }
                        if (Convert.ToString(joResponse["data"]["role_id"]) == "4")
                        {
                            return RedirectToAction("Dashboard", "Agent");
                        }
                        else if (Convert.ToString(joResponse["data"]["role_id"]) == "5")
                        {
                            return RedirectToAction("Dashboard", "Seller");
                        }
                        else
                        {
                            return RedirectToAction("Login", "Home");
                        }
                    }
                    else
                    {
                        ViewBag.message = string.Format("Login Failed ");
                        return View();
                    }

                }
                else
                {
                    ViewBag.message = string.Format("Login Failed ");
                    return View();
                }
            }
            catch (Exception ex)
            {
                ViewBag.message = string.Format("Login Failed ");
                return View();
            }
        }

        //[HttpPost]
        //public async Task<JsonResult> Login([FromBody] UserLogin obj)
        //{
        //    var client = new HttpClient();
        //    var request = new HttpRequestMessage(HttpMethod.Post, apiBaseUrl + "api/v1/login");
        //    var serializedContent = JsonConvert.SerializeObject(obj);
        //    var content = new StringContent(serializedContent, null, "application/json");
        //    request.Content = content;
        //    var response = await client.SendAsync(request);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        var result = await response.Content.ReadAsStringAsync();
        //        JObject joResponse = JObject.Parse(result);
        //        if (Convert.ToString(joResponse["status"]) == "401")
        //        {
        //            var data = new
        //            {
        //                status = Convert.ToString(joResponse["status"])
        //            };
        //            return Json(data);
        //        }
        //        else if (Convert.ToString(joResponse["status"]) == "200")
        //        {
        //            HttpContext.Session.SetString("UserId", Convert.ToString(joResponse["data"]["user_id"]));
        //            HttpContext.Session.SetString("UserName", Convert.ToString(joResponse["data"]["first_name"]) + " " + Convert.ToString(joResponse["data"]["last_name"]));
        //            HttpContext.Session.SetString("RoleId", Convert.ToString(joResponse["data"]["role_id"]));
        //            HttpContext.Session.SetString("RoleName", Convert.ToString(joResponse["data"]["role_name"]));
        //            var data = new
        //            {
        //                status = "200",
        //                message = Convert.ToString(joResponse["message"]),
        //                userid = Convert.ToString(joResponse["data"]["user_id"]),
        //                username = Convert.ToString(joResponse["data"]["first_name"]) + " " + Convert.ToString(joResponse["data"]["last_name"]),
        //                roleid = Convert.ToString(joResponse["data"]["role_id"]),
        //                rolename = Convert.ToString(joResponse["data"]["role_name"])
        //            };
        //            return Json(data);
        //        }
        //        else
        //        {
        //            var data = new
        //            {
        //                status = "401"
        //            };
        //            return Json(data);
        //        }
        //    }
        //    else
        //    {
        //        var data = new
        //        {
        //            status = "401"
        //        };
        //        return Json(data);
        //    }
        //}


        public ActionResult Logout()
        {
            //FormsAuthentication.SignOut();
            HttpContext.Session.Remove("UserId");
            HttpContext.Session.Clear();
            return RedirectToAction("Login", "Home");
        }
    }
}