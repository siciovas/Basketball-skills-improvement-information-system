using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;

namespace Basketball.Core.Interfaces.Services
{
    public interface IComplaintService
    {
        Task<List<ComplaintDto>> GetAllComplaints();
        Task<List<ComplaintDto>> GetAllComplaintsByStudentId(Guid studentId);
        Task<List<ComplaintDto>> GetAllComplaintsByCoachId(Guid coachId);
        Task<ComplaintDto> Create(ComplaintPostDto complaintDto);
        Task Delete(Guid id);
    }
}
