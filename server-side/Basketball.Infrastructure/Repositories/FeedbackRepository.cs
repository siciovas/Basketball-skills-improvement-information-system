using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly DatabaseContext _db;

        public FeedbackRepository(DatabaseContext db)
        {
            _db = db;
        }
        public async Task<Feedback> Create(Feedback feedback)
        {
            var createdFeedback = _db.Add(feedback);

            _db.Entry(createdFeedback.Entity).Reference(t => t.Student).Load();
            await _db.SaveChangesAsync();

            return createdFeedback.Entity;
        }

        public async Task Delete(Feedback feedback)
        {
            _db.Remove(feedback);
            await _db.SaveChangesAsync();
        }

        public async Task<List<Feedback>> GetAll()
        {
            return await _db.Feedbacks.Include(x => x.Student).ToListAsync();
        }

        public async Task<List<Feedback>> GetAllByTrainingPlanId(Guid trainingPlanId)
        {
            return await _db.Feedbacks.Include(x => x.Student)
                .Where(x => x.TrainingPlanId == trainingPlanId)
                .ToListAsync();
        }

        public async Task<Feedback?> GetById(Guid id)
        {
            return await _db.Feedbacks.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Feedback> Update(Feedback feedback)
        {
            var updatedFeedback = _db.Update(feedback);

            _db.Entry(updatedFeedback.Entity).Reference(t => t.Student).Load();
            await _db.SaveChangesAsync();

            return updatedFeedback.Entity;
        }
    }
}
