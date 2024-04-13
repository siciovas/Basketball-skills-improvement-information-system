using Basketball.Core.Dtos.Post;

namespace Basketball.Core.Interfaces.Services
{
    public interface IExerciseFlowService
    {
        Task<string> UploadExerciseProgress(UploadExerciseProgressPostDto progressDto, Guid userId);
    }
}
