namespace Basketball.Core.Dtos.Post
{
    public class FeedbackPostDto
    {
        public required string FeedbackText { get; set; }
        public int Rating { get; set; }
        public Guid CoachId { get; set; }
    }
}
