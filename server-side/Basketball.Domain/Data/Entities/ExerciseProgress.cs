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
        public Guid TrainingPlanId { get; set; }
        public Guid ExerciseId { get; set; }
        public string ProgressVideoUrl { get; set; } = null!;
    }
}
