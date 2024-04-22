using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos
{
    public class ExerciseEvaluationDto
    {
        public required string Student { get; set; }
        public List<SubmittedExercise> SubmittedExercises { get; set; } = [];

    }

    public class SubmittedExercise
    {
        public required Guid Id { get; set; }
        public required string Title { get; set; }
        public required string VideoUrl { get; set; }
        public string? Comment { get; set; }
        public int? Grade { get; set; }
    }
}
