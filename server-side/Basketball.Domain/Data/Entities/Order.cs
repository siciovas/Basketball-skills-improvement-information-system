namespace Basketball.Domain.Data.Entities
{
    public class Order
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Price { get; set; }
        public bool IsPaid { get; set; }
        public User User { get; set; } = null!;
        public Guid UserId { get; set; }
        public TrainingPlan TrainingPlan { get; set; } = null!;
        public Guid TrainingPlanId { get; set; }
        public decimal? CommissionFee { get; set; }
        public string? TrainingPlanRequest { get; set; }
    }
}
