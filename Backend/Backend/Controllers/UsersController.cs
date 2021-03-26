using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Backend.Helpers;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            var response = await _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpPost("create")] 
        public async Task<IActionResult> CreateUser(User user)
        {
            var response = await _userService.CreateUser(user);
            
            if(response == null)
                return BadRequest(new { message = "Another User is currently using this email or username" });
            
            return Ok(response);
        }

        [HttpPost("update")] 
        [Authorize]
        public async Task<IActionResult> UpdateUser(UpdateUserRequest newUser)
        {
            var user = (User)HttpContext.Items["User"];
            var res = await _userService.UpdateUser(user, newUser);

            if(res == null)
                return BadRequest(new { message = "Invalid Password" });
            
            return Ok(res);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}