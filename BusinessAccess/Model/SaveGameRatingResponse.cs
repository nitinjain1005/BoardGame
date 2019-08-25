using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessAccess.Model
{
    // Response class for visitor rating against game and with message
    public class SaveGameRatingResponse
    {
        public string GameName { get; set; }
        public int UserGameRating { get; set; }
        public string Message { get; set; }
    }
   
}
