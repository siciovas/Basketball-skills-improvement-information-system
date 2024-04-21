using Basketball.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/statistics")]
    public class StatisticsController(IStatisticsService statisticsService) : ControllerBase
    {
        private readonly IStatisticsService _statisticsService = statisticsService;

        [HttpGet]
        public async Task<IActionResult> GetStatistics()
        {
            return Ok(await _statisticsService.GetStatistics());
        }

        [HttpGet]
        [Route("counts")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetCountsForAdmin()
        {
            var counts = await _statisticsService.GetCountsForAdmin();

            return Ok(counts);
        }
    }
}
