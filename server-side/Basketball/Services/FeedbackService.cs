using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class FeedbackService(IFeedbackRepository feedbackRepository) : IFeedbackService
    {
        private readonly IFeedbackRepository _feedbackRepository = feedbackRepository;

        public async Task<FeedbackDto> Create(FeedbackPostDto feedback, Guid studentId)
        {
            var createdFeedback = await _feedbackRepository.Create(new Feedback
            {
                FeedbackText = feedback.FeedbackText,
                Date = DateOnly.FromDateTime(DateTime.Now),
                StudentId = studentId,
                Rating = feedback.Rating,
                CoachId = feedback.CoachId,
            });

            return new FeedbackDto
            {
                Id = createdFeedback.Id,
                FeedbackText = createdFeedback.FeedbackText,
                Date = createdFeedback.Date,
                Rating = createdFeedback.Rating,
                Student = string.Format("{0}", createdFeedback.Student.Name),
                CoachId = createdFeedback.CoachId,
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
                Rating = x.Rating,
                Student = string.Format("{0}", x.Student.Name),
                CoachId = x.CoachId,
            }).ToList();
        }

        public async Task<FeedbackDto?> GetById(Guid id)
        {
            var feedback = await _feedbackRepository.GetById(id);

            return new FeedbackDto
            {
                Id = feedback!.Id,
                FeedbackText = feedback.FeedbackText,
                Date = feedback.Date,
                Rating = feedback.Rating,
                Student = string.Format("{0}", feedback.Student.Name),
                CoachId = feedback.CoachId,
            };
        }

        public async Task<bool> IsFeedbackOwnedByStudent(Guid studentId, Guid id)
        {
            var feedback = await _feedbackRepository.GetById(id);

            return feedback!.StudentId == studentId;
        }

        public async Task<FeedbackDto> Update(FeedbackUpdateDto feedbackDto, Guid id)
        {
            var feedback = await _feedbackRepository.GetById(id);
            feedback!.FeedbackText = feedbackDto.FeedbackText;
            feedback.Date = DateOnly.FromDateTime(DateTime.Now);
            feedback.Rating = feedbackDto.Rating;

            var updatedFeedback = await _feedbackRepository.Update(feedback);

            return new FeedbackDto
            {
                Id = updatedFeedback!.Id,
                FeedbackText = updatedFeedback.FeedbackText,
                Date = updatedFeedback.Date,
                Rating = updatedFeedback.Rating,
                Student = string.Format("{0}", updatedFeedback.Student.Name),
                CoachId = updatedFeedback.CoachId,
            };
        }

        public async Task<List<FeedbackDto>> GetFourBest(Guid id)
        {
            var feedbacks = await _feedbackRepository.GetAllForCoach(id);

            var sortedFeedbacks = feedbacks.OrderByDescending(x => x.Rating).ToList();

            return sortedFeedbacks.Take(4).Select(x => new FeedbackDto
            {
                Id = x.Id,
                Date = x.Date,
                FeedbackText = x.FeedbackText,
                Rating = x.Rating,
                Student = string.Format("{0}", x.Student.Name),
                CoachId = x.CoachId,
            }).ToList();
        }
    }
}
