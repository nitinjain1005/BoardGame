using BusinessAccess;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DataAccess.DataModel;
using System;

namespace BoardGames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        //DI 
        private readonly IBoardGamesRepository boardGamesRepository;
        public AdminController(IBoardGamesRepository _boardGamesRepository)
        {
            boardGamesRepository = _boardGamesRepository;
        }
        // GET: api/Admin
        // Get Game id, name, visitor count and when click on count show visitor name and its rating
        [HttpGet]
        [Route("GamesVisitorRatings")]
        public async Task<IActionResult> GetVisitorGamesRatingDetails()
        {
            try
            {
                return Ok(await boardGamesRepository.GetVisitorGamesRatingDetails());

            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        // Adding Game by admin
        [HttpPost]
        [Route("AddGame")]
        public async Task<IActionResult> AddGame([FromBody]Game game)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var gameId = await boardGamesRepository.AddGame(game);
                    if (gameId > 0)
                        return Ok(gameId);
                    else
                        return NotFound();
                }
                catch(Exception ex)
                {
                 
                    return BadRequest();

                }
            }
            return BadRequest();
        }

        // Delete the game based on passed game id
        [HttpDelete]
        [Route("DeleteGame")]
        public async Task<IActionResult> DeleteGame(int gameId)
        {
            int result = 0;
           
            try
            {
                result = await boardGamesRepository.DeleteGame(gameId);
                if (result == 0)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
