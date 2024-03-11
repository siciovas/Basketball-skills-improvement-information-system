using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;
using System.Text;

namespace Basketball.Services
{
    public class PasswordRecoveryService : IPasswordRecoveryService
    {
        private readonly IPasswordRecoveryRepository _passwordRecoveryRepository;
        private readonly IUserRepository _userRepository;

        public PasswordRecoveryService(IPasswordRecoveryRepository passwordRecoveryRepository, IUserRepository userRepository)
        {
            _passwordRecoveryRepository = passwordRecoveryRepository;
            _userRepository = userRepository;
        }

        public async Task<PasswordRecovery> Create(string email)
        {
            var user = await _userRepository.GetUserByEmail(email);

            var newPasswordRecovery = new PasswordRecovery
            {
                UserId = user.Id,
            };

            var createdPasswordRecovery = await _passwordRecoveryRepository.Create(newPasswordRecovery);

            return createdPasswordRecovery;
        }

        public async Task Delete(Guid id)
        {
            var recoveredPassword = await _passwordRecoveryRepository.GetPasswordRecoveryById(id);

            await _passwordRecoveryRepository.Delete(recoveredPassword!);
        }
    }
}
