using Basketball.Core.Email;

namespace Basketball.Core.Interfaces.Services
{
    public interface IEmailService
    {
        Task SendEmail(EmailData emailData);
    }
}
