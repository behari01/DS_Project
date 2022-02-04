using System.ComponentModel.DataAnnotations;
using System;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password duhet te jete me kompleks")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Emri { get; set; }

        [Required]
        public string Mbiemri { get; set; }

        public DateTime Datelindja { get; set; }

        public string Rruga {get; set;}

        public string Qyteti {get; set;}

        public string NumriKontaktues {get; set;}
    }
}