using System;
using System.Collections.Generic;

namespace DataAccess.DataModel
{
    // User details
    public partial class User
    {
        public int UserId { get; set; }
        public string LoginId { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
    }
}
