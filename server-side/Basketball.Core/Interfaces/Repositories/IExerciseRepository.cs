using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface IExerciseRepository
    {
        Task<List<Exercise>> GetAll(Guid coachId);
        Task<Exercise?> GetById(Guid id);
        Task<Exercise> Create(Exercise exercise);
        Task<Exercise> Update(Exercise exercise);
        Task Delete(Exercise exercise);
        Task<Exercise?> GetByExerciseName(string name, Guid coachId);
    }
}
