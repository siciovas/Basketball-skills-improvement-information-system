using Basketball.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Interfaces.Services
{
    public interface IStatisticsService
    {
        Task<StatisticsDto> GetStatistics();
        Task<CountsDto> GetCountsForAdmin();
    }
}
