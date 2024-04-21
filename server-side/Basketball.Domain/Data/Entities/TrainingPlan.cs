using System.ComponentModel.DataAnnotations;

namespace Basketball.Domain.Data.Entities
{
    public class TrainingPlan
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        [MaxLength(40)]
        public required string ShortDescription { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }
        public int Version { get; set; }
        public Guid CoachId { get; set; }
        public User Coach { get; set; } = null!;
        public Guid? InitialTrainingPlanId { get; set; }
        public TrainingPlan? InitialTrainingPlan { get; set; }
        public ICollection<Skill> Skills { get; set; } = [];
    }
}
