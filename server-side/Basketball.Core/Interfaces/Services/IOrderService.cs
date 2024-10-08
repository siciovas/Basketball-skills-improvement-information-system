﻿using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;

namespace Basketball.Core.Interfaces.Services
{
    public interface IOrderService
    {
        public Task<Guid> Create(OrderPostDto orderDto, Guid userId);
        public Task<OrderUpdateDto> UpdatePaymentStatus(Guid Id);
        public Task<List<OrderDto>> GetByUserId(Guid userId);
        public Task<OrderDto> GetById(Guid id);
        public Task<List<OrderDto>> GetAll();
        public Task CancelOrder(Guid id);
        public Task<ViewOrderDto> GetOrderInfoById(Guid id);
        public Task<bool> HasUserTrainingPlanByCoachId(Guid coachId, Guid userId);
        public Task UpdateTrainingPlanRequest(Guid orderId, string trainingPlanRequest);
        public Task<bool> IsOrderExistsByUserIdAndTrainingPlanId(Guid trainingPlanId, Guid userId);
    }
}
