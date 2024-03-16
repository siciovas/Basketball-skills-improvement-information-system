using Basketball.Core.Dtos;
using Microsoft.AspNetCore.Mvc;
using EVP.WebToPay.ClientAPI;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/paysera")]
    public class PayseraController : Controller
    {
        [HttpPost]
        public ActionResult<string> CreatePayment([FromBody] PayseraDto payseraDto)
        {
            int projectId = 236200;
            string signPassword = "0afd133fdc22d2f091b7d43ad4c46eaa";

            var client = new Client(projectId, signPassword);

            var request = client.NewMacroRequest();

            request.OrderId = payseraDto.OrderNumber;
            request.Amount = payseraDto.Amount;
            request.Email = payseraDto.Email;
            request.Currency = "EUR";
            request.Country = "LT";
            request.Test = true;
            request.AcceptUrl = $"http://localhost:3000/sekmingasuzsakymas?ordernumber={payseraDto.OrderNumber}";
            request.CancelUrl = "http://localhost:3000/sekmingasuzsakymas";
            request.CallbackUrl = "http://localhost:3000/sekmingasuzsakymas";

            string redirectUrl = client.BuildRequestUrl(request);

            return Ok(redirectUrl);
        }
    }
}
