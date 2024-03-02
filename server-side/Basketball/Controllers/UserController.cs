using Basketball.Core.Dtos;
using Basketball.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var isUserExists = await _userService.IsUserExistsByEmail(registerDto.Email);

            if (isUserExists)
            {
                return Conflict("User already registered");
            }

            var registeredUser = await _userService.Register(registerDto);

            return CreatedAtAction(nameof(Register), registeredUser);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var isCredentialsCorrect = await _userService.IsUserCredentialsCorrect(loginDto);

            if (!isCredentialsCorrect)
            {
                return BadRequest("Credentials invalid");
            }

            var result = await _userService.Login(loginDto);

            return Ok(new { accessToken = result.Item1, role = result.Item2 });
        }

        [HttpGet]
        [Route("getCoaches")]
        public async Task<IActionResult> GetCoaches()
        {
            if (User.IsInRole("Admin"))
            {
                return Ok(await _userService.GetAllCoaches());
            }

            else
            {
                return Ok(await _userService.GetApprovedCoaches());
            }
        }

        [HttpGet]
        [Route("coachDetails/{id}")]
        public async Task<IActionResult> GetCoachDetails(Guid id)
        {
            var isExists = await _userService.IsUserExistsById(id);

            if (!isExists)
            {
                return NotFound();
            }

            return Ok(await _userService.GetCoachById(id));
        }
    }
}
