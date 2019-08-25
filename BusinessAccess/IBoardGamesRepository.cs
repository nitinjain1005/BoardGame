using BusinessAccess.Model;
using DataAccess.DataModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessAccess
{
    public interface IBoardGamesRepository
    {
        #region--Visitor--
        //visitor controller
        Task<List<GamesRating>> GetGamesAverageRatings();
        //visitor controller
        Task<List<SaveGameRatingResponse>> SaveUserGameRating(VistorRatingUpdate vistorRatingUpdate);
        #endregion

        #region--Admin--
        // admin controller
        Task<List<VisitorRating>> GetVisitorGamesRatingDetails();
        // admin controller
        Task<int> AddGame(Game game);
        // admin controller
        Task<int> DeleteGame(int gameId);
        #endregion

        #region--LogIn--
        bool IsValidUser(LoginView userCredetials);
        #endregion


    }
}
