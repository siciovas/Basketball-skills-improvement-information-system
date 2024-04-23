namespace Basketball.Domain.Data.Entities
{
    public class Feedback
    {
        public Guid Id { get; set; }
        public required string FeedbackText { get; set; }
        public DateOnly Date { get; set; }
        public int Rating { get; set; }
        public Guid StudentId { get; set; }
        public User Student { get; set; } = null!;
        public Guid CoachId { get; set; }
        public User Coach { get; set; } = null!;


    }
}
