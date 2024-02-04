using Basketball.Core.Dtos;

namespace Basketball.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task<string> Register(RegisterDto user);
        Task<string> Login(LoginDto loginDto);
        Task<bool> IsUserExistsByEmail(string email);
        Task<bool> IsUserCredentialsCorrect(LoginDto loginDto);
        Task<bool> IsUserExistsById(Guid id);
    }
}
