using Basketball.Core.Interfaces.Repositories;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
