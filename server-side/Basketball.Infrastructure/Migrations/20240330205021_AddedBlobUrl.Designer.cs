﻿// <auto-generated />
using System;
using Basketball.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Basketball.Infrastructure.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20240330205021_AddedBlobUrl")]
    partial class AddedBlobUrl
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Basketball.Domain.Data.Entities.Complaint", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("CoachId")
                        .HasColumnType("char(36)");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<Guid>("StudentId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CoachId");

                    b.HasIndex("StudentId");

                    b.ToTable("Complaints");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.Exercise", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("CoachId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Difficulty")
                        .HasColumnType("int");

                    b.Property<string>("ExerciseBlobUrl")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CoachId");

                    b.ToTable("Exercises");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.ExerciseSkill", b =>
                {
                    b.Property<Guid>("ExerciseId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("SkillId")
                        .HasColumnType("char(36)");

                    b.HasKey("ExerciseId", "SkillId");

                    b.HasIndex("SkillId");

                    b.ToTable("ExerciseSkill");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.Feedback", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<string>("FeedbackText")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("StudentId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("TrainingPlanId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("StudentId");

                    b.HasIndex("TrainingPlanId");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.Skill", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("CoachId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CoachId");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.TrainingPlan", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("CoachId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<double>("Price")
                        .HasColumnType("double");

                    b.Property<string>("ShortDescription")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("varchar(40)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Version")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CoachId");

                    b.ToTable("TrainingPlans");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.TrainingPlanSkill", b =>
                {
                    b.Property<Guid>("SkillId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("TrainingPlanId")
                        .HasColumnType("char(36)");

                    b.HasKey("SkillId", "TrainingPlanId");

                    b.HasIndex("TrainingPlanId");

                    b.ToTable("TrainingPlanSkill");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<byte[]>("Avatar")
                        .HasColumnType("longblob");

                    b.Property<DateOnly>("BirthDate")
                        .HasColumnType("date");

                    b.Property<int?>("CoachStatus")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<int?>("Education")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("Experience")
                        .HasColumnType("int");

                    b.Property<double?>("FootSize")
                        .HasColumnType("double");

                    b.Property<int?>("Gender")
                        .HasColumnType("int");

                    b.Property<int?>("Height")
                        .HasColumnType("int");

                    b.Property<int?>("MetabolicAge")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double?>("Rating")
                        .HasColumnType("double");

                    b.Property<DateOnly>("RegisterDate")
                        .HasColumnType("date");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("Specialization")
                        .HasColumnType("longtext");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double?>("Weight")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.Complaint", b =>
                {
                    b.HasOne("Basketball.Domain.Data.Entities.User", "Coach")
                        .WithMany()
                        .HasForeignKey("CoachId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Basketball.Domain.Data.Entities.User", "Student")
                        .WithMany()
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Coach");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.Exercise", b =>
                {
                    b.HasOne("Basketball.Domain.Data.Entities.User", "Coach")
                        .WithMany()
                        .HasForeignKey("CoachId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Coach");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.ExerciseSkill", b =>
                {
                    b.HasOne("Basketball.Domain.Data.Entities.Exercise", null)
                        .WithMany()
                        .HasForeignKey("ExerciseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Basketball.Domain.Data.Entities.Skill", null)
                        .WithMany()
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.Feedback", b =>
                {
                    b.HasOne("Basketball.Domain.Data.Entities.User", "Student")
                        .WithMany()
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Basketball.Domain.Data.Entities.TrainingPlan", "TrainingPlan")
                        .WithMany()
                        .HasForeignKey("TrainingPlanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Student");

                    b.Navigation("TrainingPlan");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.Skill", b =>
                {
                    b.HasOne("Basketball.Domain.Data.Entities.User", "Coach")
                        .WithMany()
                        .HasForeignKey("CoachId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Coach");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.TrainingPlan", b =>
                {
                    b.HasOne("Basketball.Domain.Data.Entities.User", "Coach")
                        .WithMany()
                        .HasForeignKey("CoachId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Coach");
                });

            modelBuilder.Entity("Basketball.Domain.Data.Entities.TrainingPlanSkill", b =>
                {
                    b.HasOne("Basketball.Domain.Data.Entities.Skill", null)
                        .WithMany()
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Basketball.Domain.Data.Entities.TrainingPlan", null)
                        .WithMany()
                        .HasForeignKey("TrainingPlanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
