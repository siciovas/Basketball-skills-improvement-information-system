using Basketball.Core.Dtos;
using Basketball.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/passwordRecovery")]
    public class PasswordRecoveryController(IPasswordRecoveryService passwordRecoveryService, IUserService userService) : ControllerBase
    {
        private readonly IPasswordRecoveryService _passwordRecoveryService = passwordRecoveryService;
        private readonly IUserService _userService = userService;

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

        [HttpPost]
        [Route("newPassword/{id}")]
        public async Task<IActionResult> CreateNewPassword(NewPasswordRecoveryDto passwordRecoveryDto, Guid id)
        {
            if(passwordRecoveryDto.Password != passwordRecoveryDto.ConfirmPassword)
            {
                return BadRequest("Slaptažodžiai nesutampa");
            }

            await _passwordRecoveryService.CreateNewPassword(passwordRecoveryDto.Password, id);

            return Ok();
        }
    }
}
