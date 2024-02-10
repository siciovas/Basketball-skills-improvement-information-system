using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Basketball.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class TrainingPlan_Skills_Exercises_Relations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Skills",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CoachId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Skills_Users_CoachId",
                        column: x => x.CoachId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ExerciseSkill",
                columns: table => new
                {
                    ExerciseId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    SkillId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseSkill", x => new { x.ExerciseId, x.SkillId });
                    table.ForeignKey(
                        name: "FK_ExerciseSkill_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseSkill_Skills_SkillId",
                        column: x => x.SkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TrainingPlanSkill",
                columns: table => new
                {
                    SkillId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    TrainingPlanId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingPlanSkill", x => new { x.SkillId, x.TrainingPlanId });
                    table.ForeignKey(
                        name: "FK_TrainingPlanSkill_Skills_SkillId",
                        column: x => x.SkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrainingPlanSkill_TrainingPlans_TrainingPlanId",
                        column: x => x.TrainingPlanId,
                        principalTable: "TrainingPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseSkill_SkillId",
                table: "ExerciseSkill",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_Skills_CoachId",
                table: "Skills",
                column: "CoachId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPlanSkill_TrainingPlanId",
                table: "TrainingPlanSkill",
                column: "TrainingPlanId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExerciseSkill");

            migrationBuilder.DropTable(
                name: "TrainingPlanSkill");

            migrationBuilder.DropTable(
                name: "Skills");
        }
    }
}
