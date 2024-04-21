using Basketball.Core.Dtos.Post;

namespace Basketball.Core.Dtos.Update
{
    public class TrainingPlanUpdateDto : TrainingPlanPostDto
    {
        public bool IsNewVersion { get; set; }
    }
}
