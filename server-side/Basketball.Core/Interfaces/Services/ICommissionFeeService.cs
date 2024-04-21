using Basketball.Core.Dtos.Update;
using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Services
{
    public interface ICommissionFeeService
    {
        Task<CommissionFee> Get();
        Task<CommissionFeeUpdateDto> Update(CommissionFeeUpdateDto commissionFeeDto);
    }
}
