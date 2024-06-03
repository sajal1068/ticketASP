namespace TicketCoreApp.Models
{
    public class Role
    {
        public int role_id { get; set; }
        public string name { get; set; }
    }

    public class AssignRole
    {
        public Int64 user_id { get; set; }
        public int role_id { get; set; }
    }

    public class AssignParentRole
    {
        public Int64 user_id { get; set; }
        public Int64 parent_id { get; set; }


    }
}
