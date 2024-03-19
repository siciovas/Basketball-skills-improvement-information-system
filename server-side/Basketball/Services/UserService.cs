using Basketball.Core.Dtos;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;
using Basketball.Domain.Data.Entities.Enums;
using Basketball.Infrastructure.Authentication;

namespace Basketball.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly ITrainingPlanRepository _trainingPlanRepository;

        public UserService(IJwtTokenService jwtTokenService, IUserRepository userRepository, ITrainingPlanRepository trainingPlanRepository)
        {
            _jwtTokenService = jwtTokenService;
            _userRepository = userRepository;
            _trainingPlanRepository = trainingPlanRepository;
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
                MetabolicAge = user.MetabolicAge,
                Description = user.Description,
                Gender = user.Gender,
                Avatar = user.Avatar,
                CoachStatus = user.Role == Role.Coach ? CoachStatus.Pending : null,
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
                RegisterDate = x.RegisterDate,
                Gender = x.Gender,
                Avatar = x.Avatar,
            }).ToList();
        }

        public async Task<List<UserCoachDto>> GetApprovedCoaches()
        {
            var coaches = await _userRepository.GetApprovedCoaches();

            var trainingPlansCount = await _trainingPlanRepository.GetTrainingPlansCountByCoachId(coaches.Select(x => x.Id).ToList());

            var allCoaches = coaches.Select(x => new UserCoachDto
            {
                Id = x.Id,
                FullName = string.Format("{0} {1}", x.Name, x.Surname),
                Email = x.Email,
                BirthDate = x.BirthDate,
                Education = x.Education!,
                Specialization = x.Specialization!,
                Rating = x.Rating!,
                CoachStatus = x.CoachStatus!,
                RegisterDate = x.RegisterDate,
                Description = x.Description,
                Gender = x.Gender,
                Avatar = x.Avatar,
                TrainingPlansCount = trainingPlansCount.TryGetValue(x.Id, out int value) ? value : 0
            });

            return allCoaches.ToList();
        }

        public async Task<UserCoachDto> GetCoachById(Guid id)
        {
            var coach = await _userRepository.GetUserById(id);

            var trainingPlans = await _trainingPlanRepository.GetAllByCoachId(id);

            return new UserCoachDto
            {
                Id = coach.Id,
                FullName = string.Format("{0} {1}", coach.Name, coach.Surname),
                Email = coach.Email,
                BirthDate = coach.BirthDate,
                Education = coach.Education!,
                Specialization = coach.Specialization!,
                Rating = coach.Rating!,
                CoachStatus = coach.CoachStatus!,
                RegisterDate = coach.RegisterDate,
                Description = coach.Description,
                Experience = coach.Experience,
                PhoneNumber = coach.PhoneNumber,
                Gender = coach.Gender,
                Avatar = coach.Avatar,
                TrainingPlansCount = trainingPlans.Count,
                TrainingPlans = trainingPlans.Select(x => new TrainingPlanSummaryDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Price = x.Price,
                    ShortDescription = x.ShortDescription
                }).ToList()
            };
        }

        public async Task<User> ChangeCoachStatus(Guid id, CoachStatus status)
        {
            var coach = await _userRepository.GetUserById(id);

            coach.CoachStatus = status;

            var updatedCoach = await _userRepository.Update(coach);

            return updatedCoach;
        }

        public async Task Delete(Guid id)
        {
            var user = await _userRepository.GetUserById(id);

            await _userRepository.Delete(user!);
        }

        public async Task UpdatePassword(Guid id, PasswordDto passwordDto)
        {
            var user = await _userRepository.GetUserById(id);

            if (BCrypt.Net.BCrypt.Verify(passwordDto.OldPassword, user.Password))
            {
                if (passwordDto.NewPassword == passwordDto.RepeatPassword)
                {
                    var passwordHash = BCrypt.Net.BCrypt.HashPassword(passwordDto.NewPassword);

                    user.Password = passwordHash;

                    await _userRepository.Update(user);
                }
            }
        }

        public async Task<MeDto> GetMe(Guid id)
        {
            var user = await _userRepository.GetUserById(id);

            return new MeDto
            {
                Email = user.Email,
                Name = user.Name,
                PhoneNumber = user.PhoneNumber,
                Surname = user.Surname,
                Avatar = user.Avatar,
                BirthDate = user.BirthDate,
                RegisterDate = user.RegisterDate,
                AdditionalInfo = new AdditionalInfo
                {
                    CoachStatus = user.CoachStatus,
                    Description = user.Description,
                    Education = user.Education,
                    Experience = user.Experience,
                    FootSize = user.FootSize,
                    Height = user.Height,
                    MetabolicAge = user.MetabolicAge,
                    Rating = user.Rating,
                    Specialization = user.Specialization,
                    Weight = user.Weight,
                }
            };
        }
    }
}
