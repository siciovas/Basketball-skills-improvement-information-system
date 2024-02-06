using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Repositories;

namespace Basketball.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository _feedbackRepository;

        public FeedbackService(IFeedbackRepository feedbackRepository)
        {
            _feedbackRepository = feedbackRepository;
        }

        public async Task<FeedbackDto> Create(FeedbackPostDto feedback, Guid studentId)
        {
            var createdFeedback = await _feedbackRepository.Create(new Feedback
            {
                FeedbackText = feedback.FeedbackText,
                Date = DateOnly.FromDateTime(DateTime.Now),
                StudentId = studentId,
                TrainingPlanId = feedback.TrainingPlanId
            });

            return new FeedbackDto
            {
                Id = createdFeedback.Id,
                FeedbackText = createdFeedback.FeedbackText,
                Date = createdFeedback.Date,
                Student = string.Format("{0} {1}", createdFeedback.Student.Name, createdFeedback.Student.Surname)
            };
        }

        public async Task Delete(Guid id)
        {
            var feedback = await _feedbackRepository.GetById(id);

            await _feedbackRepository.Delete(feedback!);
        }

        public async Task<List<FeedbackDto>> GetAll()
        {
            var feedbacks = await _feedbackRepository.GetAll();

            return feedbacks.Select(x => new FeedbackDto
            {
                Id = x.Id,
                FeedbackText = x.FeedbackText,
                Date = x.Date,
                Student = string.Format("{0} {1}", x.Student.Name, x.Student.Surname)
            }).ToList();
        }

        public async Task<List<FeedbackDto>> GetAllByTrainingPlanId(Guid trainingPlanId)
        {
            var feedbacks = await _feedbackRepository.GetAllByTrainingPlanId(trainingPlanId);

            return feedbacks.Select(x => new FeedbackDto
            {
                Id = x.Id,
                FeedbackText = x.FeedbackText,
                Date = x.Date,
                Student = string.Format("{0} {1}", x.Student.Name, x.Student.Surname)
            }).ToList();
        }

        public async Task<FeedbackDto?> GetById(Guid id)
        {
            var feedback =  await _feedbackRepository.GetById(id);

            return new FeedbackDto
            {
                Id = feedback!.Id,
                FeedbackText = feedback.FeedbackText,
                Date = feedback.Date,
                Student = string.Format("{0} {1}", feedback.Student.Name, feedback.Student.Surname)
            };
        }

        public async Task<bool> IsFeedbackOwnedByStudent(Guid studentId, Guid id)
        {
            var feedback = await _feedbackRepository.GetById(id);

            return feedback!.StudentId == studentId;
        }

        public async Task<FeedbackDto> Update(FeedbackUpdateDto feedback, Guid studentId, Guid id, Guid trainingPlanId)
        {
            var feedbackToUpdate = new Feedback
            {
                Id = id,
                FeedbackText = feedback.FeedbackText,
                Date = DateOnly.FromDateTime(DateTime.Now),
                StudentId = studentId,
                TrainingPlanId = trainingPlanId,
            };

            var updatedFeedback = await _feedbackRepository.Update(feedbackToUpdate);

            return new FeedbackDto
            {
                Id = updatedFeedback!.Id,
                FeedbackText = updatedFeedback.FeedbackText,
                Date = updatedFeedback.Date,
                Student = string.Format("{0} {1}", updatedFeedback.Student.Name, updatedFeedback.Student.Surname)
            };
        }
    }
}
