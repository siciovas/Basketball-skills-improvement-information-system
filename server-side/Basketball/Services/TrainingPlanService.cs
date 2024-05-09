using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class TrainingPlanService(ITrainingPlanRepository trainingPlanRepository, ISkillRepository skillRepository,
                                     IOrderRepository orderRepository, IExerciseFlowRepository exerciseFlowRepository) : ITrainingPlanService
    {
        private readonly ITrainingPlanRepository _trainingPlanRepository = trainingPlanRepository;
        private readonly ISkillRepository _skillRepository = skillRepository;
        private readonly IOrderRepository _orderRepository = orderRepository;
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
                Avatar = trainingPlan.Avatar,
                Title = trainingPlan.Title,
                Description = trainingPlan.Description,
                ShortDescription = trainingPlan.ShortDescription,
                ExpirationDate = trainingPlan.ExpirationDate,
                Price = trainingPlan.Price,
                IsActive = trainingPlan.IsActive,
                Version = 1,
                CoachId = coachId,
                Skills = skills,
                IsPersonal = trainingPlan.IsPersonal,
            };

            var createdTrainingPlan = await _trainingPlanRepository.Create(newTrainingPlan);
            for (int i = 0; i < skills.Count; i++)
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
                Avatar = createdTrainingPlan.Avatar,
                Title = createdTrainingPlan.Title,
                Description = createdTrainingPlan.Description,
                ShortDescription = createdTrainingPlan.ShortDescription,
                ExpirationDate = createdTrainingPlan.ExpirationDate,
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
                Avatar = x.Avatar,
                Title = x.Title,
                Description = x.Description,
                ShortDescription = x.ShortDescription,
                ExpirationDate = x.ExpirationDate,
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
                Avatar = x.Avatar,
                Title = x.Title,
                Description = x.Description,
                ShortDescription = x.ShortDescription,
                ExpirationDate = x.ExpirationDate,
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
                Avatar = trainingPlan.Avatar,
                Title = trainingPlan.Title,
                Description = trainingPlan.Description,
                ShortDescription = trainingPlan.ShortDescription,
                ExpirationDate = trainingPlan.ExpirationDate,
                Price = trainingPlan.Price,
                IsActive = trainingPlan.IsActive,
                Version = trainingPlan.Version,
                Coach = string.Format("{0} {1}", trainingPlan.Coach.Name, trainingPlan.Coach.Surname),
                Skills = skills,
                IsPersonal = trainingPlan.IsPersonal,
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
                    Avatar = trainingPlanDto.Avatar,
                    Title = trainingPlanDto.Title,
                    Description = trainingPlanDto.Description,
                    ShortDescription = trainingPlanDto.ShortDescription,
                    ExpirationDate = trainingPlanDto.ExpirationDate,
                    Price = trainingPlanDto.Price,
                    IsActive = trainingPlanDto.IsActive,
                    Version = trainingPlan!.Version + 1,
                    CoachId = trainingPlan.CoachId,
                    InitialTrainingPlanId = trainingPlan.InitialTrainingPlanId,
                    Skills = skills,
                    IsPersonal = trainingPlan.IsPersonal,
                };
            }
            else
            {
                trainingPlan!.Avatar = trainingPlanDto.Avatar;
                trainingPlan!.Title = trainingPlanDto.Title;
                trainingPlan.Description = trainingPlanDto.Description;
                trainingPlan.ShortDescription = trainingPlanDto.ShortDescription;
                trainingPlan.ExpirationDate = trainingPlanDto.ExpirationDate;
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
            }
            else
            {
                var existingSkillsOrders = await _trainingPlanRepository.GetSkillOrderByPlanId(id);

                await _trainingPlanRepository.DeleteExerciseOrders(existingSkillsOrders);

                await _trainingPlanRepository.AddSkillsOrders(skillsOrders);
            }

            return new TrainingPlanDto
            {
                Id = updatedTrainingPlan.Id,
                Avatar = updatedTrainingPlan.Avatar,
                Title = updatedTrainingPlan.Title,
                Description = updatedTrainingPlan.Description,
                ShortDescription = updatedTrainingPlan.ShortDescription,
                ExpirationDate = updatedTrainingPlan.ExpirationDate,
                Price = updatedTrainingPlan.Price,
                IsActive = updatedTrainingPlan.IsActive,
                Version = updatedTrainingPlan.Version,
                Coach = string.Format("{0} {1}", updatedTrainingPlan.Coach.Name, updatedTrainingPlan.Coach.Surname)
            };
        }
        public async Task<TrainingPlanExecutionDto> GetTrainingPlanForExecutionById(Guid id, Guid userId)
        {
            var trainingPlan = await _trainingPlanRepository.GetById(id);
            var coefficient = 1 / (double)trainingPlan!.Skills.Count;
            var averages = new List<double>();
            var order = await _orderRepository.GetByTrainingPlanAndUserId(userId, id);
            var progress = await _exerciseFlowRepository.GetAllByUserIdAndTrainingPlanId(userId, trainingPlan!.Id);
            var progressCounter = await _exerciseFlowRepository.GetCounterByUserAndPositive(userId);

            foreach (var skill in trainingPlan.Skills)
            {
                var skillProgress = progress.Where(x => x.SkillId == skill.Id
                                                   && x.Grade > 4)
                                            .ToList();

                var gradeSum = skillProgress.Sum(x => x.Grade);

                var average = (double)gradeSum! / (skillProgress.Count == 0 ? 1 : skillProgress.Count);

                var finalAverage = average * coefficient;

                averages.Add(finalAverage);
            }

            return new TrainingPlanExecutionDto
            {
                Id = trainingPlan!.Id,
                Coach = string.Format("{0} {1}", trainingPlan.Coach.Name, trainingPlan.Coach.Surname),
                Title = trainingPlan.Title,
                FinalMark = averages.Sum(x => x).ToString("F1"),
                ProgressCounter = trainingPlan.Skills.Count == 0 ? "0" : ((progressCounter.TryGetValue(trainingPlan.Id, out int count) ? count : 0) / (double)trainingPlan.Skills.SelectMany(x => x.Exercises).Count() * 100).ToString("F1"),
                Deadline = order.OrderDate.AddDays(trainingPlan.ExpirationDate),
                Skills = trainingPlan.Skills.Select((skill, index) => new SkillExecutionDto
                {
                    Id = skill.Id,
                    Description = skill.Description,
                    Name = skill.Title,
                    IsLocked = index == 0 || !trainingPlan.Skills.ElementAt(index - 1).Exercises.All(ex => progress.Any(p => p.TrainingPlanId == trainingPlan.Id && p.ExerciseId == ex.Id && p.SkillId == trainingPlan.Skills.ElementAt(index - 1).Id && p.Grade != null && p.Grade > 4)),
                    Exercises = skill.Exercises.Select(exercise => new ExerciseExecutionDto
                    {
                        Id = exercise.Id,
                        Description = exercise.Description,
                        Name = exercise.Name,
                        ExerciseVideoUrl = exercise.ExerciseBlobUrl,
                        Difficulty = exercise.Difficulty,
                        IsWaitingForGrade = progress.Where(x => x.TrainingPlanId == trainingPlan.Id && x.ExerciseId == exercise.Id && x.SkillId == skill.Id).LastOrDefault() != null
                            && progress.Where(x => x.TrainingPlanId == trainingPlan.Id && x.ExerciseId == exercise.Id && x.SkillId == skill.Id).Last().Grade == null,
                        Grade = progress.Where(x => x.TrainingPlanId == trainingPlan.Id && x.ExerciseId == exercise.Id && x.SkillId == skill.Id).LastOrDefault()?.Grade,
                        Comment = progress.Where(x => x.TrainingPlanId == trainingPlan.Id && x.ExerciseId == exercise.Id && x.SkillId == skill.Id).LastOrDefault()?.Comment
                    }).ToList(),
                }).ToList(),
            };
        }

        public async Task<List<MyPlansDto>> GetMyPlans(Guid userId)
        {
            var orders = await _orderRepository.GetByUserId(userId);
            var paidOrders = orders.Where(x => x.IsPaid).OrderBy(x => x.OrderDate).ToList();
            var progressCounter = await _exerciseFlowRepository.GetCounterByUserAndPositive(userId);

            return paidOrders.Select(x => new MyPlansDto
            {
                Avatar = x.TrainingPlan.Avatar,
                Name = x.TrainingPlan.Title,
                CoachFullName = string.Format("{0} {1}", x.TrainingPlan.Coach.Name, x.TrainingPlan.Coach.Surname),
                TrainingPlanId = x.TrainingPlanId,
                ExpirationDate = x.OrderDate.AddDays(x.TrainingPlan.ExpirationDate),
                ProgressCounter = x.TrainingPlan.Skills.Count == 0 ? "0" : ((progressCounter.TryGetValue(x.TrainingPlanId, out int count) ? count : 0) / (double)x.TrainingPlan.Skills.SelectMany(x => x.Exercises).Count() * 100).ToString("F1")
            }).ToList();
        }

        public async Task<TrainingPlan?> GetByPlanName(string name, Guid coachId)
        {
            return await _trainingPlanRepository.GetByPlanName(name, coachId);
        }
    }
}