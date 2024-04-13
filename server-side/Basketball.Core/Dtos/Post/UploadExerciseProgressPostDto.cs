using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos.Post
{
    public class UploadExerciseProgressPostDto
    {
        public Guid TrainingPlanId { get; set; }
        public Guid ExerciseId { get; set; }
        public IFormFile ExerciseProgressVideo { get; set; } = null!;
    }
}
