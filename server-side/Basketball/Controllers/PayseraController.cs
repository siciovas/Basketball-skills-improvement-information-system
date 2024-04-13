using Basketball.Core.Dtos;
using Microsoft.AspNetCore.Mvc;
using EVP.WebToPay.ClientAPI;
using Microsoft.AspNetCore.Authorization;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/paysera")]
    public class PayseraController(IConfiguration configuration) : ControllerBase
    {
        private readonly IConfiguration _configuration = configuration;

        [HttpPost]
        [Authorize]
        public ActionResult<string> CreatePayment([FromBody] PayseraDto payseraDto)
        {
            var email = User.Identity!.Name;
            var baseUrl = _configuration["AppUrl"]!;

            int projectId = 242693;
            string signPassword = "d9689acb562ae01110130e49808d2e53";

            var client = new Client(projectId, signPassword);

            var request = client.NewMacroRequest();

            request.OrderId = payseraDto.OrderNumber;
            request.Amount = payseraDto.Amount * 100;
            request.Email = email;
            request.Currency = "EUR";
            request.Country = "LT";
            request.Test = true;
            request.AcceptUrl = $"{baseUrl}/successfulPayment?ordernumber={payseraDto.OrderNumber}";
            request.CancelUrl = $"{baseUrl}/successfulPayment";
            request.CallbackUrl = $"{baseUrl}/successfulPayment";

            string redirectUrl = client.BuildRequestUrl(request);

            return Ok(redirectUrl);
        }
    }
}
