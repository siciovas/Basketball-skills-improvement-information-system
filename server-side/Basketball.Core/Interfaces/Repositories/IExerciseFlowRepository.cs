using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface IExerciseFlowRepository
    {
        Task<string> UploadExerciseProgressUrl(ExerciseProgress exerciseProgress);
    }
}
