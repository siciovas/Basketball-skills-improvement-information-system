namespace Basketball.Domain.Data.Entities
{
    public class ExerciseProgress
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public Guid TrainingPlanId { get; set; }
        public TrainingPlan TrainingPlan { get; set; } = null!;
        public Guid ExerciseId { get; set; }
        public Exercise Exercise { get; set; } = null!;
        public Guid SkillId { get; set; }
        public Skill Skill { get; set; } = null!;
        public string ProgressVideoUrl { get; set; } = null!;
        public int? Grade { get; set; }
        public string? Comment { get; set; }
    }
}
