using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class ExerciseFlowRepository(DatabaseContext db) : IExerciseFlowRepository
    {
        private readonly DatabaseContext _db = db;

        public async Task<string> UploadExerciseProgressUrl(ExerciseProgress exerciseProgress)
        {
            var createdProgress = _db.Add(exerciseProgress);

            await _db.SaveChangesAsync();

            return createdProgress.Entity.ProgressVideoUrl;
        }

        public async Task DeleteProgress(ExerciseProgress progress)
        {
            _db.ExerciseProgresses.Remove(progress);
            await _db.SaveChangesAsync();
        }

        public async Task<List<ExerciseProgress>> GetAllByUserIdAndTrainingPlanId(Guid userId, Guid trainingPlanId)
        {
            return await _db.ExerciseProgresses.Include(x => x.Exercise).Where(x => x.UserId == userId && x.TrainingPlanId == trainingPlanId).ToListAsync();
        }

        public async Task<ExerciseProgress?> GetProgress(Guid userId, Guid trainingPlanId, Guid skillId, Guid exerciseId)
        {
            return await _db.ExerciseProgresses.Where(x => x.UserId == userId && x.TrainingPlanId == trainingPlanId && x.SkillId == skillId && x.ExerciseId == exerciseId).FirstOrDefaultAsync();
        }

        public async Task<ExerciseProgress> GetProgressById(Guid id)
        {
            return await _db.ExerciseProgresses.FirstAsync(x => x.Id == id);
        }

        public async Task<ExerciseProgress> Update(ExerciseProgress exerciseProgress)
        {
            var updatedProgress = _db.ExerciseProgresses.Update(exerciseProgress);
            await _db.SaveChangesAsync();

            return updatedProgress.Entity;
        }

        public async Task<Dictionary<Guid, int>> GetCounterByUserAndPositive(Guid userId)
        {
            var exerciseProgress = await _db.ExerciseProgresses
                                            .Where(x => x.UserId == userId
                                                   && x.Grade > 4)
                                            .GroupBy(x => x.TrainingPlanId)
                                            .ToDictionaryAsync(x => x.Key, x => x.Count());

            return exerciseProgress;
        }

        public async Task<int> GetCounterByUserAndTrainingPlanAndNotEvaluated(Guid userId, Guid trainingPlanId)
        {
            var count = await _db.ExerciseProgresses
                                 .Where(x => x.UserId == userId
                                        && x.TrainingPlanId == trainingPlanId
                                        && x.Grade == null)
                                 .CountAsync();

            return count;
        }
    }
}
