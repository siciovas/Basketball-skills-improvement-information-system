using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Basketball.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrderController(IOrderService orderService) : ControllerBase
    {
        private readonly IOrderService _orderService = orderService;

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(OrderPostDto orderDto)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var createdOrder = await _orderService.Create(orderDto, userId);

            return CreatedAtAction(nameof(Create), createdOrder);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _orderService.GetAll();

            return Ok(orders);
        }

        [HttpGet("myOrders")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetByUser()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var orders = await _orderService.GetByUserId(userId);

            return Ok(orders);
        }

        [HttpGet("checkout/{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(Guid id)
        {
            var order = await _orderService.GetById(id);

            return Ok(order);
        }

        [HttpGet("viewOrderedPlan/{id}")]
        [Authorize]
        public async Task<IActionResult> GetOrderInfoById(Guid id)
        {
            var order = await _orderService.GetOrderInfoById(id);

            return Ok(order);
        }

        [HttpPut("{orderId}")]
        [Authorize]
        public async Task<IActionResult> UpdatePaymentStatus(Guid orderId)
        {
            var updatedOrder = await _orderService.UpdatePaymentStatus(orderId);

            return Ok(updatedOrder);
        }

        [HttpDelete("{orderId}")]
        [Authorize]
        public async Task<IActionResult> CancelOrder(Guid orderId)
        {
            await _orderService.CancelOrder(orderId);

            return NoContent();
        }
    }
}
