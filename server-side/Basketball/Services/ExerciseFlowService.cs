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
            var notEvaluatedExercisesCounts = new Dictionary<Guid, (int, List<string>)>();
            var activeClients = await _orderRepository.GetActiveClients(userId);

            foreach (var activeClient in activeClients)
            {
                var orders = await _orderRepository.GetByCoachIdAndUserId(activeClient.UserId, userId);
                var clientNotEvaluatedExercisesCount = await _exerciseFlowRepository.GetCounterByUserAndTrainingPlanAndNotEvaluated(activeClient.UserId, userId);
                notEvaluatedExercisesCounts.Add(activeClient.UserId, (clientNotEvaluatedExercisesCount, orders.Select(x => x.TrainingPlan.Title).ToList()));
            }

            return activeClients.Select(activeClient => new ActiveClient
            {
                FullName = string.Format("{0} {1}", activeClient.User.Name, activeClient.User.Surname),
                TrainingPlans = notEvaluatedExercisesCounts[activeClient.UserId].Item2,
                UserId = activeClient.UserId,
                IsExistsNotEvaluatedExercises = notEvaluatedExercisesCounts[activeClient.UserId].Item1 > 0
            }).ToList();
        }

        public async Task<AllEvaluationDto> GetExercisesForEvaluation(Guid userId, Guid coachId)
        {
            var trainingPlansSubmissions = new Dictionary<Guid, TrainingPlanEvaluationDto>();
            var user = await _userRepository.GetUserById(userId);
            var orders = await _orderRepository.GetByCoachIdAndUserId(userId, coachId);
            foreach (var order in orders)
            {
                var coefficient = 1 / (double)order.TrainingPlan.Skills.Count;
                var averages = new List<double>();
                var progress = await _exerciseFlowRepository.GetAllByUserIdAndTrainingPlanId(userId, order.TrainingPlan.Id);
                var progressCounter = await _exerciseFlowRepository.GetCounterByUserAndPositive(userId);

                foreach (var skill in order.TrainingPlan.Skills)
                {
                    var skillProgress = progress.Where(x => x.SkillId == skill.Id
                                                       && x.Grade > 4)
                                                .ToList();

                    var gradeSum = skillProgress.Sum(x => x.Grade);

                    var average = (double)gradeSum! / (skillProgress.Count == 0 ? 1 : skillProgress.Count);

                    var finalAverage = average * coefficient;

                    averages.Add(finalAverage);
                }
                var userSubmissions = await _exerciseFlowRepository.GetAllByUserIdAndTrainingPlanId(userId, order.TrainingPlanId);
                var evaluationDto = new TrainingPlanEvaluationDto
                {
                    Title = order.TrainingPlan.Title,
                    IsPersonal = order.TrainingPlan.IsPersonal,
                    FinalMark = averages.Sum(x => x).ToString("F1"),
                    ProgressCounter = ((progressCounter.TryGetValue(order.TrainingPlanId, out int count) ? count : 0) / (double)order.TrainingPlan.Skills.SelectMany(x => x.Exercises).Count() * 100).ToString("F1"),
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
                trainingPlansSubmissions.Add(order.TrainingPlanId, evaluationDto);
            }

            return new AllEvaluationDto
            {
                Student = string.Format("{0} {1}", user.Name, user.Surname),
                TrainingPlansEvaluations = orders.Select(x => trainingPlansSubmissions[x.TrainingPlanId]).ToList()
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
