using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;

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
    }
}
