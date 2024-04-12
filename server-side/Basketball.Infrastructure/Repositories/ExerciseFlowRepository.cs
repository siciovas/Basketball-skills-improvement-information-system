using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
