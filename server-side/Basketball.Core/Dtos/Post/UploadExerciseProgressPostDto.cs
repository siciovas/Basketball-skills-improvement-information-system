using Microsoft.AspNetCore.Http;

namespace Basketball.Core.Dtos.Post
{
    public class UploadExerciseProgressPostDto
    {
        public Guid TrainingPlanId { get; set; }
        public Guid ExerciseId { get; set; }
        public Guid SkillId { get; set; }
        public IFormFile ExerciseProgressVideo { get; set; } = null!;
    }
}
