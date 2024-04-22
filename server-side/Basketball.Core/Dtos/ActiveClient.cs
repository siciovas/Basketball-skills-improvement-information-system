using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos
{
    public class ActiveClient
    {
        public required string FullName { get; set; }
        public required string TrainingPlan { get; set; }
        public Guid TrainingPlanId { get; set; }
        public Guid UserId { get; set; }
        public DateTime Deadline { get; set; }
        public bool IsExistsNotEvaluatedExercises { get; set; }
    }
}
