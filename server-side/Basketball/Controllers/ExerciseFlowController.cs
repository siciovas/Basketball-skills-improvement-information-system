using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/exerciseFlow")]
    public class ExerciseFlowController(IExerciseFlowService exerciseFlowService) : ControllerBase
    {
        private readonly IExerciseFlowService _exerciseFlowService = exerciseFlowService;

        [HttpPost]
        [Route("uploadExerciseProgress")]
        [Authorize]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> UploadExerciseProgress(UploadExerciseProgressPostDto uploadExerciseProgressPostDto)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var exerciseUrl = await _exerciseFlowService.UploadExerciseProgress(uploadExerciseProgressPostDto, userId);

            return CreatedAtAction(nameof(UploadExerciseProgress), exerciseUrl);
        }

        [HttpGet("getExercisesForEvaluation/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetExercisesForEvaluation(Guid userId)
        {
            var coachId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var exercises = await _exerciseFlowService.GetExercisesForEvaluation(userId, coachId);

            return Ok(exercises);
        }

        [HttpPut("evaluate/{id}")]
        [Authorize]
        public async Task<IActionResult> EvaluateExercise(Guid id, EvaluationDto evaluationDto)
        {
            var updatedExercise = await _exerciseFlowService.EvaluateExercise(id, evaluationDto);

            return Ok(updatedExercise);
        }

        [HttpGet("activeClients")]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> GetActiveClients()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);
            var activeClients = await _exerciseFlowService.GetActiveClients(userId);

            return Ok(activeClients);
        }
    }
}
