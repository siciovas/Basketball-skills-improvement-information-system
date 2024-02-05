using Basketball.Domain.Data.Entities.Enums;

namespace Basketball.Core.Dtos.Post
{
    public class ExercisePostDto
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public Difficulty Difficulty { get; set; }
    }
}
