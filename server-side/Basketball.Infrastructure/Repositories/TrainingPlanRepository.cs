﻿using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class TrainingPlanRepository : ITrainingPlanRepository
    {
        private readonly DatabaseContext _db;

        public TrainingPlanRepository(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<TrainingPlan> Create(TrainingPlan trainingPlan)
        {
            var createdPlan = _db.Add(trainingPlan);

            _db.Entry(createdPlan.Entity).Reference(t => t.Coach).Load();
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
            return await _db.TrainingPlans.Include(x => x.Coach).ToListAsync();
        }

        public async Task<List<TrainingPlan>> GetAllByCoachId(Guid coachId)
        {
            return await _db.TrainingPlans.Include(x => x.Coach).Where(x => x.CoachId == coachId).ToListAsync();
        }

        public async Task<TrainingPlan?> GetById(Guid id)
        {
            return await _db.TrainingPlans.Include(x => x.Coach).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Dictionary<Guid, int>> GetTrainingPlansCountByCoachId(List<Guid> ids)
        {
            return await _db.TrainingPlans.Where(x => ids.Contains(x.CoachId))
                .Select(x => x.CoachId).GroupBy(x => x).Select(x => new { x.Key, Count = x.Count() })
                .ToDictionaryAsync(kvp => kvp.Key, kvp => kvp.Count);
        }

        public async Task<TrainingPlan> Update(TrainingPlan trainingPlan)
        {
            _db.TrainingPlanSkill.Where(x => x.TrainingPlanId == trainingPlan.Id).ExecuteDelete();

            var updatedPlan = _db.Update(trainingPlan);

            _db.Entry(updatedPlan.Entity).Reference(t => t.Coach).Load();
            await _db.SaveChangesAsync();

            return updatedPlan.Entity;
        }
    }
}
