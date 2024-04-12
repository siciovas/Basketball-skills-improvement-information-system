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
    }
}
