using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class ExerciseRepository : IExerciseRepository
    {
        private readonly DatabaseContext _db;

        public ExerciseRepository(DatabaseContext db)
        {
            _db = db;
        }

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
                .Where(x => x.CoachId == coachId)
                .ToListAsync();

            return exercise;
        }

        public async Task<Exercise?> GetById(Guid id)
        {
            return await _db.Exercises.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Exercise> Update(Exercise exercise)
        {
            var updatedExercise = _db.Exercises.Update(exercise);
            await _db.SaveChangesAsync();

            return updatedExercise.Entity;
        }
    }
}
