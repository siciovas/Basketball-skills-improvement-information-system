using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos
{
    public class TrainingPlanExecutionDto
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Coach { get; set; }
        public List<SkillExecutionDto> Skills { get; set; } = [];
        public DateTime Deadline { get; set; }
        public required string ProgressCounter { get; set; }
        public required string FinalMark { get; set; }

    }
}
