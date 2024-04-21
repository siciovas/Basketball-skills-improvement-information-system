using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Basketball.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addedavatarandexpirationdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Avatar",
                table: "TrainingPlans",
                type: "longblob",
                nullable: false);

            migrationBuilder.AddColumn<int>(
                name: "ExpirationDate",
                table: "TrainingPlans",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "TrainingPlans");

            migrationBuilder.DropColumn(
                name: "ExpirationDate",
                table: "TrainingPlans");
        }
    }
}
