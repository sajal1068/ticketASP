using System.ComponentModel.DataAnnotations;

namespace TicketCoreApp.Models
{
    public class Ticket
    {
    }

    public class CreateTicketMaster
    {
        [Required]
        public DateTime ticket_draw_date { get; set; }

        [Required]
        public string ticket_draw_time { get; set; }

        [Required]
        public int? no_of_ticket { get; set; }

        [Required]
        public Int64? ticket_serial_no { get; set; }

        [Required]
        [MaxLength(3)]
        public string ticket_draw_no { get; set; }

        [Required]
        [MaxLength(4)]
        public string ticket_code { get; set; }

        [Required]
        public int ticket_sam_type { get; set; }
    }

    public class TicketMasterDetail
    {
        public Int64 ticket_id { get; set; }
        public Int64? ticket_serial_no { get; set; }
        public int? no_of_ticket { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime ticket_draw_date { get; set; }
        public string ticket_draw_time { get; set; }
        public string ticket_draw_no { get; set; }
        public string ticket_code { get; set; }
        public string sam_type { get; set; }
        public int? no_of_available_ticket { get; set; }
        public int? ticket_sold { get; set; }
    }

    public class TicketList
    {
        public Int64 ticket_id { get; set; }
        public Int64 ticket_master_id { get; set; }
        public Int64? ticket_serial_no { get; set; }
        public string ticket_serial_text { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime ticket_draw_date { get; set; }
        public string ticket_draw_time { get; set; }
        public string ticket_draw_no { get; set; }
        public string ticket_code { get; set; }
        public string sam_type { get; set; }
        public string ticket_html { get; set; }
    }
    public class TicketHtmlDetail
    {
        public Int64 buyer_ticket_id { get; set; }
        public Int64 buyer_ticket_master_id { get; set; }
        public Int64? ticket_serial_no { get; set; }
        public int? ticket_canceled { get; set; }
        public int? ticket_puchased { get; set; }
        public int? is_available { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime ticket_draw_date { get; set; }
        public string ticket_draw_time { get; set; }
        public string ticket_draw_no { get; set; }
        public string ticket_code { get; set; }
        public string sam_type { get; set; }
        public string ticket_html { get; set; }
    }

    public class PurchasedTicketHtml
    {
        public Int64 buyer_ticket_id { get; set; }
        public Int64 buyer_ticket_master_id { get; set; }
        public Int64? ticket_serial_no { get; set; }
        public int? is_available { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime ticket_draw_date { get; set; }
        public string ticket_draw_time { get; set; }
        public string ticket_draw_no { get; set; }
        public string ticket_code { get; set; }
        public string sam_type { get; set; }
        public string ticket_html { get; set; }
    }

    public class TicketCollection
    {
        public Int64 ticket_master_id { get; set; }
        public Int64 seller_id { get; set; }
        public int no_of_ticket { get; set; }
        public double total_amount { get; set; }
        public bool? is_active { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime ticket_draw_date { get; set; }
        public string ticket_draw_time { get; set; }
        public string ticket_draw_no { get; set; }
        public string ticket_code { get; set; }
        public string sam_typ { get; set; }
    }
}
