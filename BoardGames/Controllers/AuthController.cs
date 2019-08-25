using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BusinessAccess;
using BusinessAccess.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace BoardGames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public IConfiguration Configuration { get; }
        private readonly IBoardGamesRepository boardGamesRepository;
        public AuthController(IBoardGamesRepository _boardGamesRepository, IConfiguration configuration)
        {
            boardGamesRepository = _boardGamesRepository;
            Configuration = configuration;
        }

        // Method to generate te taoken for authentication
        [HttpPost, Route("GenerateToken")]
        public IActionResult CreateTokenAsync([FromBody]LoginView LoginInfo)
        {
            if (LoginInfo == null)
            {
                return BadRequest("Invalid login request");
            }

            if (boardGamesRepository.IsValidUser(LoginInfo))
            {
                // if user valid: Generate the token
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtSecurityToken:Key"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: Configuration["JwtSecurityToken:Issuer"],
                    audience: Configuration["JwtSecurityToken:Audience"],
                    claims: new List<Claim>(), //we can set from  user identity
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}