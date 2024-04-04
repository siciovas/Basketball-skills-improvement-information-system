using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class SkillService(ISkillRepository skillRepository, IExerciseRepository exerciseRepository) : ISkillService
    {
        private readonly ISkillRepository _skillRepository = skillRepository;
        private readonly IExerciseRepository _exerciseRepository = exerciseRepository;

        public async Task<SkillDto> Create(SkillPostDto skill, Guid coachId)
        {
            var exercisesTasks = new List<Task<Exercise>>();

            foreach (var id in skill.Exercises)
            {
                exercisesTasks.Add(_exerciseRepository.GetById(id)!);
            }

            var exercises = await Task.WhenAll(exercisesTasks);

            var newSkill = new Skill
            {
                Title = skill.Title,
                Description = skill.Description,
                CoachId = coachId,
                Exercises = exercises
            };

            var createdSkill = await _skillRepository.Create(newSkill);

            return new SkillDto
            {
                Id = createdSkill.Id,
                Title = createdSkill.Title,
                Description = createdSkill.Description,
            };
        }

        public async Task Delete(Guid id)
        {
            var skill = await _skillRepository.GetById(id);

            await _skillRepository.Delete(skill!);
        }

        public async Task<List<SkillDto>> GetAll(Guid coachId)
        {
            var exercises = await _skillRepository.GetAll(coachId);

            return exercises.Select(x => new SkillDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
            }).ToList();
        }

        public async Task<SkillDto> GetById(Guid id)
        {
            var skill = await _skillRepository.GetById(id);

            return new SkillDto
            {
                Id = id,
                Title = skill!.Title,
                Description = skill.Description
            };
        }

        public async Task<bool> IsCoachSkillOwner(Guid id, Guid coachId)
        {
            var skill = await _skillRepository.GetById(id);

            return skill!.CoachId == coachId;
        }

        public async Task<SkillDto> Update(SkillPostDto skillDto, Guid id)
        {
            var exercisesTasks = new List<Task<Exercise>>();

            foreach (var exerciseId in skillDto.Exercises)
            {
                exercisesTasks.Add(_exerciseRepository.GetById(exerciseId)!);
            }

            var exercises = await Task.WhenAll(exercisesTasks);

            var skill = await _skillRepository.GetById(id);
            skill!.Title = skillDto.Title;
            skill.Description = skillDto.Description;
            skill.Exercises = exercises;

            var updatedSkill = await _skillRepository.Update(skill);

            return new SkillDto
            {
                Id = updatedSkill.Id,
                Title = updatedSkill.Title,
                Description = updatedSkill.Description,
            };
        }
    }
}
