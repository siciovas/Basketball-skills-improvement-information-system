using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;

namespace Basketball.Core.Interfaces.Services
{
    public interface IOrderService
    {
        public Task<OrderDto> Create(OrderPostDto order, Guid userId);
        public Task<OrderUpdateDto> UpdatePaymentStatus(Guid Id);
        public Task<List<OrderDto>> GetByUserId(Guid userId);
        public Task<List<OrderDto>> GetAll();
    }
}
