using System;
using System.Collections.Generic;

namespace DataAccess.DataModel
{
    public partial class Visitor
    {
        // Visitor details - DB class
        public Visitor()
        {
            VisitorGamesRating = new HashSet<VisitorGamesRating>();
        }

        public int VisitorId { get; set; }
        public string Fname { get; set; }
        public string EmailId { get; set; }
        public string Lname { get; set; }

        public virtual ICollection<VisitorGamesRating> VisitorGamesRating { get; set; }
    }
}
