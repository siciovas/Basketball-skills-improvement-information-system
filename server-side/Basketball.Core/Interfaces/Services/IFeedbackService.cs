using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;

namespace Basketball.Core.Interfaces.Services
{
    public interface IFeedbackService
    {
        Task<FeedbackDto> Create(FeedbackPostDto feedback, Guid studentId);
        Task<List<FeedbackDto>> GetAll();
        Task<FeedbackDto?> GetById(Guid id);
        Task<List<FeedbackDto>> GetAllByTrainingPlanId(Guid trainingPlanId);
        Task Delete(Guid id);
        Task<FeedbackDto> Update(FeedbackUpdateDto feedback, Guid id);
        Task<bool> IsFeedbackOwnedByStudent(Guid studentId, Guid id);
        Task<List<FeedbackDto>> GetFourBest(Guid id);
    }
}
