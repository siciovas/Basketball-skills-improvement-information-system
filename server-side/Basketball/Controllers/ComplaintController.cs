using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;
using System.Security.Claims;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/complaint")]
    public class ComplaintController : ControllerBase
    {
        private readonly IComplaintService _complaintService;
        private readonly IUserService _userService;

        public ComplaintController(IComplaintService complaintService, IUserService userService)
        {
            _complaintService = complaintService;
            _userService = userService;
        }

        [HttpPost]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> Post(ComplaintPostDto complaintDto)
        {
            var complaint = await _complaintService.Create(complaintDto);

            return CreatedAtAction(nameof(Post), complaint);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _complaintService.Delete(id);

            return NoContent();
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllComplaints()
        {
            var complaints = await _complaintService.GetAllComplaints();

            return Ok(complaints);
        }

        [HttpGet("userComplaints")]
        [Authorize]
        public async Task<IActionResult> GetUserComplaints()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var isCoachExists = await _userService.IsUserExistsById(userId);
            var complaints = new List<ComplaintDto>();

            if (!isCoachExists) return NotFound();

            if (User.IsInRole("Coach"))
            {
                complaints = await _complaintService.GetAllComplaintsByCoachId(userId);
            }

            else if (User.IsInRole("Student"))
            {
                complaints = await _complaintService.GetAllComplaintsByStudentId(userId);
            }

            return Ok(complaints);
        }
    }
}
