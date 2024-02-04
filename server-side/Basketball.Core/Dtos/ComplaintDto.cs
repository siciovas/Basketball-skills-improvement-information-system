﻿using Basketball.Domain.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos
{
    public class ComplaintDto
    {
        public required Guid Id { get; set; }
        public required string Text { get; set; }
        public required string StudentFullName { get; set; }
        public required string CoachFullName { get; set; }
    }
}
