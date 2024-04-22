namespace Basketball.Core.Dtos
{
    public class MyPlansDto
    {
        public required byte[] Avatar { get; set; }
        public required string Name { get; set; }
        public required string CoachFullName { get; set; }
        public Guid TrainingPlanId { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public required string ProgressCounter { get; set; }
    }
}
