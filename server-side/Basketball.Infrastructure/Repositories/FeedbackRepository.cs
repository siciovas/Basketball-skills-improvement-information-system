using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class FeedbackRepository(DatabaseContext db) : IFeedbackRepository
    {
        private readonly DatabaseContext _db = db;

        public async Task<Feedback> Create(Feedback feedback)
        {
            var createdFeedback = _db.Add(feedback);

            _db.Entry(createdFeedback.Entity)
               .Reference(u => u.Coach)
               .Load();

            _db.Entry(createdFeedback.Entity)
               .Reference(u => u.Student)
               .Load();

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
            return await _db.Feedbacks
                            .Include(u => u.Student)
                            .ToListAsync();
        }

        public async Task<Feedback?> GetById(Guid id)
        {
            return await _db.Feedbacks
                            .Include(u => u.Student)
                            .FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task<List<Feedback>> GetAllForCoach(Guid id)
        {
            return await _db.Feedbacks
                            .Include(u => u.Coach)
                            .Include(u => u.Student)
                            .Where(u => u.Coach.Id == id)
                            .ToListAsync();
        }

        public async Task<Feedback> Update(Feedback feedback)
        {
            var updatedFeedback = _db.Update(feedback);

            _db.Entry(updatedFeedback.Entity)
               .Reference(u => u.Student)
               .Load();

            await _db.SaveChangesAsync();

            return updatedFeedback.Entity;
        }
    }
}
