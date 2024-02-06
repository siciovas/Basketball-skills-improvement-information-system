using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;
using Basketball.Domain.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Interfaces.Services
{
    public interface IFeedbackService
    {
        Task<FeedbackDto> Create(FeedbackPostDto feedback, Guid studentId);
        Task<List<FeedbackDto>> GetAll();
        Task<FeedbackDto?> GetById(Guid id);
        Task<List<FeedbackDto>> GetAllByTrainingPlanId(Guid trainingPlanId);
        Task Delete(Guid id);
        Task<FeedbackDto> Update(FeedbackUpdateDto feedback, Guid studentId, Guid id, Guid trainingPlanId);
        Task<bool> IsFeedbackOwnedByStudent(Guid studentId, Guid id);
    }
}
