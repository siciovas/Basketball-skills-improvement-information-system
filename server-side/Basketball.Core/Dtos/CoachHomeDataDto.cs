namespace Basketball.Core.Dtos
{
    public class CoachHomeDataDto
    {
        public List<HomeData> TrainingPlans { get; set; } = [];
        public List<HomeData> Skills { get; set; } = [];
        public List<HomeData> Exercises { get; set; } = [];
    }

    public class HomeData
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
    }
}
