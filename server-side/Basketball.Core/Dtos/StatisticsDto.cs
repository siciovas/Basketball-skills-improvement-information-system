using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basketball.Core.Dtos
{
    public class StatisticsDto
    {
        public Dictionary<int, int> RegisteredCoaches { get; set; } = [];
        public Dictionary<int, int> RegisteredStudents { get; set; } = [];
        public Dictionary<int, int> OrdersAmount { get; set; } = [];
        public Dictionary<int, decimal?> Commissions { get; set; } = [];
    }
}
