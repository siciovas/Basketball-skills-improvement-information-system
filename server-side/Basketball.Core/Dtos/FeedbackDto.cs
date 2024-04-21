namespace Basketball.Core.Dtos
{
    public class FeedbackDto
    {
        public required Guid Id { get; set; }
        public required string FeedbackText { get; set; }
        public required DateOnly Date { get; set; }
        public int Rating { get; set; }
        public required string Student { get; set; }
    }
}
