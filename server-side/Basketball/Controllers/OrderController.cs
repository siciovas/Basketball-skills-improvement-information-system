using Basketball.Core.Dtos.Post;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;
using Basketball.Services;
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
        public async Task<IActionResult> Create(OrderPostDto order)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var createdOrder = await _orderService.Create(order, userId);

            return CreatedAtAction(nameof(Create), createdOrder);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _orderService.GetAll();

            return Ok(orders);
        }

        [HttpGet("/myOrders")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetByUser()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!);

            var orders = await _orderService.GetByUserId(userId);

            return Ok(orders);
        }

        [HttpPut("/{orderId}")]
        [Authorize]
        public async Task<IActionResult> UpdatePaymentStatus(Guid orderId)
        {
            var updatedOrder = await _orderService.UpdatePaymentStatus(orderId);

            return Ok(updatedOrder);
        }
    }
}
