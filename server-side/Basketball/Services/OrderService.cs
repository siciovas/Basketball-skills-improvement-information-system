using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class OrderService(IOrderRepository orderRepository, ITrainingPlanRepository trainingPlanRepository) : IOrderService
    {
        private readonly IOrderRepository _orderRepository = orderRepository;
        private readonly ITrainingPlanRepository _trainingPlanRepository = trainingPlanRepository;

        public async Task<Guid> Create(OrderPostDto orderDto, Guid userId)
        {
            var trainingPlan = await _trainingPlanRepository.GetById(orderDto.TrainingPlanId);

            var newOrder = new Order
            {
                Id = Guid.NewGuid(),
                OrderDate = DateTime.Now,
                Price = (decimal)trainingPlan!.Price,
                TrainingPlanId = orderDto.TrainingPlanId,
                UserId = userId,
                CommissionFee = null,
            };

            var createdOrder = await _orderRepository.Create(newOrder);

            return createdOrder.Id;
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
                CommissionFee = x.CommissionFee,
                TrainingPlanTitle = x.TrainingPlan.Title,
                IsPaid = x.IsPaid,
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
                TrainingPlanTitle = x.TrainingPlan.Title
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

        public async Task<OrderDto> GetById(Guid id)
        {
            var order = await _orderRepository.GetById(id);

            return new OrderDto
            {
                Id = order!.Id,
                OrderDate = order.OrderDate,
                CoachFullName = string.Format("{0} {1}", order.TrainingPlan.Coach.Name, order.TrainingPlan.Coach.Surname),
                Price = order.Price,
                CommissionFee = order.CommissionFee,
                TrainingPlanTitle = order.TrainingPlan.Title
            };
        }

        public async Task<ViewOrderDto> GetOrderInfoById(Guid id)
        {
            var order = await _orderRepository.GetById(id);

            return new ViewOrderDto
            {
                Id = order!.Id,
                OrderDate = order.OrderDate,
                Price = order.Price,
                TrainingPlanTitle = order.TrainingPlan.Title,
                BuyerFullName = string.Format("{0} {1}", order.User.Name, order.User.Surname),
                CoachFullName = string.Format("{0} {1}", order.TrainingPlan.Coach.Name, order.TrainingPlan.Coach.Surname),
                Email = order.User.Email,
                PhoneNumber = order.User.PhoneNumber,
            };
        }

        public async Task CancelOrder(Guid id)
        {
            var order = await _orderRepository.GetById(id);

            await _orderRepository.Remove(order!);
        }

        public async Task<bool> HasUserTrainingPlanByCoachId(Guid coachId, Guid userId)
        {
            var userTrainingPlans = await _orderRepository.GetByUserId(userId);

            var userTrainingPlansByCoachIdCount = userTrainingPlans.Count(x => x.IsPaid && x.TrainingPlan.CoachId == coachId);

            return userTrainingPlansByCoachIdCount > 0;
        }
    }
}
