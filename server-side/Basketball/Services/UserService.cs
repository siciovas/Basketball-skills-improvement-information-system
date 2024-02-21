using Basketball.Core.Dtos;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Authentication;

namespace Basketball.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenService _jwtTokenService;

        public UserService(IJwtTokenService jwtTokenService, IUserRepository userRepository)
        {
            _jwtTokenService = jwtTokenService;
            _userRepository = userRepository;
        }

        public async Task<bool> IsUserCredentialsCorrect(LoginDto loginDto)
        {
            var isUserExists = await _userRepository.IsExistsByEmail(loginDto.Email);

            if (!isUserExists)
            {
                return false;
            }

            var user = await _userRepository.GetUserByEmail(loginDto.Email);

            return BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password);
        }

        public async Task<bool> IsUserExistsById(Guid id)
        {
            return await _userRepository.IsExistsById(id);
        }

        public async Task<bool> IsUserExistsByEmail(string email)
        {
            return await _userRepository.IsExistsByEmail(email);
        }

        public async Task<(string, string)> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByEmail(loginDto.Email);

            var token = _jwtTokenService.CreateAccessToken(loginDto.Email, user.Id.ToString(), user.Role);

            return (token.ToString(), user.Role.ToString());
        }

        public async Task<string> Register(RegisterDto user)
        {
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);

            var newUser = new User
            {
                Id = Guid.NewGuid(),
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                Password = passwordHash!,
                PhoneNumber = user.PhoneNumber,
                BirthDate = user.BirthDate,
                Education = user.Education,
                Experience = user.Experience,
                Role = user.Role,
                Specialization = user.Specialization,
                Height = user.Height,
                Weight = user.Weight,
                FootSize = user.FootSize,
                MetabolicAge = user.MetabolicAge
            };

            var createdUser = await _userRepository.Create(newUser);

            return createdUser.Email;
        }

        public async Task<List<UserCoachDto>> GetAllCoaches()
        {
            var coaches = await _userRepository.GetAllCoaches();

            return coaches.Select(x => new UserCoachDto
            {
                Id = x.Id,
                FullName = string.Format("{0} {1}", x.Name, x.Surname),
                Email = x.Email,
                BirthDate = x.BirthDate,
                Education = x.Education,
                Specialization = x.Specialization!,
                Rating = x.Rating,
                CoachStatus = x.CoachStatus,
            }).ToList();
        }

        public async Task<List<UserCoachDto>> GetApprovedCoaches()
        {
            var coaches = await _userRepository.GetApprovedCoaches();

            return coaches.Select(x => new UserCoachDto
            {
                Id = x.Id,
                FullName = string.Format("{0} {1}", x.Name, x.Surname),
                Email = x.Email,
                BirthDate = x.BirthDate,
                Education = x.Education!,
                Specialization = x.Specialization!,
                Rating = x.Rating!,
                CoachStatus = x.CoachStatus!,
            }).ToList();
        }
    }
}
