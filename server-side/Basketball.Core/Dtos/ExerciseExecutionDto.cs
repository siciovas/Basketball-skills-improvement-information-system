using Basketball.Domain.Data.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos
{
    public class ExerciseExecutionDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public int? Grade { get; set; }
        public bool IsLocked { get; set; }
        public required string ExerciseVideoUrl { get; set; }
        public string? Comment { get; set; }
        public Difficulty Difficulty { get; set; }
    }
}
