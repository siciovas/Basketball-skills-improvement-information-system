using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<bool> IsExistsByEmail(string email);
        Task<bool> IsExistsById(Guid id);
        Task<User> Create(User user);
        Task<User> GetUserByEmail(string email);
    }
}
