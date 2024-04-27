using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos
{
    public class TrainingPlanEvaluationDto
    {
        public required string Title { get; set; }
        public List<SubmittedExercise> SubmittedExercises { get; set; } = [];
        public bool IsPersonal { get; set; }
        public string? TrainingPlanRequest { get; set; }
        public required string FinalMark { get; set; }
        public required string ProgressCounter { get; set; }

    }

    public class AllEvaluationDto
    {
        public required string Student { get; set; }
        public required List<TrainingPlanEvaluationDto> TrainingPlansEvaluations { get; set; }
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
