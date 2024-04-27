using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;

namespace Basketball.Core.Interfaces.Services
{
    public interface IExerciseFlowService
    {
        Task<string> UploadExerciseProgress(UploadExerciseProgressPostDto progressDto, Guid userId);
        Task<AllEvaluationDto> GetExercisesForEvaluation(Guid userId, Guid coachId);
        Task<EvaluationDto> EvaluateExercise(Guid id, EvaluationDto evaluationDto);
        Task<List<ActiveClient>> GetActiveClients(Guid userId);
    }
}
