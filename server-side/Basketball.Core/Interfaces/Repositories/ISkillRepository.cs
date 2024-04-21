using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface ISkillRepository
    {
        Task<List<Skill>> GetAll(Guid coachId);
        Task<Skill?> GetById(Guid id);
        Task<Skill> Create(Skill exercise);
        Task<Skill> Update(Skill exercise);
        Task Delete(Skill exercise);
        Task AddExercisesOrders(List<ExercisesOrder> exercisesOrder);
        Task UpdateExercisesOrders(List<ExercisesOrder> exercisesOrder);
        Task<List<ExercisesOrder>> GetExerciseOrderBySkillId(Guid skillId);
    }
}
