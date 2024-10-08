﻿using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface IOrderRepository
    {
        public Task<Order> Create(Order order);
        public Task<Order> Update(Order order);
        public Task<List<Order>> GetByUserId(Guid userId);
        public Task<List<Order>> GetAll();
        public Task<Order?> GetById(Guid id);
        public Task<int> GetAllCount();
        public Task RemoveExpiredOrders();
        public Task Remove(Order order);
        public Task<Dictionary<Guid, int>> GetClientsCount(List<Guid> coachesIds);
        Task<List<Order>> GetActiveClients(Guid coachId);
        public Task<Order> GetByTrainingPlanAndUserId(Guid userId, Guid trainingPlanId);
        public Task<List<Order>> GetByCoachIdAndUserId(Guid userId, Guid coachId);
    }
}
