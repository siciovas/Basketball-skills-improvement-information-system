using System.ComponentModel.DataAnnotations;

namespace Basketball.Core.Dtos
{
    public class LoginDto
    {
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Neteisingas el. paštas")]
        public required string Email { get; set; }
        [Required]
        [MinLength(5, ErrorMessage = "Slaptažodis turi būti bent iš 5 simbolių")]
        public required string Password { get; set; }
    }
}
