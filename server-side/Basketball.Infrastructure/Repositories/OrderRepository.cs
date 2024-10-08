﻿using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class OrderRepository(DatabaseContext db) : IOrderRepository
    {
        private readonly DatabaseContext _db = db;

        public async Task<Order> Create(Order order)
        {
            var createdOrder = _db.Add(order);

            _db.Entry(createdOrder.Entity)
               .Reference(t => t.User)
               .Load();

            _db.Entry(createdOrder.Entity)
               .Reference(u => u.TrainingPlan)
               .Query()
               .Include(t => t.Coach)
               .Load();

            await _db.SaveChangesAsync();

            return createdOrder.Entity;
        }

        public async Task<Order> Update(Order order)
        {
            var updatedOrder = _db.Orders.Update(order);
            await _db.SaveChangesAsync();

            return updatedOrder.Entity;
        }

        public async Task<List<Order>> GetByUserId(Guid userId)
        {
            return await _db.Orders
                            .Include(t => t.TrainingPlan)
                            .ThenInclude(u => u.Coach)
                            .Include(t => t.TrainingPlan)
                            .ThenInclude(x => x.Skills)
                            .ThenInclude(x => x.Exercises)
                            .Where(o => o.UserId == userId)
                            .ToListAsync();
        }

        public async Task<List<Order>> GetAll()
        {
            return await _db.Orders
                            .Include(t => t.TrainingPlan)
                            .ThenInclude(c => c.Coach)
                            .Include(u => u.User)
                            .Where(o => o.IsPaid)
                            .ToListAsync();
        }

        public async Task<Order?> GetById(Guid Id)
        {
            return await _db.Orders
                            .Include(t => t.TrainingPlan)
                            .ThenInclude(c => c.Coach)
                            .Include(u => u.User)
                            .FirstOrDefaultAsync(o => o.Id == Id);
        }

        public async Task RemoveExpiredOrders()
        {
            _db.Orders.RemoveRange(_db.Orders.Where(x => x.OrderDate.AddMinutes(20) < DateTime.UtcNow && !x.IsPaid));
            await _db.SaveChangesAsync();
        }

        public async Task Remove(Order order)
        {
            _db.Orders.Remove(order);
            await _db.SaveChangesAsync();
        }

        public async Task<int> GetAllCount()
        {
            return await _db.Orders
                            .Where(o => o.IsPaid)
                            .CountAsync();
        }

        public async Task<Dictionary<Guid, int>> GetClientsCount(List<Guid> coachesIds)
        {
            return await _db.Orders
                .Include(x => x.TrainingPlan)
                .Where(t => coachesIds.Contains(t.TrainingPlan.CoachId) && t.IsPaid)
                .Select(x => new { x.TrainingPlan.CoachId, x.UserId })
                .Distinct()
                .GroupBy(t => t.CoachId)
                .Select(t => new { t.Key, Count = t.Count() })
                .ToDictionaryAsync(kvp => kvp.Key, kvp => kvp.Count);
        }

        public async Task<List<Order>> GetActiveClients(Guid coachId)
        {
            return await _db.Orders.Include(x => x.User).Include(x => x.TrainingPlan)
                .Where(x => x.TrainingPlan.CoachId == coachId)
                .GroupBy(x => x.UserId)
                .Select(x => x.First())
                .ToListAsync();
        }

        public async Task<Order> GetByTrainingPlanAndUserId(Guid userId, Guid trainingPlanId)
        {
            return await _db.Orders.Include(x => x.TrainingPlan).FirstAsync(x => x.TrainingPlanId == trainingPlanId && x.UserId == userId);
        }

        public async Task<List<Order>> GetByCoachIdAndUserId(Guid userId, Guid coachId)
        {
            return await _db.Orders.Include(x => x.TrainingPlan).ThenInclude(x => x.Skills).ThenInclude(x => x.Exercises).Where(x => x.TrainingPlan.CoachId == coachId && x.UserId == userId && x.IsPaid).ToListAsync();
        }
    }
}
