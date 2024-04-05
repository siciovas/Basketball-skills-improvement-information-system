using Basketball.Core.Dtos;
using Basketball.Core.Dtos.Post;
using Basketball.Core.Dtos.Update;
using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Services
{
    public interface IOrderService
    {
        public Task<Guid> Create(OrderPostDto orderDto, Guid userId);
        public Task<OrderUpdateDto> UpdatePaymentStatus(Guid Id);
        public Task<List<OrderDto>> GetByUserId(Guid userId);
        public Task<OrderDto> GetById(Guid id);
        public Task<List<OrderDto>> GetAll();
        public Task CancelOrder(Guid id);
    }
}
