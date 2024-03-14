using Basketball.Core.Dtos;
using Basketball.Domain.Data.Entities;
using Basketball.Domain.Data.Entities.Enums;

namespace Basketball.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task<string> Register(RegisterDto user);
        Task<(string, string)> Login(LoginDto loginDto);
        Task<bool> IsUserExistsByEmail(string email);
        Task<bool> IsUserCredentialsCorrect(LoginDto loginDto);
        Task<bool> IsUserExistsById(Guid id);
        Task<List<UserCoachDto>> GetAllCoaches();
        Task<List<UserCoachDto>> GetApprovedCoaches();
        Task<UserCoachDto> GetCoachById(Guid id);
        Task<User> ChangeCoachStatus(Guid id, CoachStatus status);
    }
}
