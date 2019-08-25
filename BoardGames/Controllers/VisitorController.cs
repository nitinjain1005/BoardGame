using BusinessAccess;
using BusinessAccess.Model;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace BoardGames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitorController : ControllerBase
    {
        //DI
        private readonly IBoardGamesRepository boardGamesRepository;
        public VisitorController(IBoardGamesRepository _boardGamesRepository)
        {
            boardGamesRepository = _boardGamesRepository;
        }

        // Get method to get visitor details
        // GET: api/Visitor
        [HttpGet]
        [Route("GetGamesRatings")]
        public async Task<IActionResult> GetGamesRatingDetails()
        {
            try
            {
                return Ok(await boardGamesRepository.GetGamesAverageRatings());

            }
            catch
            {
                return BadRequest();
            }
        }

        // Post methid to save visitor data with rating in to DB
        // POST: api/Visitor
        [HttpPost]
        [Route("saveUserGameRating")]
        public async Task<IActionResult> SaveUserGameRating([FromBody] JObject vistorRatingUpdate)
        {
            try
            {
               
                VistorRatingUpdate _vistorRatingUpdate = JsonConvert.DeserializeObject<VistorRatingUpdate>(vistorRatingUpdate.ToString());
                return Ok(await boardGamesRepository.SaveUserGameRating(_vistorRatingUpdate));

            }
            catch 
            {
                return BadRequest();
            }
        }
    }
}
