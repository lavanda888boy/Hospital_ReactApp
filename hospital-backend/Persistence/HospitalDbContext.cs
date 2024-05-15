using hospital_backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace hospital_backend.Persistence
{
    public class HospitalDbContext : IdentityDbContext<IdentityUser>
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
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MedicalRecord>()
                        .HasOne(r => r.ExaminedPatient)
                        .WithMany()
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
        }
    }
}
