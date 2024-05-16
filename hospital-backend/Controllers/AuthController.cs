using hospital_backend.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace hospital_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IJwtGenerationService _jwtService;

        public AuthController(IJwtGenerationService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpGet]
        public IActionResult GetLoginJwt([FromQuery] string role)
        {
            var claims = new List<Claim>();

            if (role == "Admin" || role == "Doctor")
            {
                claims.Add(new(ClaimTypes.Role, role));
                var token = _jwtService.GenerateAccessToken(claims);

                return Ok(token);
            }
            else
            {
                return BadRequest($"Invalid role: {role}. Only Admin and Doctor available");
            }
        }
    }
}
