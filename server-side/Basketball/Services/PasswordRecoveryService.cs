using Basketball.Core.Dtos;
using Basketball.Core.Email;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class PasswordRecoveryService(IPasswordRecoveryRepository passwordRecoveryRepository,
        IUserRepository userRepository,
        IEmailService emailService,
        IConfiguration configuration) : IPasswordRecoveryService
    {
        private readonly IPasswordRecoveryRepository _passwordRecoveryRepository = passwordRecoveryRepository;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IEmailService _emailService = emailService;
        private readonly IConfiguration _configuration = configuration;

        public async Task<PasswordRecovery> Create(string email)
        {
            var user = await _userRepository.GetUserByEmail(email);

            var newPasswordRecovery = new PasswordRecovery
            {
                UserId = user.Id,
            };

            var createdPasswordRecovery = await _passwordRecoveryRepository.Create(newPasswordRecovery);

            var emailTemplate = EmailTemplates.Templates["PasswordRecovery"];

            var emailData = new EmailData
            {
                Subject = emailTemplate[0],
                Recipients = ["ignasilin@gmail.com"],
                Content = string.Format(emailTemplate[1], $"{_configuration["AppUrl"]}/newPassword/{createdPasswordRecovery.Id}")
            };

            _ = Task.Run(() => _emailService.SendEmail(emailData));

            return createdPasswordRecovery;
        }

        public async Task CreateNewPassword(string password, Guid id)
        {
            var passwordRecoveryObject = await _passwordRecoveryRepository.GetPasswordRecoveryById(id);

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

            var user = await _userRepository.GetUserById(passwordRecoveryObject!.UserId);

            user.Password = passwordHash;

            await _userRepository.Update(user);

            var recoveredPassword = await _passwordRecoveryRepository.GetPasswordRecoveryById(id);

            await _passwordRecoveryRepository.Delete(recoveredPassword!);
        }
    }
}
