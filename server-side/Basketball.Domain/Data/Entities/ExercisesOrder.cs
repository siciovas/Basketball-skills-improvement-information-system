﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Domain.Data.Entities
{
    public class ExercisesOrder
    {
        public required Guid ExerciseId { get; set; }
        public required Guid SkillId { get; set; }
        public required int Order { get; set; }
    }
}
