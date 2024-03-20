using Basketball.Domain.Data.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos
{
    public class MeDto
    {
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Email { get; set; }
        public DateOnly BirthDate { get; set; }
        public DateOnly RegisterDate { get; set; }
        public byte[]? Avatar { get; set; }
        public AdditionalInfo? AdditionalInfo { get; set; }
    }

    public class AdditionalInfo
    {
        // Fields for student
        public int? Height { get; set; }
        public double? Weight { get; set; }
        public double? FootSize { get; set; }
        public int? MetabolicAge { get; set; }

        // Fields for coach
        public Education? Education { get; set; }
        public int? Experience { get; set; }
        public string? Specialization { get; set; }
        public double? Rating { get; set; }
        public CoachStatus? CoachStatus { get; set; }
        public string? Description { get; set; }
    }
}
