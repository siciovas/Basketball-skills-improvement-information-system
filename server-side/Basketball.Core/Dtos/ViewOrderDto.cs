namespace Basketball.Core.Dtos
{
    public class ViewOrderDto
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public required string CoachFullName { get; set; }
        public required string BuyerFullName { get; set; }
        public required string TrainingPlanTitle { get; set; }
        public decimal Price { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Email { get; set; }
    }
}
