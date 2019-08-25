using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessAccess.Model
{
    //get visitor rating view: admin
   public class VisitorRating: GamesRating
    {
       public int VisitorCount { get; set; }
        public List<VisitorInfo> Visitors { get; set; }
    }
    //get visitor rating view: admin
    public class VisitorInfo: NewVisitordetails
    {
        public string VisitorName { get; set; }
        public int? VisitorRating { get; set; }
    }

    //[JsonProperty("VistorRatingUpdate")]
    public class VistorRatingUpdate
    {
        public List<UserGameSelectedRating> gamesRatings;
        public NewVisitordetails VisitorInfo;
    
    }
} public class NewVisitordetails
{
    public string Fname;
    public string LName;
    public string EmailId;
}
public class UserGameSelectedRating
{
    public int GameId { get; set; }
    public string GameName { get; set; }
    public int Rating { get; set; }

}
