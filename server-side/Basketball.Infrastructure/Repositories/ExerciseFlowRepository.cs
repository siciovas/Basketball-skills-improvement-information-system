using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class ExerciseFlowRepository(DatabaseContext db) : IExerciseFlowRepository
    {
        private readonly DatabaseContext _db = db;

        public async Task DeleteProgress(ExerciseProgress progress)
        {
            _db.ExerciseProgresses.Remove(progress);
            await _db.SaveChangesAsync();
        }

        public async Task<List<ExerciseProgress>> GetAllByUserIdAndTrainingPlanId(Guid userId, Guid trainingPlanId)
        {
            return await _db.ExerciseProgresses.Where(x => x.UserId == userId && x.TrainingPlanId == trainingPlanId).ToListAsync();
        }

        public async Task<ExerciseProgress?> GetProgress(Guid userId, Guid trainingPlanId, Guid skillId, Guid exerciseId)
        {
            return await _db.ExerciseProgresses.Where(x => x.UserId == userId && x.TrainingPlanId == trainingPlanId && x.SkillId == skillId && x.ExerciseId == exerciseId).FirstOrDefaultAsync();
        }

        public async Task<string> UploadExerciseProgressUrl(ExerciseProgress exerciseProgress)
        {
            var createdProgress = _db.Add(exerciseProgress);

            await _db.SaveChangesAsync();

            return createdProgress.Entity.ProgressVideoUrl;
        }
    }
}
