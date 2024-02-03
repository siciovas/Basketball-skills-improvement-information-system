﻿using Basketball.Domain.Data.Entities.Enums;

namespace Basketball.Core.Dtos
{
    public class RegisterDto
    {
        public required string Name { get; set; }

        public required string Surname { get; set; }

        public required string PhoneNumber { get; set; }

        public required string Email { get; set; }

        public DateOnly BirthDate { get; set; }

        public required string Password { get; set; }

        public Education? Education { get; set; }

        public Role Role { get; set; }

        public int? Experience { get; set; }

        public string? Specialization { get; set; }
    }
}
