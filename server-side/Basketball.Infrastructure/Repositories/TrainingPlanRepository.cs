using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class TrainingPlanRepository(DatabaseContext db) : ITrainingPlanRepository
    {
        private readonly DatabaseContext _db = db;

        public async Task<TrainingPlan> Create(TrainingPlan trainingPlan)
        {
            var createdPlan = _db.Add(trainingPlan);

            _db.Entry(createdPlan.Entity)
               .Reference(t => t.Coach)
               .Load();

            await _db.SaveChangesAsync();

            return createdPlan.Entity;
        }

        public async Task Delete(TrainingPlan trainingPlan)
        {
            _db.Remove(trainingPlan);
            await _db.SaveChangesAsync();
        }

        public async Task<List<TrainingPlan>> GetAll()
        {
            return await _db.TrainingPlans
                            .Include(t => t.Coach)
                            .GroupBy(t => t.InitialTrainingPlanId)
                            .Select(g => g.OrderByDescending(t => t.Version).FirstOrDefault()!)
                            .ToListAsync();
        }

        public async Task<List<TrainingPlan>> GetAllByCoachId(Guid coachId)
        {
            return await _db.TrainingPlans
                            .Include(t => t.Coach)
                            .Where(t => t.CoachId == coachId && t.IsActive)
                            .GroupBy(t => t.InitialTrainingPlanId)
                            .Select(g => g.OrderByDescending(t => t.Version).FirstOrDefault()!)
                            .ToListAsync();
        }

        public async Task<TrainingPlan?> GetById(Guid id)
        {
            return await _db.TrainingPlans
                            .Include(t => t.Coach)
                            .Include(s => s.Skills)
                            .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<Dictionary<Guid, int>> GetTrainingPlansCountByCoachId(List<Guid> ids)
        {
            return await _db.TrainingPlans
                            .Where(t => ids.Contains(t.CoachId))
                            .Where(x => x.Version == 1 && x.IsActive)
                            .GroupBy(x => x.CoachId)
                            .Select(t => new { t.Key, Count = t.Count() })
                            .ToDictionaryAsync(kvp => kvp.Key, kvp => kvp.Count);
        }

        public async Task<TrainingPlan> Update(TrainingPlan trainingPlan)
        {
            var updatedPlan = _db.Update(trainingPlan);

            _db.Entry(updatedPlan.Entity)
               .Reference(t => t.Coach)
               .Load();

            await _db.SaveChangesAsync();

            return updatedPlan.Entity;
        }

        public async Task<int> GetAllCount()
        {
            return await _db.TrainingPlans
                            .Where(x => x.Version == 1 && x.IsActive)
                            .CountAsync();
        }
    }
}
