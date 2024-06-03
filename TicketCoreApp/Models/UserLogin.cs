namespace TicketCoreApp.Models
{
    public class UserLogin
    {
        public string email { get; set; }
        public string mobile { get; set; }
        public string password { get; set; }
    }

    public class LoginRequest
    {
        public string email { get; set; }
        public string mobile { get; set; }
        public string password { get; set; }
    }
}
