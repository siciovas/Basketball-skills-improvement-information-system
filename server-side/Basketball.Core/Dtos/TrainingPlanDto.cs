namespace Basketball.Core.Dtos
{
    public class TrainingPlanDto
    {
        public Guid Id { get; set; }
        public required byte[] Avatar { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string ShortDescription { get; set; }
        public int ExpirationDate { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }
        public int Version { get; set; }
        public required string Coach { get; set; }
        public List<TrainingPlanSkillDto> Skills { get; set; } = [];
    }
}
