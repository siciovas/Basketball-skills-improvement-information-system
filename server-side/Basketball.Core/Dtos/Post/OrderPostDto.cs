namespace Basketball.Core.Dtos.Post
{
    public class OrderPostDto
    {
        public decimal Price { get; set; }
        public Guid TrainingPlanId { get; set; }
        public int? CommissionFee { get; set; }
    }
}
