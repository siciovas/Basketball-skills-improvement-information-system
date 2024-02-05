using Basketball.Domain.Data.Entities.Enums;

namespace Basketball.Core.Dtos
{
    public class ExerciseDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public Difficulty Difficulty { get; set; }
    }
}
