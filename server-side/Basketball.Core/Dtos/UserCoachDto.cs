using Basketball.Domain.Data.Entities.Enums;

namespace Basketball.Core.Dtos
{
    public class UserCoachDto
    {
        public Guid Id { get; set; }
        public required string FullName { get; set; }
        public required string Email { get; set; }
        public DateOnly BirthDate { get; set; }
        public Education? Education { get; set; }
        public required string Specialization { get; set; }
        public double? Rating { get; set; }
        public CoachStatus? CoachStatus { get; set; }
        public DateOnly RegisterDate { get; set; }
        public string? Description { get; set; }
        public int? Experience { get; set; }
        public string? PhoneNumber { get; set; }
        public int TrainingPlansCount { get; set; }
        public List<TrainingPlanSummaryDto> TrainingPlans { get; set; } = [];

    }
}
