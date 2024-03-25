namespace Basketball.Core.Dtos
{
    public class PayseraDto
    {
        public int Amount { get; set; }
        public required string Email { get; set; }
        public required string OrderNumber { get; set; }
    }
}
