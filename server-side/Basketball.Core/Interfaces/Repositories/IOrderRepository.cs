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
    }
}