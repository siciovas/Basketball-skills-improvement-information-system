namespace Basketball.Core.Dtos
{
    public class TrainingPlanSummaryDto
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public double Price { get; set; }
        public required string ShortDescription { get; set; }
    }
}
