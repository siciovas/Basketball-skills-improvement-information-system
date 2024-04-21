using Basketball.Core.Dtos;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;

namespace Basketball.Services
{
    public class StatisticsService(IUserRepository userRepository,
        IOrderRepository orderRepository,
        ITrainingPlanRepository trainingPlanRepository) : IStatisticsService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IOrderRepository _orderRepository = orderRepository;
        private readonly ITrainingPlanRepository _trainingPlanRepository = trainingPlanRepository;

        public async Task<StatisticsDto> GetStatistics()
        {
            int currentMonth = DateTime.Now.Month;
            var months = Enumerable.Range(1, currentMonth).ToList();

            var coaches = await _userRepository.GetApprovedCoaches();
            var groupedCoaches = months
                .GroupJoin(coaches
                .Where(x => x.RegisterDate.Year == DateTime.Now.Year),
                month => month,
                coach => coach.RegisterDate.Month,
                (month, coachGroup) => new { Month = month, Count = coachGroup.Count() })
                .OrderBy(x => x.Month)
                .ToDictionary(x => x.Month, x => x.Count);

            var students = await _userRepository.GetAllStudents();
            var groupedStudents = months
                .GroupJoin(students
                .Where(x => x.RegisterDate.Year == DateTime.Now.Year),
                month => month,
                coach => coach.RegisterDate.Month,
                (month, coachGroup) => new { Month = month, Count = coachGroup.Count() })
                .OrderBy(x => x.Month)
                .ToDictionary(x => x.Month, x => x.Count);

            var orders = await _orderRepository.GetAll();
            var groupedOrders = months
                .GroupJoin(orders
                .Where(x => x.OrderDate.Year == DateTime.Now.Year),
                month => month,
                coach => coach.OrderDate.Month,
                (month, coachGroup) => new { Month = month, Count = coachGroup.Count() })
                .OrderBy(x => x.Month)
                .ToDictionary(x => x.Month, x => x.Count);

            var groupedCommissions = months
                .GroupJoin(orders
                .Where(x => x.OrderDate.Year == DateTime.Now.Year),
                month => month,
                coach => coach.OrderDate.Month,
                (month, coachGroup) => new { Month = month, Count = coachGroup.Sum(x => x.CommissionFee) })
                .OrderBy(x => x.Month)
                .ToDictionary(x => x.Month, x => x.Count);

            var cumulativeCoaches = GetCumulativeCounts(groupedCoaches);
            var cumulativeStudents = GetCumulativeCounts(groupedStudents);

            return new StatisticsDto
            {
                RegisteredCoaches = cumulativeCoaches,
                RegisteredStudents = cumulativeStudents,
                OrdersAmount = groupedOrders,
                Commissions = groupedCommissions
            };
        }

        public async Task<CountsDto> GetCountsForAdmin()
        {
            int currentMonth = DateTime.Now.Month;
            var months = Enumerable.Range(1, currentMonth).ToList();

            var coaches = await _userRepository.GetApprovedCoaches();
            var students = await _userRepository.GetAllStudents();
            var trainingPlans = await _trainingPlanRepository.GetAllCount();

            var orders = await _orderRepository.GetAll();
            var groupedOrders = months
                .GroupJoin(orders
                .Where(x => x.OrderDate.Year == DateTime.Now.Year),
                month => month,
                coach => coach.OrderDate.Month,
                (month, coachGroup) => new { Month = month, Count = coachGroup.Count() })
                .OrderBy(x => x.Month)
                .ToDictionary(x => x.Month, x => x.Count);

            var groupedCommissions = months
                .GroupJoin(orders
                .Where(x => x.OrderDate.Year == DateTime.Now.Year),
                month => month,
                coach => coach.OrderDate.Month,
                (month, coachGroup) => new { Month = month, Count = coachGroup.Sum(x => x.CommissionFee) })
                .OrderBy(x => x.Month)
                .ToDictionary(x => x.Month, x => x.Count);

            return new CountsDto
            {
                Coaches = coaches.Count,
                Students = students.Count,
                TrainingPlans = trainingPlans,
                Orders = orders.Count,
                Commissions = groupedCommissions
            };
        }

        private static Dictionary<int, int> GetCumulativeCounts(Dictionary<int, int> groupedItems)
        {
            int cumulativeCount = 0;
            Dictionary<int, int> cumulativeCounts = [];
            foreach (var item in groupedItems)
            {
                cumulativeCount += item.Value;
                cumulativeCounts.Add(item.Key, cumulativeCount);
            }

            return cumulativeCounts;
        }
    }
}
