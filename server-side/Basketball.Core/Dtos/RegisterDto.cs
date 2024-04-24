using Basketball.Domain.Data.Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace Basketball.Core.Dtos
{
    public class RegisterDto
    {
        [Required]
        [RegularExpression(@"^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]*$", ErrorMessage = "Specialūs simboliai vardo laukelyje negalimi!")]
        public required string Name { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]*$", ErrorMessage = "Specialūs simboliai pavardės laukelyje negalimi!")]
        public required string Surname { get; set; }

        [Required]
        [RegularExpression(@"^\+?(\d{11}|\d{9})$", ErrorMessage = "Telefono numeris gali prasdėti arba + arba 8")]
        public required string PhoneNumber { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Neteisingas el. paštas")]
        public required string Email { get; set; }

        public DateOnly BirthDate { get; set; }

        public Role Role { get; set; }

        [Required]
        [MinLength(5, ErrorMessage = "Slaptažodis turi būti bent iš 5 simbolių")]
        public required string Password { get; set; }

        public Gender? Gender { get; set; }

        public byte[]? Avatar { get; set; }

        // Fields for student
        [RegularExpression(@"^-?\d*\.?\d+$", ErrorMessage = "Galimi tik skaičiai")]
        public int? Height { get; set; }

        [RegularExpression(@"^-?\d*\.?\d+$", ErrorMessage = "Galimi tik skaičiai")]
        public double? Weight { get; set; }

        [RegularExpression(@"^-?\d*\.?\d+$", ErrorMessage = "Galimi tik skaičiai")]
        public double? FootSize { get; set; }

        [RegularExpression(@"^-?\d*\.?\d+$", ErrorMessage = "Galimi tik skaičiai")]
        public int? MetabolicAge { get; set; }

        // Fields for coach
        public Education? Education { get; set; }
        public int? Experience { get; set; }
        public string? Specialization { get; set; }
        public string? Description { get; set; }
    }
}
