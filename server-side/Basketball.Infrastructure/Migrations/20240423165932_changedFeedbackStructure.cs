using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Basketball.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changedFeedbackStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_TrainingPlans_TrainingPlanId",
                table: "Feedbacks");

            migrationBuilder.RenameColumn(
                name: "TrainingPlanId",
                table: "Feedbacks",
                newName: "CoachId");

            migrationBuilder.RenameIndex(
                name: "IX_Feedbacks_TrainingPlanId",
                table: "Feedbacks",
                newName: "IX_Feedbacks_CoachId");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Users_CoachId",
                table: "Feedbacks",
                column: "CoachId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Users_CoachId",
                table: "Feedbacks");

            migrationBuilder.RenameColumn(
                name: "CoachId",
                table: "Feedbacks",
                newName: "TrainingPlanId");

            migrationBuilder.RenameIndex(
                name: "IX_Feedbacks_CoachId",
                table: "Feedbacks",
                newName: "IX_Feedbacks_TrainingPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_TrainingPlans_TrainingPlanId",
                table: "Feedbacks",
                column: "TrainingPlanId",
                principalTable: "TrainingPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
