using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Basketball.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Addedcommentinexerciseprogress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "ExerciseProgresses",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "ExerciseProgresses");
        }
    }
}
