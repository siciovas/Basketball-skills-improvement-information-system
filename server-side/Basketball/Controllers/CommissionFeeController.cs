using Basketball.Core.Dtos.Update;
using Basketball.Core.Interfaces.Services;
using Basketball.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/commissionFee")]
    public class CommissionFeeController(ICommissionFeeService commissionFeeService) : ControllerBase
    {
        private readonly ICommissionFeeService _commissionFeeService = commissionFeeService;

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var commissionFee = await _commissionFeeService.Get();

            return Ok(commissionFee);
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(CommissionFeeUpdateDto commissionFee)
        {
            var updatedCommissionFee = await _commissionFeeService.Update(commissionFee);

            return Ok(updatedCommissionFee);
        }
    }
}
