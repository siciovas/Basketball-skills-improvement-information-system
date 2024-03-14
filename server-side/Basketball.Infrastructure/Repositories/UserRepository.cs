using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Domain.Data.Entities.Enums;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _db;

        public UserRepository(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<User> Create(User user)
        {
            var addedUser = _db.Add(user);
            await _db.SaveChangesAsync();

            return addedUser.Entity;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _db.Users.Where(x => x.Email == email).FirstAsync();
        }

        public async Task<User> GetUserById(Guid id)
        {
            return await _db.Users.FirstAsync(x => x.Id == id);
        }

        public Task<bool> IsExistsByEmail(string email)
        {
            return _db.Users.Where(x => x.Email == email).AnyAsync();
        }

        public Task<bool> IsExistsById(Guid id)
        {
            return _db.Users.Where(x => x.Id == id).AnyAsync();
        }

        public async Task<List<User>> GetAllCoaches()
        {
            return await _db.Users.Where(x => x.Role == Role.Coach).ToListAsync();
        }

        public async Task<List<User>> GetApprovedCoaches()
        {
            return await _db.Users.Where(x => x.Role == Role.Coach && x.CoachStatus == CoachStatus.Approved).ToListAsync();
        }

        public async Task<User> Update(User user)
        {
            var updatedCoach = _db.Users.Update(user);
            await _db.SaveChangesAsync();

            return updatedCoach.Entity;
        }
    }
}
