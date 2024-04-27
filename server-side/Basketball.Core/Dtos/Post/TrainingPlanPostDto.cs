using System.ComponentModel.DataAnnotations;

namespace Basketball.Core.Dtos.Post
{
    public class TrainingPlanPostDto
    {
        public required byte[] Avatar { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string ShortDescription { get; set; }
        [RegularExpression(@"^[1-9]\d*$", ErrorMessage = "Diena negali būti 0 arba mažiau")]
        public int ExpirationDate { get; set; }
        [RegularExpression(@"^[1-9]\d*$", ErrorMessage = "Kaina negali būti 0 arba mažiau")]
        public decimal Price { get; set; }
        public bool IsActive { get; set; }
        public required List<Guid> Skills { get; set; }
        public bool IsPersonal { get; set; }
    }
}
