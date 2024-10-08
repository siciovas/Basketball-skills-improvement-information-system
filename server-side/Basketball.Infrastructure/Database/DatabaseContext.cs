﻿using Basketball.Domain.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Basketball.Infrastructure.Database
{
    public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<TrainingPlan> TrainingPlans { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<ExerciseSkill> ExerciseSkill { get; set; }
        public DbSet<TrainingPlanSkill> TrainingPlanSkill { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<ExerciseProgress> ExerciseProgresses { get; set; }
        public DbSet<PasswordRecovery> PasswordRecovery { get; set; }
        public DbSet<CommissionFee> CommissionFees { get; set; }
        public DbSet<SkillsOrder> SkillsOrders { get; set; }
        public DbSet<ExercisesOrder> ExercisesOrders { get; set; }
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

            modelBuilder.Entity<SkillsOrder>()
                .HasKey(x => new { x.TrainingPlanId, x.SkillId });

            modelBuilder.Entity<ExercisesOrder>()
                .HasKey(x => new { x.SkillId, x.ExerciseId });
        }
    }
}
