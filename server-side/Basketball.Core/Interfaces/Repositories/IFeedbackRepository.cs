using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface IFeedbackRepository
    {
        Task<Feedback> Create(Feedback feedback);
        Task<List<Feedback>> GetAll();
        Task<Feedback?> GetById(Guid id);
        Task<List<Feedback>> GetAllForCoach(Guid id);

        Task<List<Feedback>> GetAllByTrainingPlanId(Guid trainingPlanId);
        Task Delete(Feedback feedback);
        Task<Feedback> Update(Feedback feedback);
    }
}
