using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;

namespace Basketball.Core.Interfaces.Services
{
    public interface IExerciseService
    {
        Task<List<ExerciseDto>> GetAll(Guid coachId);
        Task<ExerciseDto> GetById(Guid id);
        Task<ExerciseDto> Create(ExercisePostDto exercise, Guid coachId);
        Task<ExerciseDto> Update(ExercisePostDto exercise, Guid id, Guid coachId);
        Task Delete(Guid id);
        Task<bool> IsCoachExerciseOwner(Guid id, Guid coachId);
    }
}
