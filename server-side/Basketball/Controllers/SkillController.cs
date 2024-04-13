using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/skill")]
    public class SkillController(ISkillService skillService) : ControllerBase
    {
        private readonly ISkillService _skillService = skillService;

        [HttpGet]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> GetAll()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var skills = await _skillService.GetAll(userId);

            return Ok(skills);
        }

        [HttpPost]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> Create(SkillPostDto skillDto)
        {
            var coachId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var skill = await _skillService.Create(skillDto, coachId);

            return CreatedAtAction(nameof(Create), skill);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _skillService.Delete(id);

            return NoContent();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var coachId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);
            var isCoachOwner = await _skillService.IsCoachSkillOwner(id, coachId);

            if (!isCoachOwner)
            {
                return Forbid();
            }

            var skill = await _skillService.GetById(id);

            return Ok(skill);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> Update(SkillPostDto skill, Guid id)
        {
            var coachId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);
            var isCoachOwner = await _skillService.IsCoachSkillOwner(id, coachId);

            if (!isCoachOwner)
            {
                return Forbid();
            }

            var updatedSkill = await _skillService.Update(skill, id);

            return Ok(updatedSkill);
        }
    }
}
