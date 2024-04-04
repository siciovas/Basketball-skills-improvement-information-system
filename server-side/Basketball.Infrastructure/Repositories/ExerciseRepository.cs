using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class ExerciseRepository(DatabaseContext db) : IExerciseRepository
    {
        private readonly DatabaseContext _db = db;

        public async Task<Exercise> Create(Exercise exercise)
        {
            var createdExercise = _db.Add(exercise);
            await _db.SaveChangesAsync();

            return createdExercise.Entity;
        }

        public async Task Delete(Exercise exercise)
        {
            _db.Exercises.Remove(exercise);
            await _db.SaveChangesAsync();
        }

        public async Task<List<Exercise>> GetAll(Guid coachId)
        {
            var exercise = await _db.Exercises
                                    .Where(e => e.CoachId == coachId)
                                    .ToListAsync();

            return exercise;
        }

        public async Task<Exercise?> GetById(Guid id)
        {
            return await _db.Exercises.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Exercise> Update(Exercise exercise)
        {
            var updatedExercise = _db.Exercises.Update(exercise);
            await _db.SaveChangesAsync();

            return updatedExercise.Entity;
        }
    }
}
