using Basketball.Domain.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
    }
}
