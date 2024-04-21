namespace Basketball.Domain.Data.Entities
{
    public class CommissionFee
    {
        public Guid Id { get; set; }
        public int Value { get; set; }
        public bool IsActive { get; set; }
    }
}
