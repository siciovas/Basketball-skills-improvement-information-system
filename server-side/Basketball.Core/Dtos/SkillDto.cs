namespace Basketball.Core.Dtos
{
    public class SkillDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public bool IsUsed { get; set; }
    }
}
