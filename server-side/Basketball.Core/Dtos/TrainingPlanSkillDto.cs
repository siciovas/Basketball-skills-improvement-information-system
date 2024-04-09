namespace Basketball.Core.Dtos
{
    public class TrainingPlanSkillDto
    {
        public required string Name { get; set; }
        public List<string> Exercises { get; set; } = [];
    }
}
