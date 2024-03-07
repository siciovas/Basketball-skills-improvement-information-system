namespace Basketball.Core.Dtos
{
    public class ComplaintDto
    {
        public required Guid Id { get; set; }
        public required string Text { get; set; }
        public DateOnly Date { get; set; }
        public required string StudentFullName { get; set; }
        public required string CoachFullName { get; set; }
    }
}
