namespace Basketball.Core.Dtos
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public required string CoachFullName { get; set; }
        public string? StudentFullName { get; set; }
        public required string TrainingPlanTitle { get; set; }
        public decimal Price { get; set; }
        public decimal? CommissionFee { get; set; }
        public bool? IsPaid { get; set; }
    }
}
