using Azure.Communication.Email;
using Basketball.Core.Email;
using Basketball.Core.Interfaces.Services;

namespace Basketball.Services
{
    public class EmailService(IConfiguration configuration) : IEmailService
    {
        private readonly IConfiguration _configuration = configuration;

        public async Task SendEmail(EmailData emailData)
        {
            var emailClient = new EmailClient(_configuration["ConnectionStrings:EmailConnectionString"]);

            var emailContent = new EmailContent(emailData.Subject)
            {
                PlainText = emailData.Content
            };

            var recipients = emailData.Recipients.Select(recipient => new EmailAddress(recipient));

            var emailMessage = new EmailMessage("donotreply@b7ed811c-2897-4486-afbb-c0d78e396232.azurecomm.net", new EmailRecipients(recipients), emailContent);

            await emailClient.SendAsync(Azure.WaitUntil.Completed, emailMessage);
        }
    }
}
