using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface IExerciseFlowRepository
    {
        Task<string> UploadExerciseProgressUrl(ExerciseProgress exerciseProgress);
        Task<List<ExerciseProgress>> GetAllByUserIdAndTrainingPlanId(Guid userId, Guid trainingPlanId);
        Task<ExerciseProgress?> GetProgress(Guid userId, Guid trainingPlanId, Guid skillId, Guid exerciseId);
        Task DeleteProgress(ExerciseProgress progress);
        Task<ExerciseProgress> GetProgressById(Guid id);
        Task<ExerciseProgress> Update(ExerciseProgress exerciseProgress);
        Task<Dictionary<Guid, int>> GetCounterByUserAndPositive(Guid userId);
        Task<int> GetCounterByUserAndTrainingPlanAndNotEvaluated(Guid userId, Guid coachId);
    }
}
