using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface ITrainingPlanRepository
    {
        Task<TrainingPlan> Create(TrainingPlan trainingPlan);
        Task<List<TrainingPlan>> GetAll();
        Task<TrainingPlan?> GetById(Guid id);
        Task<List<TrainingPlan>> GetAllByCoachId(Guid coachId);
        Task Delete(TrainingPlan trainingPlan);
        Task<TrainingPlan> Update(TrainingPlan trainingPlan);
        Task<Dictionary<Guid, int>> GetTrainingPlansCountByCoachId(List<Guid> ids);
        Task<int> GetAllCount();
        Task AddSkillsOrders(List<SkillsOrder> skillsOrder);
        Task<List<SkillsOrder>> GetSkillOrderByPlanId(Guid planId);
        Task DeleteExerciseOrders(List<SkillsOrder> skillsOrder);
    }
}
