using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public  class UserRepository : IUserRepository
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

        public Task<bool> IsExistsByEmail(string email)
        {
            return _db.Users.Where(x => x.Email == email).AnyAsync();
        }
    }
}
