namespace Basketball.Core.Dtos.Post
{
    public class TrainingPlanPostDto
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public double Price { get; set; }
        public bool IsActive { get; set; }
        public int Version { get; set; }
    }
}
