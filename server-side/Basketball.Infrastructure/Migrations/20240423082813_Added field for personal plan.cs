using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Basketball.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Addedfieldforpersonalplan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPersonal",
                table: "TrainingPlans",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "TrainingPlanRequest",
                table: "Orders",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPersonal",
                table: "TrainingPlans");

            migrationBuilder.DropColumn(
                name: "TrainingPlanRequest",
                table: "Orders");
        }
    }
}
