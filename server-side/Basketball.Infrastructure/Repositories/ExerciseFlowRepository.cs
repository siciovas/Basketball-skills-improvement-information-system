using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;

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
    }
}
