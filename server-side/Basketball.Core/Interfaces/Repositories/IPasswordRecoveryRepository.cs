using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface IPasswordRecoveryRepository
    {
        Task<PasswordRecovery> Create(PasswordRecovery passwordRecovery);
        Task Delete(PasswordRecovery passwordRecovery);
        Task<PasswordRecovery?> GetPasswordRecoveryById(Guid id);
    }
}
