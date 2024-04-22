﻿using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface IExerciseFlowRepository
    {
        Task<string> UploadExerciseProgressUrl(ExerciseProgress exerciseProgress);
        Task<List<ExerciseProgress>> GetAllByUserIdAndTrainingPlanId(Guid userId, Guid trainingPlanId);
        Task<ExerciseProgress?> GetProgress(Guid userId, Guid trainingPlanId, Guid skillId, Guid exerciseId);
        Task DeleteProgress(ExerciseProgress progress);
    }
}
