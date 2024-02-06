using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Domain.Data.Entities
{
    public class Feedback
    {
        public Guid Id { get; set; }
        public required string FeedbackText { get; set; }
        public DateOnly Date { get; set; }
        public Guid StudentId { get; set; }
        public User Student { get; set; } = null!;
        public Guid TrainingPlanId { get; set; }
        public TrainingPlan TrainingPlan { get; set; } = null!;


    }
}
