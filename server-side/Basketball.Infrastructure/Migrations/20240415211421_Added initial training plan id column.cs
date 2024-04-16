using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Basketball.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Addedinitialtrainingplanidcolumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "InitialTrainingPlanId",
                table: "TrainingPlans",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPlans_InitialTrainingPlanId",
                table: "TrainingPlans",
                column: "InitialTrainingPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingPlans_TrainingPlans_InitialTrainingPlanId",
                table: "TrainingPlans",
                column: "InitialTrainingPlanId",
                principalTable: "TrainingPlans",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainingPlans_TrainingPlans_InitialTrainingPlanId",
                table: "TrainingPlans");

            migrationBuilder.DropIndex(
                name: "IX_TrainingPlans_InitialTrainingPlanId",
                table: "TrainingPlans");

            migrationBuilder.DropColumn(
                name: "InitialTrainingPlanId",
                table: "TrainingPlans");
        }
    }
}
