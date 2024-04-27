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
        public required List<string> TrainingPlans { get; set; }
        public Guid UserId { get; set; }
        public bool IsExistsNotEvaluatedExercises { get; set; }
    }
}
