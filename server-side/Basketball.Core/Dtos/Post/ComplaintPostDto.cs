using Basketball.Domain.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos.Post
{
    public class ComplaintPostDto
    {
        public required string Text { get; set; }
        public required Guid studentId { get; set; }
        public required Guid coachId { get; set; }
    }
}
