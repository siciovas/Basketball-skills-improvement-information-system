using Basketball.Core.Email;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Interfaces.Services
{
    public interface IEmailService
    {
        Task SendEmail(EmailData emailData);
    }
}
