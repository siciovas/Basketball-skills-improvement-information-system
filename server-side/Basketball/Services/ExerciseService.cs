using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class ExerciseService : IExerciseService
    {
        private readonly IExerciseRepository _exerciseRepository;

        public ExerciseService(IExerciseRepository exerciseRepository)
        {
            _exerciseRepository = exerciseRepository;
        }
        public async Task<ExerciseDto> Create(ExercisePostDto exerciseDto, Guid coachId)
        {
            var newExercise = new Exercise
            {
                Name = exerciseDto.Name,
                Description = exerciseDto.Description,
                Difficulty = exerciseDto.Difficulty,
                CoachId = coachId
            };

            var createdExercise = await _exerciseRepository.Create(newExercise);

            return new ExerciseDto
            {
                Id = createdExercise.Id,
                Name = createdExercise.Name,
                Description = createdExercise.Description,
                Difficulty = createdExercise.Difficulty,
            };
        }

        public async Task Delete(Guid id)
        {
            var exercise = await _exerciseRepository.GetById(id);

            await _exerciseRepository.Delete(exercise!);
        }

        public async Task<List<ExerciseDto>> GetAll(Guid coachId)
        {
            var exercises = await _exerciseRepository.GetAll(coachId);

            return exercises.Select(x => new ExerciseDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Difficulty = x.Difficulty
            }).ToList();
        }

        public async Task<ExerciseDto> GetById(Guid id)
        {
            var exercise = await _exerciseRepository.GetById(id);

            return new ExerciseDto
            {
                Id = id,
                Name = exercise!.Name,
                Description = exercise.Description,
                Difficulty = exercise.Difficulty,
            };
        }

        public async Task<bool> IsCoachExerciseOwner(Guid id, Guid coachId)
        {
            var exercise = await _exerciseRepository.GetById(id);

            return exercise!.CoachId == coachId;
        }

        public async Task<ExerciseDto> Update(ExercisePostDto exercise, Guid id)
        {
            var updatedExercise = await _exerciseRepository.Update(new Exercise
            {
                Id = id,
                Name = exercise.Name,
                Description = exercise.Description,
                Difficulty = exercise.Difficulty,
            });

            return new ExerciseDto
            {
                Id = updatedExercise.Id,
                Name = updatedExercise.Name,
                Description = updatedExercise.Description,
                Difficulty = updatedExercise.Difficulty,
            };
        }
    }
}
