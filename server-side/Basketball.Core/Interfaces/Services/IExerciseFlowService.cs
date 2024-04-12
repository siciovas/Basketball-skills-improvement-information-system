using Basketball.Core.Dtos.Post;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Interfaces.Services
{
    public interface IExerciseFlowService
    {
        Task<string> UploadExerciseProgress(UploadExerciseProgressPostDto progressDto, Guid userId);
    }
}
