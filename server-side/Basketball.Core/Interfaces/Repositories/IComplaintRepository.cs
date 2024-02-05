using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface IComplaintRepository
    {
        Task<List<Complaint>> GetAllComplaints();
        Task<List<Complaint>> GetAllComplaintsByStudentId(Guid studentId);
        Task<List<Complaint>> GetAllComplaintsByCoachId(Guid coachId);
        Task<Complaint> Create(Complaint complaint);
        Task Delete(Complaint complaint);
        Task<Complaint?> GetComplaintById(Guid id);
    }
}
