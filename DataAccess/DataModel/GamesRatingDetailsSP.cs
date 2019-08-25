using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.DataModel
{
    //Class for getting visitors rating via stored procedure for visitor
    public class GamesRatingDetailsSP
    {
        [Key]
        public int GameId { get; set; }
        public string GameName { get; set; }
        public int? AverageRating { get; set; }
        public int? Rating { get; set; }

    }
}
