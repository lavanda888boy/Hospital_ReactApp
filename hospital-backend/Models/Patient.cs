using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace hospital_backend.Models
{
    public class Patient
    {
        [Column("PatientId")]
        public int Id { get; set; }

        [MinLength(1)]
        [MaxLength(50)]
        public required string Name { get; set; }

        [MinLength(1)]
        [MaxLength(50)]
        public required string Surname { get; set; }

        [Range(1, 150)]
        public required int Age { get; set; }

        [Column(TypeName = "nvarchar(5)")]
        public required Gender Gender { get; set; }

        public List<string> Illnesses { get; set; } = [];
    }

    public enum Gender
    {
        Male,
        Female
    }
}
