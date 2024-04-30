using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/exercise")]
    public class ExerciseController(IExerciseService exerciseService) : ControllerBase
    {
        private readonly IExerciseService _exerciseService = exerciseService;

        [HttpGet]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> GetAll()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var exercises = await _exerciseService.GetAll(userId);

            return Ok(exercises);
        }

        [HttpPost]
        [Authorize(Roles = "Coach")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> Create(ExercisePostDto data)
        {
            var coachId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);
            var exerciseByName = await _exerciseService.GetByExerciseName(data.Name, coachId);

            if (exerciseByName != null)
            {
                return Conflict("Pratimas tokiu pavadinimu jau egzistuoja!");
            }

            var stream = data.ExerciseVideo.OpenReadStream();
            var exercise = await _exerciseService.Create(data, coachId);

            return CreatedAtAction(nameof(Create), exercise);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _exerciseService.Delete(id);

            return NoContent();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var coachId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);
            var isCoachOwner = await _exerciseService.IsCoachExerciseOwner(id, coachId);

            if (!isCoachOwner)
            {
                return Forbid();
            }

            var exercise = await _exerciseService.GetById(id);

            return Ok(exercise);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Coach")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> Update(ExercisePostDto exercise, Guid id)
        {
            var coachId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);
            var exerciseByName = await _exerciseService.GetByExerciseName(exercise.Name, coachId);
            var isCoachOwner = await _exerciseService.IsCoachExerciseOwner(id, coachId);

            if (!isCoachOwner || (exerciseByName != null && exerciseByName.Id != id))
            {
                return Conflict("Pratimas tokiu pavadinimu jau egzistuoja!");
            }

            var updatedExercise = await _exerciseService.Update(exercise, id, coachId);

            return Ok(updatedExercise);
        }
    }
}
