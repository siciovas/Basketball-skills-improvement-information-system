using Basketball.Domain.Data.Entities.Enums;

namespace Basketball.Infrastructure.Authentication
{
    public interface IJwtTokenService
    {
        public string CreateAccessToken(string email, string userId, Role role);
    }
}
