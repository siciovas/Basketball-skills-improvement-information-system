namespace Basketball.Core.Dtos
{
    public class TrainingPlanDto
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public double Price { get; set; }
        public bool IsActive { get; set; }
        public int Version { get; set; }
        public required string Coach { get; set; } 
    }
}
