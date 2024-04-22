using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Basketball.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedskillIdcolumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SkillId",
                table: "ExerciseProgresses",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseProgresses_SkillId",
                table: "ExerciseProgresses",
                column: "SkillId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseProgresses_Skills_SkillId",
                table: "ExerciseProgresses",
                column: "SkillId",
                principalTable: "Skills",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseProgresses_Skills_SkillId",
                table: "ExerciseProgresses");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseProgresses_SkillId",
                table: "ExerciseProgresses");

            migrationBuilder.DropColumn(
                name: "SkillId",
                table: "ExerciseProgresses");
        }
    }
}
