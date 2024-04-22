using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;

namespace Basketball.Core.Interfaces.Services
{
    public interface IExerciseFlowService
    {
        Task<string> UploadExerciseProgress(UploadExerciseProgressPostDto progressDto, Guid userId);
        Task<ExerciseEvaluationDto> GetExercisesForEvaluation(Guid userId, Guid trainingPlanId);
        Task<EvaluationDto> EvaluateExercise(Guid id, EvaluationDto evaluationDto);
    }
}
