namespace Basketball.Core.Dtos.Post
{
    public class TrainingPlanPostDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string ShortDescription { get; set; }
        public double Price { get; set; }
        public bool IsActive { get; set; }
        public required List<Guid> Skills { get; set; }
    }
}
