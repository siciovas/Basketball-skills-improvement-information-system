using Azure.Storage.Blobs;
using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class ExerciseFlowService(IExerciseFlowRepository exerciseFlowRepository, IConfiguration configuration) : IExerciseFlowService
    {
        private readonly IExerciseFlowRepository _exerciseFlowRepository = exerciseFlowRepository;
        private readonly IConfiguration _configuration = configuration;

        public async Task<string> UploadExerciseProgress(UploadExerciseProgressPostDto progressDto, Guid userId)
        {
            var container = new BlobContainerClient(_configuration["ConnectionStrings:StorageConnectionString"], "progressvideos");
            var blob = container.GetBlobClient($"progress_{Guid.NewGuid()}_{progressDto.ExerciseProgressVideo.FileName}.mp4");

            await blob.UploadAsync(progressDto.ExerciseProgressVideo.OpenReadStream());

            var newExerciseProgress = new ExerciseProgress
            {
                ExerciseId = progressDto.ExerciseId,
                TrainingPlanId = progressDto.TrainingPlanId,
                UserId = userId,
                ProgressVideoUrl = blob.Uri.ToString()
            };

            var exerciseProgressUrl = await _exerciseFlowRepository.UploadExerciseProgressUrl(newExerciseProgress);

            return exerciseProgressUrl;
        }
    }
}
