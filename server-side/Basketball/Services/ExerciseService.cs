using Azure.Storage.Blobs;
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
        private readonly IConfiguration _configuration;

        public ExerciseService(IExerciseRepository exerciseRepository, IConfiguration configuration)
        {
            _exerciseRepository = exerciseRepository;
            _configuration = configuration;
        }
        public async Task<ExerciseDto> Create(ExercisePostDto exerciseDto, Guid coachId)
        {
            var container = new BlobContainerClient(_configuration["ConnectionStrings:StorageConnectionString"], "videos");
            var blob = container.GetBlobClient($"{exerciseDto.Name}.mp4");

            await blob.UploadAsync(exerciseDto.ExerciseVideo.OpenReadStream());

            var newExercise = new Exercise
            {
                Name = exerciseDto.Name,
                Description = exerciseDto.Description,
                Difficulty = exerciseDto.Difficulty,
                CoachId = coachId,
                ExerciseBlobUrl = blob.Uri.ToString()
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

        public async Task<ExerciseDto> Update(ExercisePostDto exerciseDto, Guid id, Guid coachId)
        {
            var exercise = await _exerciseRepository.GetById(id);
            exercise!.Name = exerciseDto.Name;
            exercise.Description = exerciseDto.Description;
            exercise.Difficulty = exerciseDto.Difficulty;
            exercise.CoachId = coachId;

            var updatedExercise = await _exerciseRepository.Update(exercise);

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
