namespace Basketball.Domain.Data.Entities
{
    public class Skill
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public User Coach { get; set; } = null!;
        public required Guid CoachId { get; set; }
        public ICollection<Exercise> Exercises { get; set; } = [];
        public List<TrainingPlan> TrainingPlans { get; set; } = [];
    }
}
