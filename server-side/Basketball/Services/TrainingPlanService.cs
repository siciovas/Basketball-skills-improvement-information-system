using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class TrainingPlanService : ITrainingPlanService
    {
        private readonly ITrainingPlanRepository _trainingPlanRepository;

        public TrainingPlanService(ITrainingPlanRepository trainingPlanRepository)
        {
            _trainingPlanRepository = trainingPlanRepository;
        }

        public async Task<TrainingPlanDto> Create(TrainingPlanPostDto trainingPlan, Guid coachId)
        {
            var newTrainingPlan = new TrainingPlan
            {
                Title = trainingPlan.Title,
                Description = trainingPlan.Description,
                Price = trainingPlan.Price,
                IsActive = trainingPlan.IsActive,
                Version = trainingPlan.Version,
                CoachId = coachId,
            };

            var createdTrainingPlan = await _trainingPlanRepository.Create(newTrainingPlan);

            return new TrainingPlanDto
            {
                Id = createdTrainingPlan.Id,
                Title = createdTrainingPlan.Title,
                Description = createdTrainingPlan.Description,
                Price = createdTrainingPlan.Price,
                IsActive = createdTrainingPlan.IsActive,
                Version = createdTrainingPlan.Version,
                Coach = string.Format("{0} {1}", createdTrainingPlan.Coach.Name, createdTrainingPlan.Coach.Surname)
            };
        }

        public async Task Delete(Guid id)
        {
            var trainingPlan = await _trainingPlanRepository.GetById(id);

            await _trainingPlanRepository.Delete(trainingPlan!);
        }

        public async Task<List<TrainingPlanDto>> GetAll()
        {
            var allPlans = await _trainingPlanRepository.GetAll();

            return allPlans.Select(x => new TrainingPlanDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Price = x.Price,
                IsActive = x.IsActive,
                Version = x.Version,
                Coach = string.Format("{0} {1}", x.Coach.Name, x.Coach.Surname)
            }).ToList();
        }

        public async Task<List<TrainingPlanDto>> GetAllByCoachId(Guid coachId)
        {
            var allPlans = await _trainingPlanRepository.GetAllByCoachId(coachId);

            return allPlans.Select(x => new TrainingPlanDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Price = x.Price,
                IsActive = x.IsActive,
                Version = x.Version,
                Coach = string.Format("{0} {1}", x.Coach.Name, x.Coach.Surname)
            }).ToList();
        }

        public async Task<TrainingPlanDto> GetById(Guid id)
        {
            var trainingPlan = await _trainingPlanRepository.GetById(id);

            return new TrainingPlanDto
            {
                Id = trainingPlan!.Id,
                Title = trainingPlan.Title,
                Description = trainingPlan.Description,
                Price = trainingPlan.Price,
                IsActive = trainingPlan.IsActive,
                Version = trainingPlan.Version,
                Coach = string.Format("{0} {1}", trainingPlan.Coach.Name, trainingPlan.Coach.Surname)
            };
        }

        public async Task<bool> IsTrainingPlanOwnedByCoachId(Guid id, Guid coachId)
        {
            var trainingPlan = await _trainingPlanRepository.GetById(id);

            return trainingPlan!.CoachId == coachId;
        }

        public async Task<TrainingPlanDto> Update(TrainingPlanPostDto trainingPlan, Guid id, Guid coachId)
        {
            var trainingPlanToUpdate = new TrainingPlan
            {
                Id = id,
                Title = trainingPlan.Title,
                Description = trainingPlan.Description,
                Price = trainingPlan.Price,
                IsActive = trainingPlan.IsActive,
                Version = trainingPlan.Version,
                CoachId = coachId,
            };

            var updatedTrainingPlan = await _trainingPlanRepository.Update(trainingPlanToUpdate);

            return new TrainingPlanDto
            {
                Id = updatedTrainingPlan.Id,
                Title = updatedTrainingPlan.Title,
                Description = updatedTrainingPlan.Description,
                Price = updatedTrainingPlan.Price,
                IsActive = updatedTrainingPlan.IsActive,
                Version = updatedTrainingPlan.Version,
                Coach = string.Format("{0} {1}", updatedTrainingPlan.Coach.Name, updatedTrainingPlan.Coach.Surname)
            };
        }
    }
}
