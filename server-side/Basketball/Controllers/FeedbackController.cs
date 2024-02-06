using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;
using Basketball.Core.Interfaces.Services;
using Basketball.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/feedback")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var feedbacks = await _feedbackService.GetAll();

            return Ok(feedbacks);
        }

        [HttpGet("trainingPlan/{id}")]
        [Authorize]
        public async Task<IActionResult> GetAllFeedbacksByTrainingPlanId(Guid id)
        {
            var feedbacks = await _feedbackService.GetAllByTrainingPlanId(id);

            return Ok(feedbacks);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var isOwner = await _feedbackService.IsFeedbackOwnedByStudent(userId, id);

            if (!isOwner)
            {
                return Forbid();
            }

            await _feedbackService.Delete(id);

            return NoContent();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var feedback = await _feedbackService.GetById(id);

            return Ok(feedback);
        }

        [HttpPost]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> Create(FeedbackPostDto feedback)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var createdFeedback = await _feedbackService.Create(feedback, userId);

            return CreatedAtAction(nameof(Create), createdFeedback);
        }

        [HttpPut("{id}/{trainingPlanId}")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> Update(FeedbackUpdateDto feedback, Guid id, Guid trainingPlanId)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var isOwner = await _feedbackService.IsFeedbackOwnedByStudent(userId, id);

            if (!isOwner)
            {
                return Forbid();
            }

            var updatedFeedback = await _feedbackService.Update(feedback, userId, id, trainingPlanId);

            return Ok(updatedFeedback);
        }
    }
}
