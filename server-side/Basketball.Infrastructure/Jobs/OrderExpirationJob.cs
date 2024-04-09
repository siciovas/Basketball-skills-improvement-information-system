using Basketball.Core.Interfaces.Repositories;
using Quartz;

namespace Basketball.Infrastructure.Jobs
{
    public class OrderExpirationJob(IOrderRepository orderRepository) : IJob
    {
        private readonly IOrderRepository _orderRepository = orderRepository;

        public async Task Execute(IJobExecutionContext context)
        {
            await _orderRepository.RemoveExpiredOrders();
        }
    }
}
