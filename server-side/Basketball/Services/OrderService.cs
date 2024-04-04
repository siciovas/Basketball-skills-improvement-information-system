using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class OrderService(IOrderRepository orderRepository) : IOrderService
    {
        private readonly IOrderRepository _orderRepository = orderRepository;
        public async Task<OrderDto> Create(OrderPostDto orderDto, Guid userId)
        {
            var newOrder = new Order
            {
                Id = Guid.NewGuid(),
                OrderDate = DateTime.Now,
                Price = orderDto.Price,
                TrainingPlanId = orderDto.TrainingPlanId,
                UserId = userId,
                CommissionFee = orderDto.CommissionFee,
            };

            var createdOrder = await _orderRepository.Create(newOrder);

            return new OrderDto
            {
                Id = createdOrder.Id,
                OrderDate = createdOrder.OrderDate,
                Price = createdOrder.Price,
                StudentFullName = string.Format("{0} {1}", createdOrder.User.Name, createdOrder.User.Surname),
                CoachFullName = string.Format("{0} {1}", createdOrder.TrainingPlan.Coach.Name, createdOrder.TrainingPlan.Coach.Surname),
                CommissionFee = createdOrder.CommissionFee,
            };
        }

        public async Task<List<OrderDto>> GetByUserId(Guid userId)
        {
            var orders = await _orderRepository.GetByUserId(userId);

            return orders.Select(x => new OrderDto
            {
                Id = x.Id,
                OrderDate = x.OrderDate,
                CoachFullName = string.Format("{0} {1}", x.TrainingPlan.Coach.Name, x.TrainingPlan.Coach.Surname),
                Price = x.Price,
                CommissionFee = x.CommissionFee
            }).ToList();
        }

        public async Task<List<OrderDto>> GetAll()
        {
            var orders = await _orderRepository.GetAll();

            return orders.Select(x => new OrderDto
            {
                Id = x.Id,
                OrderDate = x.OrderDate,
                Price = x.Price,
                StudentFullName = string.Format("{0} {1}", x.User.Name, x.User.Surname),
                CoachFullName = string.Format("{0} {1}", x.TrainingPlan.Coach.Name, x.TrainingPlan.Coach.Surname),
                CommissionFee = x.CommissionFee,
            }).ToList();
        }

        public async Task<OrderUpdateDto> UpdatePaymentStatus(Guid Id)
        {
            var order = await _orderRepository.GetById(Id);

            order!.IsPaid = true;

            var updatedOrder = await _orderRepository.Update(order);

            return new OrderUpdateDto
            {
                IsPaid = updatedOrder.IsPaid,
            };
        }
    }
}
