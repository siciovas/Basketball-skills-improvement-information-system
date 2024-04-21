using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class PasswordRecoveryRepository(DatabaseContext db) : IPasswordRecoveryRepository
    {
        private readonly DatabaseContext _db = db;

        public async Task<PasswordRecovery> Create(PasswordRecovery passwordRecovery)
        {
            var createdPasswordRecovery = _db.Add(passwordRecovery);

            await _db.SaveChangesAsync();

            return createdPasswordRecovery.Entity;
        }

        public async Task Delete(PasswordRecovery passwordRecovery)
        {
            _db.PasswordRecovery.Remove(passwordRecovery);

            await _db.SaveChangesAsync();
        }

        public async Task<PasswordRecovery?> GetPasswordRecoveryById(Guid id)
        {
            return await _db.PasswordRecovery.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
