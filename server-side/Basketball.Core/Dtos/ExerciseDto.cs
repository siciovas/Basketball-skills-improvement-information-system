namespace Basketball.Core.Dtos
{
    public class ExerciseDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public Difficulty Difficulty { get; set; }
        public bool IsUsed { get; set; }
    }
}
