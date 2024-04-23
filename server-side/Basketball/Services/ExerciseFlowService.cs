using Azure.Storage.Blobs;
using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class ExerciseFlowService(IExerciseFlowRepository exerciseFlowRepository, IConfiguration configuration, IUserRepository userRepository, IOrderRepository orderRepository) : IExerciseFlowService
    {
        private readonly IExerciseFlowRepository _exerciseFlowRepository = exerciseFlowRepository;
        private readonly IConfiguration _configuration = configuration;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IOrderRepository _orderRepository = orderRepository;

        public async Task<EvaluationDto> EvaluateExercise(Guid id, EvaluationDto evaluationDto)
        {
            var exerciseProgress = await _exerciseFlowRepository.GetProgressById(id);
            exerciseProgress.Comment = evaluationDto.Comment;
            exerciseProgress.Grade = evaluationDto.Grade;

            var updated = await _exerciseFlowRepository.Update(exerciseProgress);

            return new EvaluationDto
            {
                Grade = (int)updated.Grade!,
                Comment = evaluationDto.Comment,
            };
        }

        public async Task<List<ActiveClient>> GetActiveClients(Guid userId)
        {
            var notEvaluatedExercisesCounts = new Dictionary<Guid, int>();
            var activeClients = await _orderRepository.GetActiveClients(userId);

            foreach (var activeClient in activeClients)
            {
                var clientNotEvaluatedExercisesCount = await _exerciseFlowRepository.GetCounterByUserAndTrainingPlanAndNotEvaluated(activeClient.UserId, activeClient.TrainingPlanId);
                notEvaluatedExercisesCounts.Add(activeClient.TrainingPlanId, clientNotEvaluatedExercisesCount);
            }

            return activeClients.Select(activeClient => new ActiveClient
            {
                FullName = string.Format("{0} {1}", activeClient.User.Name, activeClient.User.Surname),
                TrainingPlan = activeClient.TrainingPlan.Title,
                TrainingPlanId = activeClient.TrainingPlanId,
                UserId = activeClient.UserId,
                Deadline = activeClient.OrderDate.AddDays(activeClient.TrainingPlan.ExpirationDate),
                IsExistsNotEvaluatedExercises = notEvaluatedExercisesCounts.TryGetValue(activeClient.TrainingPlanId, out int count) && count > 0
            }).ToList();
        }

        public async Task<ExerciseEvaluationDto> GetExercisesForEvaluation(Guid userId, Guid trainingPlanId)
        {
            var user = await _userRepository.GetUserById(userId);
            var order = await _orderRepository.GetByTrainingPlanAndUserId(userId, trainingPlanId);
            var userSubmissions = await _exerciseFlowRepository.GetAllByUserIdAndTrainingPlanId(userId, trainingPlanId);

            return new ExerciseEvaluationDto
            {
                Student = string.Format("{0} {1}", user.Name, user.Surname),
                IsPersonal = order.TrainingPlan.IsPersonal,
                TrainingPlanRequest = order.TrainingPlanRequest,
                SubmittedExercises = userSubmissions.Select(submission => new SubmittedExercise
                {
                    Id = submission.Id,
                    Comment = submission.Comment,
                    Title = submission.Exercise.Name,
                    VideoUrl = submission.ProgressVideoUrl,
                    Grade = submission.Grade,
                }).ToList()
            };
        }

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
                SkillId = progressDto.SkillId,
                ProgressVideoUrl = blob.Uri.ToString()
            };

            var exerciseProgressUrl = await _exerciseFlowRepository.UploadExerciseProgressUrl(newExerciseProgress);

            return exerciseProgressUrl;
        }
    }
}
