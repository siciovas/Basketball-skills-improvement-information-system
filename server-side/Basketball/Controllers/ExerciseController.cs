﻿using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/exercise")]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;

        public ExerciseController(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

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
        public async Task<IActionResult> Post(ExercisePostDto exerciseDto)
        {
            var coachId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var exercise = await _exerciseService.Create(exerciseDto, coachId);

            return CreatedAtAction(nameof(Post), exercise);
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
        public async Task<IActionResult> Update(ExercisePostDto exercise, Guid id)
        {
            var coachId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);
            var isCoachOwner = await _exerciseService.IsCoachExerciseOwner(id, coachId);

            if (!isCoachOwner)
            {
                return Forbid();
            }

            var updatedTrainingPlan = await _exerciseService.Update(exercise, id, coachId);

            return Ok(updatedTrainingPlan);
        }
    }
}
