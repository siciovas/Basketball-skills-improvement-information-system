using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class TrainingPlanService(ITrainingPlanRepository trainingPlanRepository, ISkillRepository skillRepository) : ITrainingPlanService
    {
        private readonly ITrainingPlanRepository _trainingPlanRepository = trainingPlanRepository;
        private readonly ISkillRepository _skillRepository = skillRepository;

        public async Task<TrainingPlanDto> Create(TrainingPlanPostDto trainingPlan, Guid coachId)
        {
            var skills = new List<Skill>();

            foreach (var id in trainingPlan.Skills)
            {
                var skill = await _skillRepository.GetById(id);
                skills.Add(skill!);
            }

            var newTrainingPlan = new TrainingPlan
            {
                Title = trainingPlan.Title,
                Description = trainingPlan.Description,
                ShortDescription = trainingPlan.ShortDescription,
                Price = trainingPlan.Price,
                IsActive = trainingPlan.IsActive,
                Version = 1,
                CoachId = coachId,
                Skills = skills
            };

            var createdTrainingPlan = await _trainingPlanRepository.Create(newTrainingPlan);
            createdTrainingPlan.InitialTrainingPlanId = createdTrainingPlan.Id;

            await _trainingPlanRepository.Update(createdTrainingPlan);

            return new TrainingPlanDto
            {
                Id = createdTrainingPlan.Id,
                Title = createdTrainingPlan.Title,
                Description = createdTrainingPlan.Description,
                ShortDescription= createdTrainingPlan.ShortDescription,
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
                ShortDescription = x.ShortDescription,
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
                ShortDescription = x.ShortDescription,
                Price = x.Price,
                IsActive = x.IsActive,
                Version = x.Version,
                Coach = string.Format("{0} {1}", x.Coach.Name, x.Coach.Surname)
            }).ToList();
        }

        public async Task<TrainingPlanDto> GetById(Guid id)
        {
            var trainingPlan = await _trainingPlanRepository.GetById(id);

            var skills = trainingPlan!.Skills.Select(x => new TrainingPlanSkillDto
            {
                Id = x.Id,
                Name = x.Title,
            }).ToList();

            return new TrainingPlanDto
            {
                Id = trainingPlan!.Id,
                Title = trainingPlan.Title,
                Description = trainingPlan.Description,
                ShortDescription = trainingPlan.ShortDescription,
                Price = trainingPlan.Price,
                IsActive = trainingPlan.IsActive,
                Version = trainingPlan.Version,
                Coach = string.Format("{0} {1}", trainingPlan.Coach.Name, trainingPlan.Coach.Surname),
                Skills = skills
            };
        }

        public async Task<bool> IsTrainingPlanOwnedByCoachId(Guid id, Guid coachId)
        {
            var trainingPlan = await _trainingPlanRepository.GetById(id);

            return trainingPlan!.CoachId == coachId;
        }

        public async Task<TrainingPlanDto> Update(TrainingPlanUpdateDto trainingPlanDto, Guid id)
        {
            var skills = new List<Skill>();

            foreach (var skillId in trainingPlanDto.Skills)
            {
                var skill = await _skillRepository.GetById(skillId);
                skills.Add(skill!);
            }

            var trainingPlan = await _trainingPlanRepository.GetById(id);
            if (trainingPlanDto.IsNewVersion)
            {
                trainingPlan = new TrainingPlan
                {
                    Title = trainingPlanDto.Title,
                    Description = trainingPlanDto.Description,
                    ShortDescription = trainingPlanDto.ShortDescription,
                    Price = trainingPlanDto.Price,
                    IsActive = trainingPlanDto.IsActive,
                    Version = trainingPlan!.Version + 1,
                    CoachId = trainingPlan.CoachId,
                    InitialTrainingPlanId = trainingPlan.InitialTrainingPlanId,
                    Skills = skills
                };
            } else
            {
                trainingPlan!.Title = trainingPlanDto.Title;
                trainingPlan.Description = trainingPlanDto.Description;
                trainingPlan.ShortDescription = trainingPlanDto.ShortDescription;
                trainingPlan.Price = trainingPlanDto.Price;
                trainingPlan.IsActive = trainingPlanDto.IsActive;
                trainingPlan.Skills = skills;
            }

            var updatedTrainingPlan = trainingPlanDto.IsNewVersion
                ? await _trainingPlanRepository.Create(trainingPlan)
                : await _trainingPlanRepository.Update(trainingPlan);

            return new TrainingPlanDto
            {
                Id = updatedTrainingPlan.Id,
                Title = updatedTrainingPlan.Title,
                Description = updatedTrainingPlan.Description,
                ShortDescription = updatedTrainingPlan.ShortDescription,
                Price = updatedTrainingPlan.Price,
                IsActive = updatedTrainingPlan.IsActive,
                Version = updatedTrainingPlan.Version,
                Coach = string.Format("{0} {1}", updatedTrainingPlan.Coach.Name, updatedTrainingPlan.Coach.Surname)
            };
        }
    }
}
