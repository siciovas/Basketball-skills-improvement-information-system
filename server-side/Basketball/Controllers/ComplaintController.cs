using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/complaint")]
    public class ComplaintController : ControllerBase
    {
        private readonly IComplaintService _complaintService;

        public ComplaintController(IComplaintService complaintService)
        {
            _complaintService = complaintService;
        }

        [HttpPost]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> Create(ComplaintPostDto complaintDto)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);
            complaintDto.StudentId = userId;

            var complaint = await _complaintService.Create(complaintDto);

            return CreatedAtAction(nameof(Create), complaint);
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
            var complaints = new List<ComplaintDto>();

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

        [HttpGet("coachComplaints/{id}")]
        [Authorize]
        public async Task<IActionResult> GetUserComplaints(Guid id)
        {
            var complaints = await _complaintService.GetAllComplaintsByCoachId(id);

            return Ok(complaints);
        }
    }
}
