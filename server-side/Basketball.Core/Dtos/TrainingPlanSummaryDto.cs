namespace Basketball.Core.Dtos
{
    public class TrainingPlanSummaryDto
    {
        public Guid Id { get; set; }
        public required byte[] Avatar { get; set; }
        public required string Title { get; set; }
        public decimal Price { get; set; }
        public required string ShortDescription { get; set; }
    }
}
