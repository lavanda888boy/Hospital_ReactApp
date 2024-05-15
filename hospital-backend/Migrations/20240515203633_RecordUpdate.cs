using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hospital_backend.Migrations
{
    /// <inheritdoc />
    public partial class RecordUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Records_Patients_ExaminedPatientId",
                table: "Records");

            migrationBuilder.DropForeignKey(
                name: "FK_Records_Patients_PatientId",
                table: "Records");

            migrationBuilder.DropIndex(
                name: "IX_Records_PatientId",
                table: "Records");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "Records");

            migrationBuilder.AddForeignKey(
                name: "FK_Records_Patients_ExaminedPatientId",
                table: "Records",
                column: "ExaminedPatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Records_Patients_ExaminedPatientId",
                table: "Records");

            migrationBuilder.AddColumn<int>(
                name: "PatientId",
                table: "Records",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Records_PatientId",
                table: "Records",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Records_Patients_ExaminedPatientId",
                table: "Records",
                column: "ExaminedPatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Records_Patients_PatientId",
                table: "Records",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
