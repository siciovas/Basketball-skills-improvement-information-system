using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;
using Basketball.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/trainingPlan")]
    public class TrainingPlanController(ITrainingPlanService trainingPlanService) : ControllerBase
    {
        private readonly ITrainingPlanService _trainingPlanService = trainingPlanService;

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var trainingPlans = await _trainingPlanService.GetAll();

            return Ok(trainingPlans);
        }

        [HttpGet("my")]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> GetAllCoachTrainingPlans()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var trainingPlans = await _trainingPlanService.GetAllByCoachId(userId);

            return Ok(trainingPlans);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _trainingPlanService.Delete(id);

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var trainingPlan = await _trainingPlanService.GetById(id);

            return Ok(trainingPlan);
        }

        [HttpPost]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> Create(TrainingPlanPostDto trainingPlan)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var createdTrainingPlan = await _trainingPlanService.Create(trainingPlan, userId);

            return CreatedAtAction(nameof(Create), createdTrainingPlan);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> Update(TrainingPlanUpdateDto trainingPlan, Guid id)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var isCoachOwningTrainingPlan = await _trainingPlanService.IsTrainingPlanOwnedByCoachId(id, userId);

            if (!isCoachOwningTrainingPlan)
            {
                return Forbid();
            }

            var updatedTrainingPlan = await _trainingPlanService.Update(trainingPlan, id);

            return Ok(updatedTrainingPlan);
        }

        [HttpGet("planExecution/{id}")]
        public async Task<IActionResult> GetTrainingPlanForExecutionById(Guid id)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);
            var trainingPlan = await _trainingPlanService.GetTrainingPlanForExecutionById(id, userId);

            return Ok(trainingPlan);
        }
    }
}
