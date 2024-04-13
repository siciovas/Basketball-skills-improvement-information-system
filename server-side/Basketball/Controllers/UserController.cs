using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Update;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

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
        [Authorize]
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
        [Authorize(Roles = "Coach")]
        [Route("home")]
        public async Task<IActionResult> GetHomeData()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            return Ok(await _userService.GetHomeData(userId));
        }

        [HttpGet]
        [Authorize]
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

        [HttpPut]
        [Authorize(Roles = "Admin")]
        [Route("status/{id}")]
        public async Task<IActionResult> UpdateCoachStatus([FromQuery(Name = "status")] CoachStatus status, Guid id)
        {
            var isExists = await _userService.IsUserExistsById(id);

            if (!isExists)
            {
                return NotFound();
            }
            var updatedStatus = await _userService.ChangeCoachStatus(id, status);

            return Ok(updatedStatus);
        }

        [HttpDelete]
        [Authorize]
        [Route("deleteProfile")]
        public async Task<IActionResult> DeleteProfile()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var isExists = await _userService.IsUserExistsById(userId);

            if (!isExists)
            {
                return NotFound();
            }

            await _userService.Delete(userId);

            return NoContent();
        }

        [HttpPut]
        [Route("update")]
        [Authorize]
        public async Task<IActionResult> Update(UserUpdateDto userDto)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var isExists = await _userService.IsUserExistsById(userId);

            if (!isExists)
            {
                return NotFound();
            }

            await _userService.Update(userId, userDto);

            return Ok();
        }

        [HttpPut]
        [Route("updatePassword")]
        [Authorize]
        public async Task<IActionResult> UpdatePassword(PasswordDto passwordDto)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var isExists = await _userService.IsUserExistsById(userId);

            if (!isExists)
            {
                return NotFound();
            }

            await _userService.UpdatePassword(userId, passwordDto);

            return Ok();
        }

        [HttpGet]
        [Route("me")]
        [Authorize]
        public async Task<IActionResult> GetMe()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var user = await _userService.GetMe(userId);

            return Ok(user);
        }
    }
}