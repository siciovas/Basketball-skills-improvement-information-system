namespace Basketball.Core.Dtos.Post
{
    public class SkillPostDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required List<Guid> Exercises { get; set; }
    }
}
