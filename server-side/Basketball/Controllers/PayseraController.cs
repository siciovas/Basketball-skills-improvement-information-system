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
            int projectId = 242693;
            string signPassword = "d9689acb562ae01110130e49808d2e53";

            var client = new Client(projectId, signPassword);

            var request = client.NewMacroRequest();

            request.OrderId = payseraDto.OrderNumber;
            request.Amount = payseraDto.Amount;
            request.Email = payseraDto.Email;
            request.Currency = "EUR";
            request.Country = "LT";
            request.Test = true;
            //request.AcceptUrl = $"https://bsdis-front.azurewebsites.net/successfulPayment?ordernumber={payseraDto.OrderNumber}"; si eilute, kai bus ordernumber
            request.AcceptUrl = "https://bsdis-front.azurewebsites.net/successfulPayment";
            request.CancelUrl = "https://bsdis-front.azurewebsites.net/successfulPayment";
            request.CallbackUrl = "https://bsdis-front.azurewebsites.net/successfulPayment";

            string redirectUrl = client.BuildRequestUrl(request);

            return Ok(redirectUrl);
        }
    }
}
