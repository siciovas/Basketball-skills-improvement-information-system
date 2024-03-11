using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Services
{
    public interface IPasswordRecoveryService
    {
        Task<PasswordRecovery> Create(string email);
        Task Delete(Guid id);
    }
}
