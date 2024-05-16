using hospital_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace hospital_backend.Persistence
{
    public class HospitalDbContext : DbContext
    {
        private readonly string _dbConnectionString = "Filename=HospitalApp.db";

        public DbSet<Patient> Patients { get; set; } = default!;
        public DbSet<MedicalRecord> Records { get; set; } = default!;

        public HospitalDbContext() { }

        public HospitalDbContext(DbContextOptions options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite(_dbConnectionString)
                              .LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, LogLevel.Information);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MedicalRecord>()
                        .HasOne(r => r.ExaminedPatient)
                        .WithMany()
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
        }
    }
}
