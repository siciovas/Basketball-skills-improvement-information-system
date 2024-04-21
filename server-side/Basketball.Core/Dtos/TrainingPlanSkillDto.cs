namespace Basketball.Core.Dtos
{
    public class TrainingPlanSkillDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public List<string> Exercises { get; set; } = [];
    }
}
