using Basketball.Core.Dtos;
using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Services
{
    public interface IPasswordRecoveryService
    {
        Task<PasswordRecovery> Create(string email);
        Task CreateNewPassword(string password, Guid id);
    }
}
