using Microsoft.AspNetCore.Identity;
using System;

namespace Domain
{
    public class UserNxenesi : IdentityUser
    {
        public string DisplayName { get; set; }
        
        public int Roli { get; set; }

        public string Emri {get; set;}

        public string Mbiemri {get; set;}

        public DateTime Datelindja { get; set; }

        public string Rruga {get; set;}

        public string Qyteti {get; set;}

        public string NumriKontaktues {get; set;}

    }
}

