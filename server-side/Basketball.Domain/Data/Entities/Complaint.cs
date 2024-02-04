namespace Basketball.Domain.Data.Entities
{
    public class Complaint
    {
        public Guid Id { get; set; }
        public required string Text { get; set; }
        public Guid StudentId { get; set; }
        public User Student { get; set; } = null!;
        public Guid CoachId { get; set; }
        public User Coach { get; set; } = null!;
    }
}
