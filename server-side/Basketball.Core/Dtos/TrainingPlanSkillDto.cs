using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos
{
    public class TrainingPlanSkillDto
    {
        public required string Name { get; set; }
        public List<string> Exercises { get; set; } = [];
    }
}
