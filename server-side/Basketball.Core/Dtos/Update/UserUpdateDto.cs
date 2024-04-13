using Basketball.Domain.Data.Entities.Enums;

namespace Basketball.Core.Dtos.Update
{
    public class UserUpdateDto
    {
        public required string PhoneNumber { get; set; }
        public required string Email { get; set; }
        public byte[]? Avatar { get; set; }

        // Fields for student
        public int? Height { get; set; }
        public double? Weight { get; set; }
        public double? FootSize { get; set; }
        public int? MetabolicAge { get; set; }

        // Fields for coach
        public Education? Education { get; set; }
        public int? Experience { get; set; }
        public string? Specialization { get; set; }
        public string? Description { get; set; }
    }
}
