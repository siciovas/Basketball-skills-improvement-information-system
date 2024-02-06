using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos.Post
{
    public class FeedbackPostDto
    {
        public required string FeedbackText { get; set; }
        public required Guid TrainingPlanId { get; set; }
    }
}
