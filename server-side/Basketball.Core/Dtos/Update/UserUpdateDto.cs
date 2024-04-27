using Basketball.Domain.Data.Entities.Enums;
using System.ComponentModel.DataAnnotations;

namespace Basketball.Core.Dtos.Update
{
    public class UserUpdateDto
    {
        [RegularExpression(@"^\+?(\d{11}|\d{9})$", ErrorMessage = "Telefono numeris gali prasdėti arba + arba 8")]
        public required string PhoneNumber { get; set; }
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Neteisingas el. paštas")]
        public required string Email { get; set; }
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

        [RegularExpression(@"^-?\d*\.?\d+$", ErrorMessage = "Galimi tik skaičiai")]
        public int? Experience { get; set; }
        public string? Specialization { get; set; }
        public string? Description { get; set; }
    }
}
