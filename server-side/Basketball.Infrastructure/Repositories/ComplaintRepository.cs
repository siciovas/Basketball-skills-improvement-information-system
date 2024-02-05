using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class ComplaintRepository : IComplaintRepository
    {
        private readonly DatabaseContext _db;

        public ComplaintRepository(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<Complaint> Create(Complaint complaint)
        {
            var createdComplaint = _db.Add(complaint);

            _db.Entry(createdComplaint.Entity)
                .Reference(t => t.Coach)
                .Load();

            _db.Entry(createdComplaint.Entity)
                .Reference(t => t.Student)
                .Load();

            await _db.SaveChangesAsync();

            return createdComplaint.Entity;
        }

        public async Task Delete(Complaint complaint)
        {
            _db.Complaints.Remove(complaint);
            await _db.SaveChangesAsync();
        }

        public async Task<List<Complaint>> GetAllComplaints()
        {
            var complaints = await _db.Complaints
                .Include(x => x.Coach)
                .Include(x => x.Student)
                .ToListAsync();

            return complaints;
        }

        public async Task<List<Complaint>> GetAllComplaintsByCoachId(Guid coachId)
        {
            var complaints = await _db.Complaints
                .Include(x => x.Coach)
                .Include(x => x.Student)
                .Where(x => x.CoachId == coachId)
                .ToListAsync();

            return complaints;
        }

        public async Task<List<Complaint>> GetAllComplaintsByStudentId(Guid studentId)
        {
            var complaints = await _db.Complaints
                .Include(x => x.Coach)
                .Include(x => x.Student)
                .Where(x => x.StudentId == studentId)
                .ToListAsync();

            return complaints;
        }

        public async Task<Complaint?> GetComplaintById(Guid id)
        {
            return await _db.Complaints
                .Include(x => x.Coach)
                .Include(x => x.Student)
                .FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
