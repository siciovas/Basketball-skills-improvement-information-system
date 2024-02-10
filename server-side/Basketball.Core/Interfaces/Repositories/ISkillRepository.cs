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
    }
}
