using System.ComponentModel.DataAnnotations;

namespace Basketball.Core.Dtos
{
    public class PasswordDto
    {
        [MinLength(5, ErrorMessage = "Slaptažodis turi būti bent iš 5 simbolių")]
        public required string OldPassword { get; set; }
        [MinLength(5, ErrorMessage = "Slaptažodis turi būti bent iš 5 simbolių")]
        public required string NewPassword { get; set; }
        [MinLength(5, ErrorMessage = "Slaptažodis turi būti bent iš 5 simbolių")]
        public required string RepeatPassword { get; set; }
    }
}
