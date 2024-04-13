using Basketball.Domain.Data.Entities;
using Basketball.Domain.Data.Entities.Enums;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<bool> IsExistsByEmail(string email);
        Task<bool> IsExistsById(Guid id);
        Task<User> Create(User user);
        Task<User> GetUserByEmail(string email);
        Task<List<User>> GetAllCoaches();
        Task<List<User>> GetApprovedCoaches();
        Task<User> GetUserById(Guid id);
        Task<User> Update(User user);
        Task Delete(User user);
        Task<string> GetAdminEmail();
        Task<List<User>> GetAllStudents();
    }
}
