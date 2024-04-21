using Basketball.Domain.Data.Entities;

namespace Basketball.Core.Interfaces.Repositories
{
    public interface ICommissionFeeRepository
    {
        Task<CommissionFee> Get();
        Task<CommissionFee> Update(CommissionFee commissionFee);
    }
}
