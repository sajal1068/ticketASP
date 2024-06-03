using System.ComponentModel.DataAnnotations;

namespace TicketCoreApp.Models
{
    public class Seller
    {
    }

    public class CreateBuyerTicketMaster
    {
        [Required]
        public long ticket_master_id { get; set; }

        [Required]
        public long seller_id { get; set; }

        [Required]
        public int? no_of_ticket { get; set; }

        public string[] ticket_serialno { get; set; }
    }
}
