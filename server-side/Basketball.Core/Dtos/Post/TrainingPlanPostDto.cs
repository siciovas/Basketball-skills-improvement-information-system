namespace Basketball.Core.Dtos.Post
{
    public class TrainingPlanPostDto
    {
        public required byte[] Avatar { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string ShortDescription { get; set; }
        public int ExpirationDate { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }
        public required List<Guid> Skills { get; set; }
    }
}
