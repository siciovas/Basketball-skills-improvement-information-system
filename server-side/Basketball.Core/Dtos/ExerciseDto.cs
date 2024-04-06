﻿using Basketball.Domain.Data.Entities.Enums;

namespace Basketball.Core.Dtos
{
    public class ExerciseDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public bool IsUsed { get; set; }
    }
}
