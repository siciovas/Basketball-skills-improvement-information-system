using Basketball.Core.Dtos;

namespace Basketball.Core.Interfaces.Services
{
    public interface IStatisticsService
    {
        Task<StatisticsDto> GetStatistics();
        Task<CountsDto> GetCountsForAdmin();
    }
}
