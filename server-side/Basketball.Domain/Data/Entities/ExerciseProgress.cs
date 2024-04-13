using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Domain.Data.Entities
{
    public class ExerciseProgress
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User user { get; set; } = null!;
        public Guid TrainingPlanId { get; set; }
        public TrainingPlan TrainingPlan { get; set; } = null!;
        public Guid ExerciseId { get; set; }
        public Exercise Exercise { get; set; } = null!;
        public string ProgressVideoUrl { get; set; } = null!;
    }
}
