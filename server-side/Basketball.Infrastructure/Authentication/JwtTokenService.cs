using Basketball.Domain.Data.Entities.Enums;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Basketball.Infrastructure.Authentication
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;
        private readonly SymmetricSecurityKey _authSigningKey;
        private readonly string _audienice;
        private readonly string _issuer;

        public JwtTokenService(IConfiguration configuration)
        {
            _audienice = configuration.GetSection("JwtSettings:Audience").Value!.ToString();
            _issuer = configuration.GetSection("JwtSettings:Issuer").Value!.ToString();
            _jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            _authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("JwtSettings:Secret").Value!.ToString()));
        }

        public string CreateAccessToken(string email, string userId, Role role)
        {
            var securityToken = CreateSecurityToken(email, userId, role);

            return _jwtSecurityTokenHandler.WriteToken(securityToken);
        }

        private JwtSecurityToken CreateSecurityToken(string email, string userId, Role role)
        {
            var claims = new List<Claim>
        {
            new(ClaimTypes.Name, email),
            new(ClaimTypes.Sid, userId),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Sub, value: userId),
            new(ClaimTypes.Role, role.ToString())
        };

            var accessSecurityToken = new JwtSecurityToken
            (
                issuer: _issuer,
                audience: _audienice,
                expires: DateTime.UtcNow.AddHours(24),
                claims: claims,
                signingCredentials: new SigningCredentials(_authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return accessSecurityToken;
        }
    }
}
