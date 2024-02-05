namespace Basketball.Core.Dtos.Post
{
    public class ComplaintPostDto
    {
        public required string Text { get; set; }
        public required Guid StudentId { get; set; }
        public required Guid CoachId { get; set; }
    }
}
