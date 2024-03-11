using Basketball.Core.Dtos;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/passwordRecovery")]
    public class PasswordRecoveryController : ControllerBase
    {
        private readonly IPasswordRecoveryService _passwordRecoveryService;
        private readonly IUserService _userService;

        public PasswordRecoveryController(IPasswordRecoveryService passwordRecoveryService, IUserService userService)
        {
            _passwordRecoveryService = passwordRecoveryService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Post(PasswordRecoveryDto passwordRecoveryDto)
        {
            var isExists = await _userService.IsUserExistsByEmail(passwordRecoveryDto.Email);

            if (!isExists)
            {
                return NotFound();
            }

            var createdPasswordRecovery = await _passwordRecoveryService.Create(passwordRecoveryDto.Email);

            return CreatedAtAction(nameof(Post), createdPasswordRecovery);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _passwordRecoveryService.Delete(id);

            return NoContent();
        }
    }
}
