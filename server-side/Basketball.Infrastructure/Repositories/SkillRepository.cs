using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class SkillRepository(DatabaseContext db) : ISkillRepository
    {
        private readonly DatabaseContext _db = db;


        public async Task<Skill> Create(Skill skill)
        {
            var createdSkill = _db.Add(skill);
            await _db.SaveChangesAsync();

            return createdSkill.Entity;
        }

        public async Task Delete(Skill skill)
        {
            _db.Skills.Remove(skill);
            await _db.SaveChangesAsync();
        }

        public async Task<List<Skill>> GetAll(Guid coachId)
        {
            var skills = await _db.Skills
                                  .Include(x => x.TrainingPlans)
                                  .Where(s => s.CoachId == coachId)
                                  .ToListAsync();

            return skills;
        }

        public async Task<Skill?> GetById(Guid id)
        {
            return await _db.Skills
                            .Include(e => e.Exercises)
                            .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<List<ExercisesOrder>> GetExerciseOrderBySkillId(Guid skillId)
        {
            return await _db.ExercisesOrders.Where(x => x.SkillId == skillId).ToListAsync();
        }

        public async Task<Skill> Update(Skill skill)
        {
            var updatedSkill = _db.Skills.Update(skill);
            await _db.SaveChangesAsync();

            return updatedSkill.Entity;
        }

        public async Task UpdateExercisesOrders(List<ExercisesOrder> exercisesOrder)
        {
            _db.ExercisesOrders.UpdateRange(exercisesOrder);
            await _db.SaveChangesAsync();
        }
        public async Task AddExercisesOrders(List<ExercisesOrder> exercisesOrder)
        {
            _db.ExercisesOrders.AddRange(exercisesOrder);
            await _db.SaveChangesAsync();
        }
    }
}
