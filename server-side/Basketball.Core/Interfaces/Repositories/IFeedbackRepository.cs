using Basketball.Domain.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface IFeedbackRepository
    {
        Task<Feedback> Create(Feedback feedback);
        Task<List<Feedback>> GetAll();
        Task<Feedback?> GetById(Guid id);
        Task<List<Feedback>> GetAllByTrainingPlanId(Guid trainingPlanId);
        Task Delete(Feedback feedback);
        Task<Feedback> Update(Feedback feedback);
    }
}
