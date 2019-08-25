using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.DataModel
{
    // DB Class for games 
    public partial class Game
    {
        public int GameId { get; set; }
        public string GameName { get; set; }
        public bool IsDeleted { get; set; }
        public string CreatedBy { get; set; }
    }
}
