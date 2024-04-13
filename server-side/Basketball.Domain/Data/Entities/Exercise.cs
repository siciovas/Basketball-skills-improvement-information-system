using Basketball.Domain.Data.Entities.Enums;

namespace Basketball.Domain.Data.Entities
{
    public class Exercise
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public Difficulty Difficulty { get; set; }
        public required string ExerciseBlobUrl { get; set; }
        public Guid CoachId { get; set; }
        public User Coach { get; set; } = null!;
        public List<Skill> Skills { get; set; } = [];
    }
}
