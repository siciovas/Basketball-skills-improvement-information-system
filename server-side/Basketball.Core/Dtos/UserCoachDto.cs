using Basketball.Domain.Data.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos
{
    public class UserCoachDto
    {
        public Guid Id { get; set; }
        public required string FullName { get; set; }
        public required string Email { get; set; }
        public DateOnly BirthDate { get; set; }
        public Education? Education { get; set; }
        public required string Specialization { get; set; }
        public double? Rating { get; set; }
        public CoachStatus? CoachStatus { get; set; }
        public DateOnly RegisterDate { get; set; }

    }
}
