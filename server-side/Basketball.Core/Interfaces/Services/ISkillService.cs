using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos;
using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Services
{
    public interface ISkillService
    {
        Task<List<SkillDto>> GetAll(Guid coachId);
        Task<SkillDto> GetById(Guid id);
        Task<SkillDto> Create(SkillPostDto skill, Guid coachId);
        Task<SkillDto> Update(SkillPostDto skill, Guid id);
        Task Delete(Guid id);
        Task<bool> IsCoachSkillOwner(Guid id, Guid coachId);
        Task<Skill?> GetBySkillName(string name, Guid coachId);
    }
}
