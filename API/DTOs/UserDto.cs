using System;

namespace API.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; }

        public string Token { get; set; }

        public string Username { get; set; }

        public string Image { get; set; }

        public int Roli { get; set; }

        public string Emri { get; set; }

        public string Mbiemri { get; set; }

        public DateTime Datelindja { get; set; }

        public string Rruga {get; set;}

        public string Qyteti {get; set;}

        public string Email {get; set;}

        public string NumriKontaktues {get; set;}
    }
}