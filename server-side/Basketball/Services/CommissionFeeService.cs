using Basketball.Core.Dtos.Update;
using Basketball.Core.Interfaces.Repositories;
using Basketball.Core.Interfaces.Services;
using Basketball.Domain.Data.Entities;

namespace Basketball.Services
{
    public class CommissionFeeService(ICommissionFeeRepository commissionFeeRepository) : ICommissionFeeService
    {
        private readonly ICommissionFeeRepository _commissionFeeRepository = commissionFeeRepository;

        public async Task<CommissionFee> Get()
        {
            var commissionFee = await _commissionFeeRepository.Get();

            return commissionFee;
        }

        public async Task<CommissionFeeUpdateDto> Update(CommissionFeeUpdateDto commissionFeeDto)
        {
            var commissionFee = await _commissionFeeRepository.Get();

            commissionFee.Value = commissionFeeDto.Value;
            commissionFee.IsActive = commissionFeeDto.IsActive;

            var updatedCommissionFee = await _commissionFeeRepository.Update(commissionFee);

            return new CommissionFeeUpdateDto
            {
                Value = updatedCommissionFee.Value,
                IsActive = updatedCommissionFee.IsActive,
            };
        }
    }
}
