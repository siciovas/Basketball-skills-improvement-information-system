namespace Basketball.Core.Dtos.Post
{
    public class FeedbackPostDto
    {
        public required string FeedbackText { get; set; }
        public int Rating { get; set; }
        public required Guid TrainingPlanId { get; set; }
    }
}
