namespace Basketball.Domain.Data.Entities
{
    public class TrainingPlanSkill
    {
        public required Guid SkillId { get; set; }
        public required Guid TrainingPlanId { get; set; }
    }
}
