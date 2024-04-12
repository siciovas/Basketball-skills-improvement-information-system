using Basketball.Domain.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface IExerciseFlowRepository
    {
        Task<string> UploadExerciseProgressUrl(ExerciseProgress exerciseProgress);
    }
}
