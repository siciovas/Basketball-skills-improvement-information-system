using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;
using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Services
{
    public interface ITrainingPlanService
    {
        Task<TrainingPlanDto> Create(TrainingPlanPostDto trainingPlan, Guid coachId);
        Task<List<TrainingPlanDto>> GetAll();
        Task<TrainingPlanDto> GetById(Guid id);
        Task<List<TrainingPlanDto>> GetAllByCoachId(Guid coachId);
        Task Delete(Guid id);
        Task<TrainingPlanDto> Update(TrainingPlanUpdateDto trainingPlan, Guid id);
        Task<bool> IsTrainingPlanOwnedByCoachId(Guid id, Guid coachId);
        Task<TrainingPlanExecutionDto> GetTrainingPlanForExecutionById(Guid id, Guid userId);
        Task<List<MyPlansDto>> GetMyPlans(Guid userId);
        Task<TrainingPlan?> GetByPlanName(string name, Guid coachId);
    }
}
