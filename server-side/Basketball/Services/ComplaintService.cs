using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class ComplaintService : IComplaintService
    {
        private readonly IComplaintRepository _complaintRepository;

        public ComplaintService(IComplaintRepository complaintRepository)
        {
            _complaintRepository = complaintRepository;
        }
        public async Task<ComplaintDto> Create(ComplaintPostDto complaintDto)
        {
            var newComplaint = new Complaint
            {
                Text = complaintDto.Text,
                StudentId = complaintDto.StudentId,
                CoachId = complaintDto.CoachId
            };

            var createdComplaint = await _complaintRepository.Create(newComplaint);

            return new ComplaintDto
            {
                Id = createdComplaint!.Id,
                Text = createdComplaint!.Text,
                StudentFullName = string.Format("{0} {1}", createdComplaint.Student.Name, createdComplaint.Student.Surname),
                CoachFullName = string.Format("{0} {1}", createdComplaint.Coach.Name, createdComplaint.Coach.Surname),
            };
        }

        public async Task Delete(Guid id)
        {
            var complaint = await _complaintRepository.GetComplaintById(id);

            await _complaintRepository.Delete(complaint!);
        }

        public async Task<List<ComplaintDto>> GetAllComplaints()
        {
            var complaints = await _complaintRepository.GetAllComplaints();

            return complaints.Select(x => new ComplaintDto
            {
                Id = x.Id,
                Text = x.Text,
                CoachFullName = string.Format("{0} {1}", x.Coach.Name, x.Coach.Surname),
                StudentFullName = string.Format("{0} {1}", x.Student.Name, x.Student.Surname)
            }).ToList();
        }

        public async Task<List<ComplaintDto>> GetAllComplaintsByCoachId(Guid coachId)
        {
            var complaints = await _complaintRepository.GetAllComplaintsByCoachId(coachId);

            return complaints.Select(x => new ComplaintDto
            {
                Id = x.Id,
                Text = x.Text,
                CoachFullName = string.Format("{0} {1}", x.Coach.Name, x.Coach.Surname),
                StudentFullName = string.Format("{0} {1}", x.Student.Name, x.Student.Surname)
            }).ToList();
        }

        public async Task<List<ComplaintDto>> GetAllComplaintsByStudentId(Guid studentId)
        {
            var complaints = await _complaintRepository.GetAllComplaintsByStudentId(studentId);

            return complaints.Select(x => new ComplaintDto
            {
                Id = x.Id,
                Text = x.Text,
                CoachFullName = string.Format("{0} {1}", x.Coach.Name, x.Coach.Surname),
                StudentFullName = string.Format("{0} {1}", x.Student.Name, x.Student.Surname)
            }).ToList();
        }
    }
}
