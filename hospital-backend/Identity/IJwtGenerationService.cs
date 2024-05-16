using System.Security.Claims;

namespace hospital_backend.Identity
{
    public interface IJwtGenerationService
    {
        public string GenerateAccessToken(IEnumerable<Claim> claims);
    }
}
