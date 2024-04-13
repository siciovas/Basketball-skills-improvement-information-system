using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Basketball.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Addedforeignkeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ExerciseProgresses_ExerciseId",
                table: "ExerciseProgresses",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseProgresses_TrainingPlanId",
                table: "ExerciseProgresses",
                column: "TrainingPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseProgresses_UserId",
                table: "ExerciseProgresses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseProgresses_Exercises_ExerciseId",
                table: "ExerciseProgresses",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseProgresses_TrainingPlans_TrainingPlanId",
                table: "ExerciseProgresses",
                column: "TrainingPlanId",
                principalTable: "TrainingPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseProgresses_Users_UserId",
                table: "ExerciseProgresses",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseProgresses_Exercises_ExerciseId",
                table: "ExerciseProgresses");

            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseProgresses_TrainingPlans_TrainingPlanId",
                table: "ExerciseProgresses");

            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseProgresses_Users_UserId",
                table: "ExerciseProgresses");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseProgresses_ExerciseId",
                table: "ExerciseProgresses");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseProgresses_TrainingPlanId",
                table: "ExerciseProgresses");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseProgresses_UserId",
                table: "ExerciseProgresses");
        }
    }
}
