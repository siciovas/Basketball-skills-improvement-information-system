namespace Basketball.Core.Dtos
{
    public class CountsDto
    {
        public int Coaches { get; set; }
        public int Students { get; set; }
        public int TrainingPlans { get; set; }
        public int Orders { get; set; }
        public Dictionary<int, decimal?> Commissions { get; set; } = [];
    }
}
