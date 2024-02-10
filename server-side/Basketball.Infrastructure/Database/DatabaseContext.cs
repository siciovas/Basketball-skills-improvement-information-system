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
        public DbSet<TrainingPlan> TrainingPlans { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<ExerciseSkill> ExerciseSkill { get; set; }
        public DbSet<TrainingPlanSkill> TrainingPlanSkill { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Skill>()
                .HasMany(e => e.Exercises)
                .WithMany(e => e.Skills)
                .UsingEntity<ExerciseSkill>();

            modelBuilder.Entity<TrainingPlan>()
                .HasMany(e => e.Skills)
                .WithMany(e => e.TrainingPlans)
                .UsingEntity<TrainingPlanSkill>();
        }
    }
}
