using System.ComponentModel.DataAnnotations;

namespace TicketCoreApp.Models
{
    public class UserDetail
    {
        public Int64 user_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string mobile { get; set; }
        public int? role_id { get; set; }
        public string name { get; set; }
        public int? role_users_id { get; set; }
        public Int64? parent_id { get; }
    }

    public class UserDetailById
    {
        public Int64 user_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string mobile { get; set; }
    }

    public class CreateUser
    {
        [Required]
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string gender { get; set; } = "Male";
        [Required]
        public string email { get; set; }
        [Required]
        public string mobile { get; set; }
        [Required]
        public string password { get; set; }
        public DateTime? dob { get; set; } = Convert.ToDateTime("2000-01-01");
        [Required]
        public string address { get; set; }
        public int country_id { get; set; }
        public int state_id { get; set; }
        public string city { get; set; }
        [Required]
        public string zipcode { get; set; }
        public string description { get; set; }
        public int role { get; set; }
    }
}
