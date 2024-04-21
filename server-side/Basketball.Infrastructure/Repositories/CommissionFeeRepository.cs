using Basketball.Core.Interfaces.Repositories;
using Basketball.Domain.Data.Entities;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Repositories
{
    public class CommissionFeeRepository(DatabaseContext db) : ICommissionFeeRepository
    {
        private readonly DatabaseContext _db = db;

        public async Task<CommissionFee> Get()
        {
            return await _db.CommissionFees
                            .FirstAsync();
        }

        public async Task<CommissionFee> Update(CommissionFee commissionFee)
        {
            var updatedCommissionFee = _db.CommissionFees.Update(commissionFee);
            await _db.SaveChangesAsync();

            return updatedCommissionFee.Entity;
        }
    }
}
