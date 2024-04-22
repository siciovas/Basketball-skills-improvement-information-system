﻿using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class TrainingPlanService(ITrainingPlanRepository trainingPlanRepository, ISkillRepository skillRepository, IExerciseFlowRepository exerciseFlowRepository) : ITrainingPlanService
    {
        private readonly ITrainingPlanRepository _trainingPlanRepository = trainingPlanRepository;
        private readonly ISkillRepository _skillRepository = skillRepository;
        private readonly IExerciseFlowRepository _exerciseFlowRepository = exerciseFlowRepository;

        public async Task<TrainingPlanDto> Create(TrainingPlanPostDto trainingPlan, Guid coachId)
        {
            var skills = new List<Skill>();
            var skillsOrders = new List<SkillsOrder>();

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
            for(int i = 0; i < skills.Count; i++)
            {
                skillsOrders.Add(new SkillsOrder
                {
                    TrainingPlanId = createdTrainingPlan.Id,
                    SkillId = skills[i].Id,
                    Order = i + 1
                });
            }
            await _trainingPlanRepository.AddSkillsOrders(skillsOrders);
            createdTrainingPlan.InitialTrainingPlanId = createdTrainingPlan.Id;

            await _trainingPlanRepository.Update(createdTrainingPlan);

            return new TrainingPlanDto
            {
                Id = createdTrainingPlan.Id,
                Title = createdTrainingPlan.Title,
                Description = createdTrainingPlan.Description,
                ShortDescription = createdTrainingPlan.ShortDescription,
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

            var skillsOrders = await _trainingPlanRepository.GetSkillOrderByPlanId(id);

            var skills = skillsOrders.OrderBy(x => x.Order).Select(x => new TrainingPlanSkillDto
            {
                Id = trainingPlan!.Skills.Where(t => t.Id == x.SkillId).First().Id,
                Name = trainingPlan!.Skills.Where(t => t.Id == x.SkillId).First().Title,
                Exercises = trainingPlan!.Skills.Where(t => t.Id == x.SkillId).First().Exercises.Select(e => e.Name).ToList(),
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
            var skillsOrders = new List<SkillsOrder>();

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
            }
            else
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

            for (int i = 0; i < skills.Count; i++)
            {
                skillsOrders.Add(new SkillsOrder
                {
                    TrainingPlanId = updatedTrainingPlan.Id,
                    SkillId = skills[i].Id,
                    Order = i + 1
                });
            }

            if (trainingPlanDto.IsNewVersion)
            {
                await _trainingPlanRepository.AddSkillsOrders(skillsOrders);
            } else
            {
                await _trainingPlanRepository.UpdateSkillsOrders(skillsOrders);
            }

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
        public async Task<TrainingPlanExecutionDto> GetTrainingPlanForExecutionById(Guid id, Guid userId)
        {
            var trainingPlan = await _trainingPlanRepository.GetById(id);

            var progress = await _exerciseFlowRepository.GetAllByUserIdAndTrainingPlanId(userId, trainingPlan!.Id);

            return new TrainingPlanExecutionDto
            {
                Id = trainingPlan!.Id,
                Coach = string.Format("{0} {1}", trainingPlan.Coach.Name, trainingPlan.Coach.Surname),
                Title = trainingPlan.Title,
                Skills = trainingPlan.Skills.Select(skill => new SkillExecutionDto
                {
                    Id = skill.Id,
                    Description = skill.Description,
                    Name = skill.Title,
                    Exercises = skill.Exercises.Select(exercise => new ExerciseExecutionDto
                    {
                        Id = exercise.Id,
                        Description = exercise.Description,
                        Name = exercise.Name,
                        ExerciseVideoUrl = exercise.ExerciseBlobUrl,
                        Grade = progress.Where(x => x.TrainingPlanId == trainingPlan.Id && x.ExerciseId == exercise.Id && x.SkillId == skill.Id).FirstOrDefault()?.Grade,
                        IsLocked = !progress.Exists(x => x.TrainingPlanId == trainingPlan.Id && x.ExerciseId == exercise.Id && x.SkillId == skill.Id && x.Grade != null && x.Grade > 4)
                    }).ToList(),
                }).ToList(),
            };
        }
    }
}
